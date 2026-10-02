import type { ReactNode } from 'react';
import { Reveal } from '@/app/components/motion/Reveal';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
};

/**
 * Shared "// EYEBROW_LABEL" + heading pattern used above every section,
 * matching the reference's small monospace section tags.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'mx-auto mb-14 max-w-2xl',
        align === 'center' ? 'text-center' : 'max-w-none text-left',
        className
      )}
    >
      <p className="text-brand mb-3 font-mono text-xs font-medium tracking-[0.2em] uppercase">
        {'// '}{eyebrow}
      </p>
      <h2 className="text-3xl font-bold text-balance sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </Reveal>
  );
}
