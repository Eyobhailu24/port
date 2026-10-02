'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  LoaderCircle,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MAX_MESSAGE_LENGTH } from '@/lib/chat-core.mjs';

type Source = { title: string; href: string };
type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
};
const suggestions = [
  'What has Eyob built?',
  'What are his skills?',
  'Where did he study?',
];

export function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [question, setQuestion] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const input = useRef<HTMLTextAreaElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const active = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) input.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (log.current)
      log.current.scrollTop = log.current.scrollHeight;
  }, [open, messages, question, busy, error]);

  useEffect(() => () => active.current?.abort(), []);

  function close() {
    setOpen(false);
    launcher.current?.focus({ preventScroll: true });
  }

  async function send(text: string) {
    const content = text.trim();
    if (
      !content ||
      content.length > MAX_MESSAGE_LENGTH ||
      active.current
    )
      return;
    const controller = new AbortController();
    active.current = controller;
    setBusy(true);
    setError('');
    setQuestion(content);
    setDraft('');
    const next: Message[] = [
      ...messages,
      { role: 'user', content },
    ];
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next
            .slice(-9)
            .map(({ role, content }) => ({
              role,
              content,
            })),
        }),
        signal: AbortSignal.any([
          controller.signal,
          AbortSignal.timeout(35000),
        ]),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error ||
            'Unable to send your message. Please try again.',
        );
      if (typeof data.answer !== 'string')
        throw new Error(
          'No reply was received. Please try again.',
        );
      const sources = Array.isArray(data.sources)
        ? data.sources.filter(
            (source: Source) =>
              typeof source.title === 'string' &&
              [
                '#about',
                '#education',
                '#skills',
                '#projects',
                '#experience',
                '#contact',
              ].includes(source.href),
          )
        : [];
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: data.answer,
          sources,
        },
      ]);
      setQuestion('');
    } catch (cause) {
      setError(
        cause instanceof Error && cause.name === 'Error'
          ? cause.message
          : 'The connection timed out. Please try again.',
      );
    } finally {
      active.current = null;
      setBusy(false);
    }
  }

  return (
    <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[70] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <section
          id="portfolio-chat"
          role="dialog"
          aria-modal="false"
          aria-labelledby="chat-title"
          aria-describedby="chat-description"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.stopPropagation();
              close();
            }
          }}
          className="flex h-[min(36rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-sky-500/30 bg-card text-card-foreground shadow-2xl shadow-black/20"
        >
          <header className="flex items-center gap-3 border-b border-border bg-accent/40 px-4 py-4">
            <span className="text-brand flex size-10 shrink-0 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10">
              <Sparkles aria-hidden className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h2
                id="chat-title"
                className="text-sm font-semibold"
              >
                Ask about Eyob
              </h2>
              <p
                id="chat-description"
                className="mt-0.5 font-mono text-[10px] tracking-wide text-muted-foreground"
              >
                AI ASSISTANT
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Clear conversation"
              title="Clear conversation"
              disabled={
                busy || (!messages.length && !question)
              }
              onClick={() => {
                setMessages([]);
                setQuestion('');
                setError('');
                setDraft('');
                input.current?.focus();
              }}
            >
              <RotateCcw aria-hidden />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close chat"
              onClick={close}
            >
              <X aria-hidden />
            </Button>
          </header>

          <div
            ref={log}
            role="log"
            aria-label="Conversation"
            aria-live="polite"
            aria-relevant="additions text"
            data-lenis-prevent
            className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4"
          >
            <div className="rounded-xl rounded-tl-sm border border-border bg-muted/40 p-3.5 text-sm leading-relaxed">
              Hi! Explore Eyob&apos;s work, education, and
              the technologies he uses. What would you like
              to know?
            </div>
            {!messages.length && !question && (
              <div className="flex flex-col items-start gap-2">
                {suggestions.map((text) => (
                  <button
                    key={text}
                    onClick={() => send(text)}
                    className="text-brand rounded-lg border border-sky-500/25 px-3 py-2 text-left text-xs transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    {text}{' '}
                    <ArrowUpRight
                      aria-hidden
                      className="ml-1 inline size-3"
                    />
                  </button>
                ))}
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === 'user' ? 'ml-8' : 'mr-4'
                }
              >
                <p className="mb-1 px-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {message.role === 'user'
                    ? 'You'
                    : 'Assistant'}
                </p>
                <p
                  className={`whitespace-pre-wrap break-words rounded-xl p-3.5 text-sm leading-relaxed ${message.role === 'user' ? 'rounded-tr-sm bg-primary text-primary-foreground' : 'rounded-tl-sm border border-border bg-muted/40'}`}
                >
                  {message.content}
                </p>
                {!!message.sources?.length && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">
                      Explore:
                    </span>
                    {message.sources.map((source) => (
                      <a
                        key={source.href}
                        href={source.href}
                        onClick={close}
                        className="text-brand rounded-md border border-border px-2 py-1 text-[11px] hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
                      >
                        {source.title}
                        <ArrowUpRight
                          aria-hidden
                          className="ml-1 inline size-3"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {question && (
              <p className="ml-8 whitespace-pre-wrap break-words rounded-xl rounded-tr-sm bg-primary p-3.5 text-sm text-primary-foreground">
                <span className="sr-only">You: </span>
                {question}
              </p>
            )}
            {busy && (
              <p
                role="status"
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <LoaderCircle
                  aria-hidden
                  className="size-4 motion-safe:animate-spin"
                />{' '}
                Looking through the portfolio…
              </p>
            )}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-border bg-muted/40 p-3 text-sm"
              >
                <p>{error}</p>
                <div className="mt-3 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => send(question)}
                  >
                    Try again
                  </Button>
                  <a
                    href="#contact"
                    onClick={close}
                    className="text-brand self-center text-xs underline underline-offset-4"
                  >
                    Contact Eyob
                  </a>
                </div>
              </div>
            )}
          </div>

          <form
            className="border-t border-border p-3"
            onSubmit={(event) => {
              event.preventDefault();
              send(draft);
            }}
          >
            <div className="flex items-end gap-2 rounded-xl border border-input bg-background p-2 focus-within:ring-2 focus-within:ring-ring/50">
              <label
                htmlFor="chat-message"
                className="sr-only"
              >
                Your question about Eyob
              </label>
              <textarea
                ref={input}
                id="chat-message"
                rows={2}
                value={draft}
                maxLength={MAX_MESSAGE_LENGTH}
                onChange={(event) =>
                  setDraft(event.target.value)
                }
                placeholder="Ask about my work…"
                aria-describedby="chat-privacy"
                className="max-h-28 min-h-12 flex-1 resize-none bg-transparent px-1 py-1 text-base outline-none placeholder:text-muted-foreground sm:text-sm"
                onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    send(draft);
                  }
                }}
              />
              <Button
                type="submit"
                size="icon"
                disabled={busy || !draft.trim()}
                aria-label="Send message"
                className="size-10 rounded-lg"
              >
                <Send aria-hidden className="size-4" />
              </Button>
            </div>
            <p
              id="chat-privacy"
              className="mt-2 px-1 text-[10px] leading-relaxed text-muted-foreground"
            >
              AI can make mistakes.
            </p>
          </form>
        </section>
      )}
      <Button
        ref={launcher}
        size="lg"
        aria-expanded={open}
        aria-controls="portfolio-chat"
        aria-label={open ? 'Close chat' : 'Ask about Eyob'}
        onClick={() => (open ? close() : setOpen(true))}
        className="h-12 gap-2.5 rounded-full px-5 shadow-lg shadow-sky-950/20"
      >
        {open ? (
          <X aria-hidden className="size-5" />
        ) : (
          <MessageCircle aria-hidden className="size-5" />
        )}
        <span>Ask about Eyob</span>
      </Button>
    </div>
  );
}
