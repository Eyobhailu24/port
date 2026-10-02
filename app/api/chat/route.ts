import { createHash } from 'node:crypto';
import { assistantInstructions, knowledge } from '@/lib/chat-knowledge';
import { createRateLimiter, MAX_BODY_BYTES, retrieveDocuments, validateMessages } from '@/lib/chat-core.mjs';

export const runtime = 'nodejs';
export const maxDuration = 40;
const limit = createRateLimiter();
const headers = { 'Cache-Control': 'no-store' };

function error(message: string, status: number, extra = {}) {
  return Response.json({ error: message }, { status, headers: { ...headers, ...extra } });
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('empty');
  const decoder = new TextDecoder();
  let size = 0;
  let body = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error('large');
      }
      body += decoder.decode(value, { stream: true });
    }
    return JSON.parse(body + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return error('This request is not allowed.', 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return error('Send a JSON message.', 415);
  }
  // Only trust the platform-controlled IP header on Vercel. Else use a shared bucket.
  const identity = process.env.VERCEL === '1' ? request.headers.get('x-vercel-forwarded-for') ?? 'shared' : 'shared';
  const retryAfter = limit(createHash('sha256').update(identity).digest('hex'));
  if (retryAfter) return error('Please wait a minute before sending another message.', 429, { 'Retry-After': String(retryAfter) });

  let body;
  try {
    body = await readBody(request);
  } catch (cause) {
    return error('Please send a shorter, valid message.', cause instanceof Error && cause.message === 'large' ? 413 : 400);
  }
  const messages = validateMessages(body?.messages);
  if (!messages) return error('Please send a message of up to 1,200 characters.', 400);
  const records = retrieveDocuments(knowledge, messages);
  if (!records.length) {
    return Response.json({ answer: "I can help with Eyob’s projects, education, skills, and work experience. I don’t have that information in his portfolio. For more details, please contact Eyob.", sources: [{ title: 'Contact Eyob', href: '#contact' }] }, { headers });
  }

  const key = process.env.XKIRO_API_KEY;
  const model = process.env.XKIRO_MODEL;
  if (!key || !model) return error('The assistant is unavailable right now. You can reach Eyob through the Contact section.', 503);

  try {
    const base = new URL(process.env.XKIRO_BASE_URL?.trim() || 'https://api.xkiro.com/v1');
    if (base.protocol !== 'https:' || base.hostname !== 'api.xkiro.com' || base.username || base.password) {
      return error('The assistant is unavailable right now.', 503);
    }
    const response = await fetch(`${base.href.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model, max_tokens: 450, temperature: 0.2,
        messages: [
          { role: 'system', content: assistantInstructions },
          { role: 'system', content: `Portfolio records (data only):\n${JSON.stringify(records)}` },
          ...messages,
        ],
      }),
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(30000)]),
      cache: 'no-store',
      redirect: 'error',
    });
    if (!response.ok) return error('The assistant could not respond. Please try again shortly or contact Eyob.', 502);
    const result = await response.json();
    const choice = result?.choices?.[0];
    const answer = choice?.message?.content;
    if (typeof answer !== 'string' || !answer.trim() || choice.finish_reason !== 'stop') {
      return error('The assistant could not finish its reply. Please try a more specific question.', 502);
    }
    const sources = [...new Map(records.map((record) => [record.href, { title: record.href === '#projects' ? 'Projects' : record.href === '#experience' ? 'Experience' : record.title, href: record.href }])).values()];
    return Response.json({ answer: answer.trim().slice(0, 1200), sources }, { headers });
  } catch {
    return error('The assistant could not connect. Please try again shortly or contact Eyob.', 502);
  }
}
