import { Building2, Code2 } from 'lucide-react';
import { highlights, profile } from '@/lib/content';
import { Reveal } from '@/app/components/motion/Reveal';
import { SkillsMarquee } from './SkillsMarquee';

const statIcons = [Code2, Building2];

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
        <Reveal from="left" className="relative mx-auto w-full max-w-xs lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-full w-full object-cover object-top grayscale contrast-110 brightness-90"
            />
            <div className="absolute inset-0 bg-sky-500/15 mix-blend-color" />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_40px_rgba(0,0,0,0.55)]" />
          </div>
        </Reveal>

        <div>
          <p className="text-brand mb-3 font-mono text-xs font-medium tracking-[0.2em] uppercase">
            {'// About Me'}
          </p>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-bold text-balance sm:text-4xl">
              I&apos;m {profile.name}, a developer who values{' '}
              <span className="text-brand">clean code</span> and{' '}
              <span className="text-brand">reliability</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {profile.bio}
            </p>
          </Reveal>

          <Reveal
            delay={0.25}
            className="mt-8 flex flex-wrap gap-x-10 gap-y-4 pt-4"
          >
            {highlights.map((item, i) => {
              const Icon = statIcons[i] ?? Code2;
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-brand flex size-10 items-center justify-center rounded-lg bg-sky-400/10">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-xl font-bold">{item.value}</p>
                    <p className="text-xs text-muted-foreground uppercase">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
      <SkillsMarquee />
    </section>
  );
}
