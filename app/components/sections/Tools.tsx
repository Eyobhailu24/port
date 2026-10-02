import { Container, HardDrive, Zap, type LucideIcon } from 'lucide-react';
import { SiCoolify, SiStripe } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { tools } from '@/lib/content';
import { Reveal } from '@/app/components/motion/Reveal';
import { LogoMarquee } from '@/app/components/motion/LogoMarquee';

// Plain <img> is used for these logos (not next/image) since Next's image
// optimizer doesn't process SVGs without extra config, and these are tiny
// static assets where optimization wouldn't help anyway.

const platformIcons: Record<string, IconType | LucideIcon> = {
  Dokploy: Container,
  Coolify: SiCoolify,
  'AWS S3': HardDrive,
  'AWS Lambda': Zap,
  Stripe: SiStripe,
};

export function Tools() {
  const items = tools.map((tool) => {
    const Icon = platformIcons[tool.name] ?? Container;
    return {
      name: tool.name,
      icon: tool.logo ? (
        <img
          src={tool.logo}
          alt=""
          width={28}
          height={28}
          className={`size-7 object-contain ${tool.name === 'Cloudinary' ? 'brightness-0 dark:brightness-100' : ''}`}
        />
      ) : <Icon className="size-7" />,
    };
  });

  return (
    <section className="relative overflow-hidden px-6 py-16">
      <Reveal className="mx-auto mb-10 max-w-2xl text-center">
        <h3 className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          <span className="text-brand">{'// '}</span>
          Tools &amp; Platforms I Work With
        </h3>
      </Reveal>

      <div className="mx-auto max-w-5xl">
        <LogoMarquee label="Tools and platforms" items={items} duration={44} />
      </div>
    </section>
  );
}
