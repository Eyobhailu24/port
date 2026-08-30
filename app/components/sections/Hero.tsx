'use client';

import { motion, type Variants } from 'motion/react';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { profile } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { AmbientGlow } from '@/app/components/motion/AmbientGlow';

const headline = 'Code, design, deploy — I bring ideas to life.';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="Home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32 text-center"
    >
      <AmbientGlow variant="hero" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 font-mono text-xs tracking-widest text-muted-foreground uppercase backdrop-blur-sm"
        >
          {profile.role}
        </motion.span>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-brand text-4xl leading-tight font-bold text-balance sm:text-5xl md:text-6xl"
        >
          {headline.split(' ').map((w, i) => (
            <motion.span key={i} variants={word} className="inline-block">
              {w}&nbsp;
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          Hi, I&apos;m {profile.name} — a {profile.role.toLowerCase()} building
          fast, reliable web apps from front end to back end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="rounded-full px-6">
            <a href="#projects">
              View Work <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-6">
            <a href={profile.resumeUrl} download>
              Download CV <Download className="size-4" />
            </a>
          </Button>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1.2 },
          y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-10 z-10 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowDown className="size-5" />
      </motion.a>
    </section>
  );
}
