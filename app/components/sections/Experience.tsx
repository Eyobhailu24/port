'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, BriefcaseBusiness, GraduationCap, MapPin } from 'lucide-react';
import { experience, formatExperienceDate, type ExperienceItem } from '@/lib/content';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/app/components/motion/SectionHeading';

function Period({ job }: { job: ExperienceItem }) {
  return (
    <>
      <time dateTime={job.startDate}>{formatExperienceDate(job.startDate)}</time>
      <span aria-hidden className="mx-1.5 text-primary/60">—</span>
      <span className="sr-only"> to </span>
      <time dateTime={job.endDate}>{formatExperienceDate(job.endDate)}</time>
    </>
  );
}

function TimelineEntry({ job, index, mounted }: { job: ExperienceItem; index: number; mounted: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const reduceMotion = useReducedMotion();
  const visible = !mounted || reduceMotion || inView;
  const Icon = job.kind === 'Internship' ? GraduationCap : BriefcaseBusiness;

  return (
    <li ref={ref} className="relative pl-10 md:grid md:grid-cols-[10rem_minmax(0,1fr)] md:gap-16 md:pl-0">
      <div className="hidden pt-6 text-right md:block">
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Chapter {String(index + 1).padStart(2, '0')}</p>
        <p className="mt-3 font-mono text-xs leading-6"><Period job={job} /></p>
        <p className="mt-1 text-xs text-muted-foreground">{job.kind}</p>
      </div>
      <span
        aria-hidden
        data-active={visible}
        className="timeline-milestone absolute top-7 left-1.5 size-3 rounded-full md:left-[186px]"
      />
      <motion.article
        initial={false}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel group relative min-w-0 p-5 sm:p-7"
        aria-labelledby={`experience-${job.id}`}
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="text-brand flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10"><Icon aria-hidden className="size-5" /></span>
          <span className="rounded-full bg-control/60 px-3 py-1 font-mono text-[10px] tracking-wide text-muted-foreground">{job.kind === 'Internship' ? 'Internship' : 'Experience'}</span>
        </div>
        <p className="mb-3 font-mono text-[11px] text-muted-foreground md:hidden"><Period job={job} /></p>
        <p className="text-brand mb-1.5 text-sm font-medium">{job.company}</p>
        <h3 id={`experience-${job.id}`} className="text-xl leading-snug font-semibold tracking-tight sm:text-2xl">{job.role}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin aria-hidden className="size-3.5 shrink-0" />{job.location}</p>
        <ul className="mt-6 space-y-3">
          {job.highlights.map(highlight => (
            <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <ArrowUpRight aria-hidden className="mt-1 size-3.5 shrink-0 text-primary/70" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-1.5" aria-label={`Technologies used at ${job.company}`}>
          {job.stack.map(tech => <Badge key={tech} variant="secondary" className="max-w-full font-mono text-[10px] whitespace-normal break-words">{tech}</Badge>)}
        </div>
      </motion.article>
    </li>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  useEffect(() => setMounted(true), []);

  return (
    <section id="experience" className="relative px-6 py-24 md:py-32">
      <SectionHeading eyebrow="Experience" title="Where I've worked." subtitle="From connected devices to full-stack platforms." />
      <div ref={ref} className="relative mx-auto max-w-5xl">
        <div aria-hidden className="absolute top-7 bottom-7 left-[11px] w-px bg-primary/15 md:left-[191px]">
          <motion.div className="h-full w-full origin-top bg-primary/75 shadow-[0_0_12px_var(--primary)]" style={{ scaleY: reduceMotion ? 1 : progress }} />
        </div>
        <ol className="space-y-10 md:space-y-12">
          {experience.map((job, index) => <TimelineEntry key={job.id} job={job} index={index} mounted={mounted} />)}
        </ol>
      </div>
    </section>
  );
}
