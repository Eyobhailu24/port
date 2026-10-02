import { GraduationCap } from 'lucide-react';
import { education } from '@/lib/content';
import { Reveal } from '@/app/components/motion/Reveal';
import { SectionHeading } from '@/app/components/motion/SectionHeading';

export function Education() {
  return (
    <section id="education" className="relative px-6 py-24 md:py-32">
      <SectionHeading eyebrow="Education" title="Where it started." />
      <div className="mx-auto max-w-3xl">
        {education.map((item) => (
          <Reveal key={item.institution}>
            <div className="glass-panel flex items-start gap-5 p-6 sm:p-8">
              <span className="text-brand flex size-12 shrink-0 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10">
                <GraduationCap aria-hidden className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">{item.degree}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.institution}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
