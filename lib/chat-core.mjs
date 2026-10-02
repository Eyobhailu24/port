export const MAX_MESSAGE_LENGTH = 1200;
export const MAX_HISTORY = 9;
export const MAX_BODY_BYTES = 16000;

export function validateMessages(value) {
  if (!Array.isArray(value) || !value.length || value.length > MAX_HISTORY) return null;
  const messages = [];
  for (let i = 0; i < value.length; i++) {
    const message = value[i];
    if (!message || message.role !== (i % 2 === 0 ? 'user' : 'assistant') ||
        typeof message.content !== 'string' || !message.content.trim() ||
        message.content.length > MAX_MESSAGE_LENGTH) return null;
    messages.push({ role: message.role, content: message.content.trim() });
  }
  return messages.at(-1).role === 'user' ? messages : null;
}

const ignored = new Set('a an the is are was were be do does did he his him eyob hailu you your i me my it its and or to of in on for with what which how who where when tell about can could please more'.split(' '));
function tokens(text) {
  return [...new Set(text.toLowerCase().replace(/[^a-z0-9+#]+/g, ' ').split(' ')
    .filter((word) => word && !ignored.has(word))
    .map((word) => word.length > 4 ? word.replace(/s$/, '') : word))];
}

export function retrieveDocuments(documents, messages) {
  const question = messages.at(-1).content;
  const current = tokens(question);
  // Previous user questions help resolve references such as "what did he use there?".
  const previous = tokens(messages.filter((m) => m.role === 'user').slice(-3, -1).map((m) => m.content).join(' '));
  const followup = /\b(it|that|those|there|they|them|more|also)\b/i.test(question) || !current.length;
  const ranked = documents.map((doc, index) => {
    const title = tokens(`${doc.title} ${doc.keywords}`);
    const body = tokens(doc.text);
    const scoreTokens = (terms) => terms.reduce((score, term) => score + (title.includes(term) ? 4 : body.includes(term) ? 1 : 0), 0);
    return { doc, index, score: scoreTokens(current) + (followup ? scoreTokens(previous) * 0.6 : 0) };
  }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score || a.index - b.index);
  return ranked.slice(0, 6).map((entry) => entry.doc);
}

// Per-process backstop. A shared deployment limit is still needed across replicas.
export function createRateLimiter({ windowMs = 60000, perClient = 8, total = 30 } = {}) {
  const clients = new Map();
  let globalWindow = { start: 0, count: 0 };
  return (client, now = Date.now()) => {
    if (now - globalWindow.start >= windowMs) {
      globalWindow = { start: now, count: 0 };
      clients.clear();
    }
    const count = clients.get(client) ?? 0;
    if (count >= perClient || globalWindow.count >= total) {
      return Math.max(1, Math.ceil((globalWindow.start + windowMs - now) / 1000));
    }
    clients.set(client, count + 1);
    globalWindow.count++;
    return 0;
  };
}
