'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Dialog } from 'radix-ui';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/lib/content';
import { Button } from '@/components/ui/button';

const IntroContext = createContext(true);
const SESSION_KEY = 'eyob-portfolio-intro-v1';

export function usePortfolioReady() {
  return useContext(IntroContext);
}

export function PortfolioIntro({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const checked = useRef(false);
  const skip = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (checked.current) return;
    checked.current = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.location.hash || window.scrollY > 64) return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return;
      window.sessionStorage.setItem(SESSION_KEY, 'seen');
    } catch {
      // Storage restrictions should never prevent access to the portfolio.
      return;
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    // Dismiss independently of animation events, even if an animation fails.
    const timer = window.setTimeout(() => setOpen(false), 1800);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduce = () => { if (preference.matches) setOpen(false); };
    preference.addEventListener('change', reduce);
    return () => {
      window.clearTimeout(timer);
      preference.removeEventListener('change', reduce);
    };
  }, [open]);

  return (
    <IntroContext.Provider value={!open}>
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
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
            <motion.div aria-hidden className="pointer-events-none absolute size-[min(80vw,36rem)] rounded-full bg-primary/10 blur-[90px]" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1.4, opacity: 1 }} transition={{ duration: 1.6 }} />
            <div aria-hidden className="pointer-events-none absolute inset-x-8 top-8 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-muted-foreground sm:inset-x-12 sm:top-12">
              <span>EYOB HAILU <span className="text-brand">/</span> PORTFOLIO</span>
              <span className="hidden sm:block">DESIGN · CODE · BUILD</span>
            </div>
            <div className="relative flex size-64 items-center justify-center sm:size-80">
              <motion.svg aria-hidden viewBox="0 0 320 320" className="absolute inset-0 size-full overflow-visible text-primary" fill="none" initial={{ rotate: -20 }} animate={{ rotate: 0 }} transition={{ duration: 1.7, ease: 'easeOut' }}>
                <motion.circle cx="160" cy="160" r="137" stroke="currentColor" strokeWidth="0.8" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.35 }} transition={{ duration: 1.25 }} />
                <motion.ellipse cx="160" cy="160" rx="153" ry="62" transform="rotate(-35 160 160)" stroke="currentColor" strokeWidth="1.2" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.75 }} transition={{ duration: 1.2, delay: 0.15 }} />
                <motion.ellipse cx="160" cy="160" rx="64" ry="137" transform="rotate(-35 160 160)" stroke="currentColor" strokeWidth="0.7" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.25 }} transition={{ duration: 1.25, delay: 0.25 }} />
                <motion.circle cx="272" cy="78" r="4" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9, type: 'spring' }} />
              </motion.svg>
              <motion.div aria-hidden className="relative font-mono text-7xl font-semibold tracking-tighter sm:text-8xl" initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.65, delay: 0.1 }}>
                EH<span className="text-brand">_</span>
              </motion.div>
            </div>
            <Dialog.Title asChild>
              <motion.h2 className="relative mt-7 text-3xl font-semibold tracking-tight sm:text-4xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.4 }}>
                {profile.name}
              </motion.h2>
            </Dialog.Title>
            <Dialog.Description asChild>
              <motion.p className="relative mt-3 font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase sm:text-xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.4 }}>
                {profile.role}
              </motion.p>
            </Dialog.Description>
            <motion.div aria-hidden className="relative mt-8 h-px w-24 origin-left bg-primary/60" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.65 }} />
            <Dialog.Close asChild>
              <Button ref={skip} variant="ghost" className="absolute right-6 bottom-8 h-10 gap-2 rounded-full px-4 sm:right-12 sm:bottom-12">
                Skip intro <ArrowUpRight aria-hidden className="size-3.5" />
              </Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </IntroContext.Provider>
  );
}
