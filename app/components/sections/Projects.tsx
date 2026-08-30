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
import { staggerDelay } from '@/lib/utils';

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-brand text-3xl font-bold sm:text-4xl">
          Projects
        </h2>
        <p className="mt-3 text-muted-foreground">
          A few things I&apos;ve built recently.
        </p>
      </Reveal>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={staggerDelay(index)} className="group h-full">
            <Card className="glass-panel h-full gap-0 overflow-hidden py-0 transition-transform duration-300 group-hover:-translate-y-1">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
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
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="!bg-transparent p-5 pt-0">
                <Button asChild variant="outline" size="sm" className="w-full rounded-full">
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
