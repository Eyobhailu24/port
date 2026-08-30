'use client';

import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Thin progress bar pinned to the top of the viewport, tracking scroll
 * position. Replaces the old dead ProgressBar.jsx stub with a real
 * implementation.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-lime-500 dark:bg-lime-400"
    />
  );
}
