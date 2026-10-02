import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { projects } from '@/lib/content';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/app/components/motion/Reveal';
import { AmbientGlow } from '@/app/components/motion/AmbientGlow';
import { SectionHeading } from '@/app/components/motion/SectionHeading';
import { staggerDelay } from '@/lib/utils';

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      <AmbientGlow variant="subtle" className="-z-10" />
      <SectionHeading
        eyebrow="Featured Projects"
        title="Selected work."
        subtitle="A few things I've built recently."
      />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={staggerDelay(index)} className="group h-full">
            <Card className="glass-panel h-full gap-0 overflow-hidden py-0 [--card-spacing:--spacing(5)] transition-transform duration-300 motion-safe:hover:-translate-y-1">
              <div className="relative aspect-video shrink-0 overflow-hidden">
                {project.img ? (
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div aria-hidden className="text-brand flex h-full items-center justify-center p-6 text-center text-2xl font-semibold">
                    {project.title}
                  </div>
                )}
                <Badge className="absolute top-3 left-3 font-mono text-[10px] tracking-wider uppercase">
                  Featured
                </Badge>
              </div>

              <CardHeader className="pt-5 pb-2">
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                {project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-mono">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="px-5 pt-6 pb-5">
                <Button asChild variant="outline" className="h-10 w-full">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Visit Live Site <ExternalLink className="size-3.5" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
