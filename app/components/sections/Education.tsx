import { GraduationCap } from 'lucide-react';
import { education } from '@/lib/content';
import { Reveal } from '@/app/components/motion/Reveal';
import { SectionHeading } from '@/app/components/motion/SectionHeading';

export function Education() {
  return (
    <section id="education" className="relative px-6 py-24 md:py-32">
      <SectionHeading eyebrow="Education" title="My education." />
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {education.map((item) => (
          <Reveal key={item.institution}>
            <div className="glass-panel flex items-start gap-5 p-6 sm:p-8">
              <span className="text-brand flex size-12 shrink-0 items-center justify-center rounded-lg bg-sky-400/10">
                <GraduationCap aria-hidden className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{item.institution}</h3>
                  <span className={item.status === 'Currently enrolled'
                    ? 'text-brand rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium'
                    : 'text-xs text-muted-foreground'}>
                    {item.status}
                  </span>
                </div>
                {item.degree && <p className="mt-2 text-sm text-muted-foreground">{item.degree}</p>}
                {item.period && <p className="mt-2 font-mono text-xs text-muted-foreground">{item.period}</p>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
