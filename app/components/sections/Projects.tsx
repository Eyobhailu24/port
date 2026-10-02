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
            <Card className="glass-panel h-full gap-0 overflow-hidden py-0 transition-colors hover:border-sky-400/50">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className="absolute top-3 left-3 font-mono text-[10px] tracking-wider uppercase">
                  Featured
                </Badge>
              </div>

              <CardHeader className="pt-5">
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="font-mono">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="!bg-transparent p-5 pt-0">
                <Button asChild variant="outline" size="sm" className="w-full">
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
