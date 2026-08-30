import { Briefcase } from 'lucide-react';
import { experience } from '@/lib/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reveal } from '@/app/components/motion/Reveal';
import { AmbientGlow } from '@/app/components/motion/AmbientGlow';
import { SectionHeading } from '@/app/components/motion/SectionHeading';
import { staggerDelay } from '@/lib/utils';

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24 md:py-32">
      <AmbientGlow variant="subtle" className="-z-10" />
      <SectionHeading eyebrow="Experience" title="Where I've worked." />

      <div className="relative mx-auto max-w-3xl">
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-[19px] w-px bg-lime-400/60 sm:left-[23px]"
        />

        <div className="flex flex-col gap-8">
          {experience.map((job, index) => (
            <Reveal
              key={job.id}
              delay={staggerDelay(index, 0.12)}
              from="left"
              className="relative pl-12 sm:pl-16"
            >
              <span className="text-brand absolute top-1 left-0 flex size-10 items-center justify-center rounded-lg border border-lime-400/30 bg-lime-400/10 sm:size-12">
                <Briefcase className="size-4 sm:size-5" />
              </span>

              <Card className="glass-panel py-6">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">
                    {job.role} · <span className="text-muted-foreground">{job.company}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {job.description}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
