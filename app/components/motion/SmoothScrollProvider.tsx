'use client';

import { useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let registered = false;

/**
 * Wires up Lenis smooth-scroll and syncs it with GSAP's ticker so
 * ScrollTrigger-driven animations elsewhere in the app stay in sync.
 * Skips smooth scrolling entirely when the user prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Re-measure trigger positions once everything (fonts/images) settles.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const settleTimeout = window.setTimeout(refresh, 500);

    return () => {
      window.removeEventListener('load', refresh);
      window.clearTimeout(settleTimeout);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return children;
}
