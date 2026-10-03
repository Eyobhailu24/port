'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Dialog } from 'radix-ui';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/lib/content';
import { Button } from '@/components/ui/button';

const IntroContext = createContext(true);
const MINIMUM_INTRO_MS = 1800;
const MAXIMUM_LOAD_MS = 12000;

export function usePortfolioReady() {
  return useContext(IntroContext);
}

export function PortfolioIntro({ children }: { children: ReactNode }) {
  // Render the splash in the initial HTML, including on reloads and anchor links.
  const [open, setOpen] = useState(true);
  const skip = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    const controller = new AbortController();
    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve(), { once: true, signal: controller.signal });
    });
    let minimumTimer: number;
    const minimumDisplay = new Promise<void>((resolve) => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      minimumTimer = window.setTimeout(resolve, reducedMotion ? 250 : MINIMUM_INTRO_MS);
    });

    const reveal = () => { if (!cancelled) setOpen(false); };

    // A failed or stalled asset must never leave the visitor behind the loader.
    const fallbackTimer = window.setTimeout(reveal, MAXIMUM_LOAD_MS);
    void Promise.all([pageLoaded, document.fonts.ready, minimumDisplay]).then(async () => {
      if (cancelled) return;
      // Decode eager images and images in the initial viewport. Offscreen lazy
      // images keep loading on demand, so they cannot hold up the entry screen.
      const images = Array.from(document.images).filter((image) => {
        const bounds = image.getBoundingClientRect();
        return image.loading !== 'lazy' || (bounds.bottom > 0 && bounds.top < window.innerHeight);
      });
      await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
      reveal();
    }).catch(reveal);

    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [open]);

  return (
    <IntroContext.Provider value={!open}>
      <noscript>
        <style>{`
          .intro-screen, .intro-overlay { display: none !important; }
          [data-intro-reveal] { opacity: 1 !important; transform: none !important; filter: none !important; }
        `}</style>
      </noscript>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        {/* Keep this inline: portals do not include their contents in server HTML. */}
          <Dialog.Overlay className="intro-overlay fixed inset-0 z-[190] bg-background" />
          <Dialog.Content
            className="intro-screen fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-background px-6 text-foreground outline-none"
            data-lenis-prevent
            onOpenAutoFocus={(event) => { event.preventDefault(); skip.current?.focus({ preventScroll: true }); }}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              document.getElementById('hero-heading')?.focus({ preventScroll: true });
            }}
          >
            <div aria-hidden className="intro-glow pointer-events-none absolute size-[min(80vw,36rem)] rounded-full bg-primary/10 blur-[90px]" />
            <div aria-hidden className="pointer-events-none absolute inset-x-8 top-8 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-muted-foreground sm:inset-x-12 sm:top-12">
              <span>EYOB HAILU <span className="text-brand">/</span> PORTFOLIO</span>
              <span className="hidden sm:block">DESIGN · CODE · BUILD</span>
            </div>
            <div className="intro-emblem relative flex shrink-0 items-center justify-center">
              <svg aria-hidden viewBox="0 0 320 320" className="intro-orbits absolute inset-0 size-full overflow-visible text-primary" fill="none">
                <circle className="intro-orbit" pathLength="1" cx="160" cy="160" r="137" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
                <ellipse className="intro-orbit" pathLength="1" cx="160" cy="160" rx="153" ry="62" transform="rotate(-35 160 160)" stroke="currentColor" strokeWidth="1.2" opacity="0.75" />
                <ellipse className="intro-orbit" pathLength="1" cx="160" cy="160" rx="64" ry="137" transform="rotate(-35 160 160)" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
                <circle cx="272" cy="78" r="4" fill="currentColor" />
              </svg>
              <div aria-hidden className="intro-monogram relative font-mono font-semibold tracking-tighter">
                EH<span className="text-brand">_</span>
              </div>
            </div>
            <Dialog.Title asChild>
              <h2 className="relative mt-7 text-3xl font-semibold tracking-tight sm:text-4xl">
                {profile.name}
              </h2>
            </Dialog.Title>
            <Dialog.Description asChild>
              <p className="relative mt-3 font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase sm:text-xs">
                {profile.role}
              </p>
            </Dialog.Description>
            <div aria-hidden className="relative mt-8 h-px w-32 overflow-hidden bg-primary/15">
              <div className="intro-loading-bar absolute inset-0 bg-primary/80" />
            </div>
            <p role="status" className="relative mt-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Loading portfolio
            </p>
            <Dialog.Close asChild>
              <Button ref={skip} variant="ghost" className="absolute right-6 bottom-8 h-10 gap-2 rounded-full px-4 sm:right-12 sm:bottom-12">
                Enter portfolio <ArrowUpRight aria-hidden className="size-3.5" />
              </Button>
            </Dialog.Close>
          </Dialog.Content>
      </Dialog.Root>
      {children}
    </IntroContext.Provider>
  );
}
