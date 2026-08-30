import { Briefcase } from 'lucide-react';
import { experience } from '@/lib/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reveal } from '@/app/components/motion/Reveal';
import { staggerDelay } from '@/lib/utils';

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24 md:py-32">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-brand text-3xl font-bold sm:text-4xl">
          Experience
        </h2>
        <p className="mt-3 text-muted-foreground">Where I&apos;ve worked.</p>
      </Reveal>

      <div className="relative mx-auto max-w-3xl">
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-[19px] w-px bg-sky-400/60 sm:left-[23px]"
        />

        <div className="flex flex-col gap-8">
          {experience.map((job, index) => (
            <Reveal
              key={job.id}
              delay={staggerDelay(index, 0.12)}
              from="left"
              className="relative pl-12 sm:pl-16"
            >
              <span className="absolute top-1 left-0 flex size-10 items-center justify-center rounded-full border border-border/60 bg-background text-muted-foreground sm:size-12">
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
