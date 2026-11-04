'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';

type LogoMarqueeProps = {
  label: string;
  items: { name: string; icon: ReactNode }[];
  duration?: number;
};

export function LogoMarquee({ label, items, duration = 40 }: LogoMarqueeProps) {
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const controller = new AbortController();
    const { signal } = controller;
    let frame = 0;
    let lastFrame = 0;
    let lastInteraction = 0;
    let groupWidth = 0;
    let position = viewport.scrollLeft;
    let expectedScrollLeft = position;
    let hovered = viewport.matches(':hover') && window.matchMedia('(hover: hover)').matches;
    let focused = document.activeElement === viewport;
    let visible = false;
    let drag: { pointerId: number; x: number } | null = null;

    // Keep one identical copy on either side, so manual scrolling can loop
    // in either direction without changing the visible items at the seam.
    const wrap = (value: number) => motionQuery.matches || !groupWidth
      ? value
      : ((value % groupWidth) + groupWidth) % groupWidth + groupWidth;
    const moveTo = (value: number) => {
      position = wrap(value);
      viewport.scrollLeft = position;
      expectedScrollLeft = viewport.scrollLeft;
    };
    const measure = () => {
      groupWidth = group.getBoundingClientRect().width;
      moveTo(viewport.scrollLeft);
    };
    const interact = () => { lastInteraction = performance.now(); };
    const onScroll = () => {
      // Autoplay also emits scroll events. Only user movement should pause it.
      if (Math.abs(viewport.scrollLeft - expectedScrollLeft) < 1) return;
      interact();
      moveTo(viewport.scrollLeft);
    };
    const endDrag = () => {
      if (drag && viewport.hasPointerCapture(drag.pointerId)) {
        viewport.releasePointerCapture(drag.pointerId);
      }
      drag = null;
      delete viewport.dataset.dragging;
      interact();
    };
    const onPointerDown = (event: PointerEvent) => {
      interact();
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      event.preventDefault();
      drag = { pointerId: event.pointerId, x: event.clientX };
      viewport.setPointerCapture(event.pointerId);
      viewport.dataset.dragging = 'true';
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      moveTo(viewport.scrollLeft + drag.x - event.clientX);
      drag.x = event.clientX;
      interact();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      interact();
      const start = motionQuery.matches ? 0 : groupWidth;
      const end = start + groupWidth - viewport.clientWidth;
      const next = event.key === 'Home' ? start : event.key === 'End' ? end
        : viewport.scrollLeft + (event.key === 'ArrowRight' ? 240 : -240);
      moveTo(next);
    };
    const tick = (time: number) => {
      const elapsed = lastFrame ? Math.min(time - lastFrame, 64) : 0;
      if (!paused && !motionQuery.matches && visible && !hovered && !focused && !drag && time - lastInteraction > 1800) {
        moveTo(position + (groupWidth * elapsed) / (duration * 1000));
      }
      lastFrame = time;
      frame = window.requestAnimationFrame(tick);
    };

    viewport.addEventListener('scroll', onScroll, { passive: true, signal });
    viewport.addEventListener('wheel', interact, { passive: true, signal });
    viewport.addEventListener('pointerdown', onPointerDown, { signal });
    viewport.addEventListener('pointermove', onPointerMove, { signal });
    viewport.addEventListener('pointerup', endDrag, { signal });
    viewport.addEventListener('pointercancel', endDrag, { signal });
    viewport.addEventListener('lostpointercapture', endDrag, { signal });
    viewport.addEventListener('pointerenter', (event) => { hovered = event.pointerType === 'mouse'; }, { signal });
    viewport.addEventListener('pointerleave', () => { hovered = false; }, { signal });
    viewport.addEventListener('focus', () => { focused = true; }, { signal });
    viewport.addEventListener('blur', () => { focused = false; }, { signal });
    viewport.addEventListener('keydown', onKeyDown, { signal });
    motionQuery.addEventListener('change', () => { moveTo(0); measure(); }, { signal });

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(group);
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibilityObserver.observe(viewport);
    measure();
    frame = window.requestAnimationFrame(tick);

    return () => {
      controller.abort();
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      endDrag();
    };
  }, [duration, paused]);

  return (
    <div className="logo-marquee" role="region" aria-label={label}>
      <div
        ref={viewportRef}
        className="marquee-viewport rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        tabIndex={0}
        role="group"
        aria-label={`${label}. Swipe, drag, or use the left and right arrow keys to scroll.`}
        data-lenis-prevent-horizontal
      >
        <div className="marquee-track">
          {[0, 1, 2].map((copy) => (
            <ul key={copy} ref={copy === 1 ? groupRef : undefined} className="marquee-group" aria-hidden={copy !== 1 ? true : undefined}>
              {items.map(({ name, icon }) => (
                <li key={name} className="marquee-item group">
                  <span aria-hidden="true" className="text-brand flex size-9 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {icon}
                  </span>
                  <span className="whitespace-nowrap text-base font-semibold tracking-tight text-foreground sm:text-lg">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-end motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={`${paused ? 'Resume' : 'Pause'} ${label.toLowerCase()} animation`}
          className="inline-flex items-center gap-1.5 rounded-full bg-control px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-control-hover hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {paused ? <Play aria-hidden className="size-3" /> : <Pause aria-hidden className="size-3" />}
          {paused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
}
