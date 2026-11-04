'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

/**
 * One animation loop owns wheel and anchor scrolling. Touch scrolling stays
 * native, and Lenis honors reduced motion, including preference changes.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: false,
    });
    let anchorFrame = 0;
    let pendingTarget: HTMLElement | null = null;

    const scrollToPendingTarget = () => {
      anchorFrame = 0;
      if (!pendingTarget || lenis.isStopped) return;
      const target = pendingTarget;
      pendingTarget = null;
      lenis.resize();
      lenis.scrollTo(target, { duration: 1.1, lerp: 0 });
    };

    // Radix locks the body for the intro and mobile menu. Stop inertia while
    // locked, and wait for the menu to release its lock before following a link.
    const syncScrollLock = () => {
      if (document.body.hasAttribute('data-scroll-locked')) {
        lenis.stop();
      } else {
        lenis.start();
        if (pendingTarget && !anchorFrame) {
          anchorFrame = window.requestAnimationFrame(scrollToPendingTarget);
        }
      }
    };
    const lockObserver = new MutationObserver(syncScrollLock);
    lockObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-scroll-locked'],
    });
    syncScrollLock();

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.composedPath().find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement);
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return;

      let id: string;
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;

      // Prevent the browser's anchor animation from competing with wheel
      // inertia. Keep the URL/history behavior without starting another scroll.
      event.preventDefault();
      if (window.location.hash !== url.hash) {
        window.history.pushState(null, '', url.hash);
      }
      pendingTarget = target;
      if (anchorFrame) window.cancelAnimationFrame(anchorFrame);
      anchorFrame = window.requestAnimationFrame(scrollToPendingTarget);
    };
    window.addEventListener('click', onAnchorClick);

    const onHistoryNavigation = () => {
      // Back/forward restores a browser-owned position. Cancel the previous
      // destination so its animation cannot pull the page away again.
      pendingTarget = null;
      window.cancelAnimationFrame(anchorFrame);
      anchorFrame = 0;
      lenis.stop();
      syncScrollLock();
    };
    window.addEventListener('popstate', onHistoryNavigation);

    return () => {
      window.removeEventListener('click', onAnchorClick);
      window.removeEventListener('popstate', onHistoryNavigation);
      window.cancelAnimationFrame(anchorFrame);
      lockObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  return children;
}
