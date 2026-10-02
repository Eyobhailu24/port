import { Code2, Container, HardDrive, ShieldCheck, Waypoints, Zap, type LucideIcon } from 'lucide-react';
import type { IconType } from 'react-icons';
import {
  SiCoolify, SiDjango, SiDrizzle, SiExpress, SiFastapi, SiFlutter, SiGit, SiGithub, SiHono, SiMongodb,
  SiNextdotjs, SiNodedotjs, SiPython, SiReact, SiShadcnui, SiSocketdotio, SiTailwindcss,
} from 'react-icons/si';
import { skills } from '@/lib/content';
import { LogoMarquee } from '@/app/components/motion/LogoMarquee';

const icons: Record<string, IconType | LucideIcon> = {
  'React.js': SiReact,
  'Next.js': SiNextdotjs,
  'Node.js': SiNodedotjs,
  Hono: SiHono,
  'Tailwind CSS': SiTailwindcss,
  Flutter: SiFlutter,
  'Express.js': SiExpress,
  MongoDB: SiMongodb,
  'Drizzle ORM': SiDrizzle,
  'Socket.io': SiSocketdotio,
  Django: SiDjango,
  'Context API': SiReact,
  'React Native': SiReact,
  Python: SiPython,
  FastAPI: SiFastapi,
  'shadcn/ui': SiShadcnui,
  Dokploy: Container,
  Coolify: SiCoolify,
  'AWS S3': HardDrive,
  'AWS Lambda': Zap,
  OAuth: ShieldCheck,
  Git: SiGit,
  GitHub: SiGithub,
};

export function SkillsMarquee() {
  const items = skills.map(({ name }) => {
    const Icon = icons[name] ?? (name === 'REST APIs' ? Waypoints : name === 'NextAuth' ? ShieldCheck : Code2);
    return { name, icon: <Icon className="size-7" /> };
  });

  return (
    <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
      <h3 className="mb-6 text-center font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        <span className="text-brand">{'// '}</span>
        My Skills &amp; Technologies
      </h3>
      <LogoMarquee label="Skills and technologies" items={items} duration={72} />
    </div>
  );
}
