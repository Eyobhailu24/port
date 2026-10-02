# Eyob Hailu — Portfolio

Next.js portfolio with a sky-blue light/dark theme and a floating AI assistant.

## Local development

```sh
npm install
cp .env.example .env.local
# Fill XKIRO_API_KEY in .env.local.
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env.local`; use `npm.cmd` if PowerShell blocks npm's script shim. Preserve an existing `.env.local` rather than overwriting it. Open http://localhost:3000.

## Content

Edit `lib/content.ts` to update the public profile, education, skills, projects, and experience. `lib/chat-knowledge.ts` derives the assistant's records from that same data. No live LinkedIn scraping or automatic sync is performed. Current entries come from the existing portfolio; a LinkedIn profile export or pasted details are needed to add missing qualifications, dates, projects, and achievements accurately.

## Assistant

The browser sends recent conversation turns to `/api/chat`. Lightweight keyword retrieval selects up to six relevant records, including context from prior visitor questions for follow-ups. The server calls xKiro Chat Completions and returns a plain-text answer with related portfolio section links. There is no vector database or embedding service. The assistant is instructed to acknowledge missing facts; model answers can still be inaccurate.

Required server-only environment variables:

| Variable | Value |
| --- | --- |
| `XKIRO_API_KEY` | Your private xKiro key |
| `XKIRO_BASE_URL` | `https://api.xkiro.com/v1` |
| `XKIRO_MODEL` | `qwen/qwen3.7-flash:free` (configurable supported model) |

`.env.local` is ignored by Git. Never prefix the key with `NEXT_PUBLIC_`. Rotate any key previously pasted into a chat. Set these same variables in your deployment's server environment; `.env.local` is not deployed through Git. A Node.js deployment is required; static export cannot run the chat endpoint.

Conversations exist in browser memory until cleared or reloaded. This application does not write them to a database or application logs. Recent questions, replies, and retrieved public records are sent to xKiro and its downstream model provider; their retention policies apply separately.

The endpoint validates role order and message sizes, caps the request body at 16 KB, limits context to nine messages, and times out upstream calls after 30 seconds. Responses render as text, and section links use an allowlist. Provider credentials and raw provider errors are never returned to visitors.

Rate limiting is a per-process backstop: eight requests per client per minute and thirty total. On Vercel it uses the platform-controlled client IP header; other hosts share one bucket. Limits reset on restart and are not shared between serverless instances. Before a public multi-instance deployment, configure a shared rate limiter or platform firewall limits plus provider spending limits. Same-origin checks reduce cross-site browser use but are not authentication.

## Checks

```sh
npm test
npm run lint
npm run build
```

Tests cover retrieval, follow-ups, request history validation, and rate limits. Verify both themes at desktop/mobile sizes and check keyboard navigation, retry, clear, and unknown-information answers when changing the assistant. The app downloads Geist fonts during production builds, so the build needs network access.
