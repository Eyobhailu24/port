'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { profile } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { usePortfolioReady } from '@/app/components/motion/PortfolioIntro';

const socials = [
  { name: 'GitHub', href: profile.github, icon: FaGithub },
  {
    name: 'LinkedIn',
    href: profile.linkedin,
    icon: FaLinkedin,
  },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.15,
    },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const fadeUp = (delay: number, ready: boolean, reduceMotion: boolean | null) => ({
  initial: false as const,
  animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
  transition: { duration: reduceMotion ? 0 : 0.5, delay: ready && !reduceMotion ? delay : 0 },
});

function Headline({ text }: { text: string }) {
  const ready = usePortfolioReady();
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      variants={container}
      initial={false}
      animate={ready ? 'visible' : 'hidden'}
    >
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          variants={reduceMotion ? { hidden: { opacity: 1, y: 0, filter: 'none' }, visible: { opacity: 1, y: 0, filter: 'none' } } : word}
          className="inline-block"
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
}

/** Small wireframe "globe" made of stroked ellipses — no external asset. */
function WireframeGlobe() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className="pointer-events-none absolute top-1/2 -right-16 h-[360px] w-[360px] -translate-y-1/2 text-sky-400 opacity-25 sm:h-[440px] sm:w-[440px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="200" cy="200" r="150" />
      <ellipse cx="200" cy="200" rx="150" ry="50" />
      <ellipse cx="200" cy="200" rx="150" ry="95" />
      <ellipse cx="200" cy="200" rx="60" ry="150" />
      <ellipse cx="200" cy="200" rx="110" ry="150" />
      <line x1="50" y1="200" x2="350" y2="200" />
    </svg>
  );
}

function CodeWindow() {
  return (
    <div className="hero-code-panel relative overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-500/70" />
        <span className="size-2.5 rounded-full bg-yellow-500/70" />
        <span className="size-2.5 rounded-full bg-sky-500/70" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">
          eyob.profile.js
        </span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        <code>
          <span className="text-muted-foreground">01 </span>
          <span className="text-muted-foreground">
            const{' '}
          </span>
          <span>EyobHailu</span> = {'{'}
          {'\n'}
          <span className="text-muted-foreground">02 </span>
          {'  '}role:{' '}
          <span className="text-brand">
            &apos;Full-Stack Developer&apos;
          </span>
          ,{'\n'}
          <span className="text-muted-foreground">03 </span>
          {'  '}stack: [
          <span className="text-brand">
            &apos;React&apos;
          </span>
          ,{' '}
          <span className="text-brand">
            &apos;Next.js&apos;
          </span>
          ,{' '}
          <span className="text-brand">
            &apos;Node.js&apos;
          </span>
          ,{' '}
          <span className="text-brand">
            &apos;Hono&apos;
          </span>
          ],
          {'\n'}
          <span className="text-muted-foreground">04 </span>
          {'  '}location:{' '}
          <span className="text-brand">
            &apos;Missouri, United States&apos;
          </span>
          ,{'\n'}
          <span className="text-muted-foreground">05 </span>
          {'  '}mission:
          {'\n'}
          <span className="text-muted-foreground">06 </span>
          {'    '}
          <span className="text-brand">
            &apos;Turn ideas into fast, reliable apps.&apos;
          </span>
          ,{'\n'}
          <span className="text-muted-foreground">07 </span>
          {'}'};{'\n'}
          <span className="text-muted-foreground">08 </span>
          {'\n'}
          <span className="text-muted-foreground">09 </span>
          <span className="text-muted-foreground">
            {
              '// Building real products, one commit at a time.'
            }
          </span>
        </code>
      </pre>
    </div>
  );
}

export function Hero() {
  const ready = usePortfolioReady();
  const reduceMotion = useReducedMotion();
  return (
    <section
      id="Home"
      className="relative overflow-hidden"
    >
      {/* Vertical social rail — desktop only */}
      <div className="absolute top-1/2 left-6 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        <span className="h-14 w-px bg-border" />
        {socials.map(({ name, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="text-muted-foreground transition-colors hover:text-sky-700 dark:hover:text-sky-400"
          >
            <Icon className="size-4" />
          </a>
        ))}
        <span className="h-14 w-px bg-border" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-28">
        {/* Text column */}
        <div>
          <motion.p
            {...fadeUp(0, ready, reduceMotion)}
            className="text-brand mb-4 font-mono text-sm"
          >
            &lt; Hello, I&apos;m /&gt;
          </motion.p>

          <h1 id="hero-heading" tabIndex={-1} className="text-4xl leading-[1.05] font-bold tracking-tight text-balance uppercase outline-none sm:text-5xl md:text-6xl">
            <Headline text="Eyob" />
            <span className="text-brand">
              <Headline text="Hailu" />
            </span>
          </h1>

          <motion.p
            {...fadeUp(0.3, ready, reduceMotion)}
            className="mt-4 font-mono text-sm tracking-widest text-muted-foreground uppercase"
          >
            Full-Stack Developer
          </motion.p>

          <motion.p
            {...fadeUp(0.4, ready, reduceMotion)}
            className="mt-5 max-w-md text-sm text-muted-foreground sm:text-base"
          >
            I build fast, reliable web apps from front end
            to back end — turning ideas into functional,
            scalable products.
          </motion.p>

          <motion.div
            {...fadeUp(0.5, ready, reduceMotion)}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button asChild size="lg">
              <a href="#projects">
                View My Work{' '}
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={profile.resumeUrl} download>
                Download Resume{' '}
                <Download className="size-4" />
              </a>
            </Button>
          </motion.div>

          <motion.p
            {...fadeUp(0.6, ready, reduceMotion)}
            className="mt-8 font-mono text-xs text-muted-foreground"
          >
            <span className="text-brand">{'// '}</span>
          </motion.p>
        </div>

        {/* Code window column */}
        <motion.div
          initial={false}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: ready && !reduceMotion ? 0.2 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative min-w-0"
        >
          <WireframeGlobe />
          <CodeWindow />
        </motion.div>
      </div>
    </section>
  );
}
