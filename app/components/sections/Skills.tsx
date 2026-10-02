import {
  Code2,
  Database,
  LayoutGrid,
  Radio,
  Server,
  Smartphone,
} from 'lucide-react';
import { services } from '@/lib/content';
import { Card, CardContent } from '@/components/ui/card';
import { Reveal } from '@/app/components/motion/Reveal';
import { SectionHeading } from '@/app/components/motion/SectionHeading';
import { staggerDelay } from '@/lib/utils';

const icons = [Code2, Server, Smartphone, LayoutGrid, Database, Radio];

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Skills & Services"
        title="What I bring to the table."
        subtitle="The tools and technologies I use to build real products."
      />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = icons[index] ?? Code2;
          return (
            <Reveal key={service.title} delay={staggerDelay(index)}>
              <Card className="glass-panel h-full py-6 transition-colors hover:border-sky-400/50">
                <CardContent className="flex flex-col gap-4">
                  <span className="text-brand flex size-10 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
