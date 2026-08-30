import { profile, skills } from '@/lib/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Reveal } from '@/app/components/motion/Reveal';
import { AmbientGlow } from '@/app/components/motion/AmbientGlow';

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <AmbientGlow variant="subtle" className="-z-10" />

      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-brand text-3xl font-bold sm:text-4xl">
          About Me
        </h2>
        <p className="mt-3 text-muted-foreground">
          A little about who I am and what I bring to the table.
        </p>
      </Reveal>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        <Reveal delay={0} className="md:col-span-1">
          <Card className="glass-panel h-full items-center py-8 text-center">
            <CardContent className="flex h-full flex-col items-center gap-4">
              <Avatar size="lg" className="size-24">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>
                  {profile.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{profile.name}</p>
                <p className="text-sm text-muted-foreground">{profile.location}</p>
              </div>
              <p className="mt-auto text-sm text-muted-foreground">
                {profile.education}
              </p>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-1">
          <Card className="glass-panel h-full py-8">
            <CardHeader>
              <CardTitle className="text-brand text-lg">Bio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {profile.bio}
              </p>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.2} className="md:col-span-1">
          <Card className="glass-panel h-full py-8">
            <CardHeader>
              <CardTitle className="text-brand text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} />
                </div>
              ))}
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
