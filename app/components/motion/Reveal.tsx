'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Direction the content travels in from as it reveals. */
  from?: 'up' | 'down' | 'left' | 'right' | 'none';
  as?: 'div' | 'li';
};

const offset = 24;

function getInitial(from: RevealProps['from']) {
  switch (from) {
    case 'up':
      return { opacity: 0, y: offset };
    case 'down':
      return { opacity: 0, y: -offset };
    case 'left':
      return { opacity: 0, x: offset };
    case 'right':
      return { opacity: 0, x: -offset };
    default:
      return { opacity: 0 };
  }
}

/**
 * Shared scroll-reveal wrapper. Replaces the hand-rolled IntersectionObserver
 * pattern that used to be duplicated across nearly every section.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = 'up',
  as = 'div',
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const variants: Variants = {
    hidden: getInitial(from),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const MotionTag = as === 'li' ? motion.li : motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
