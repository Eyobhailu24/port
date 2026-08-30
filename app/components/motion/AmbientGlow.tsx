import { cn } from '@/lib/utils';

type AmbientGlowProps = {
  className?: string;
  /** Render fewer blobs / lower opacity for a subtler section background. */
  variant?: 'hero' | 'subtle';
};

/**
 * Decorative animated sky-blue glow behind hero/section content — a few
 * blurred, solid-color (no gradient) circles drifting slowly. Replaces the
 * old Spotlight.jsx (CSS glow) and Sparkles.jsx (tsparticles) components
 * with a single, lighter-weight effect.
 */
export function AmbientGlow({ className, variant = 'hero' }: AmbientGlowProps) {
  const subtle = variant === 'subtle';

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      <div
        className={cn(
          'absolute inset-0',
          subtle ? 'opacity-30 dark:opacity-40' : 'opacity-50 dark:opacity-70'
        )}
      >
        <div className="animate-blob-first absolute top-1/4 left-1/4 h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/40 blur-[80px]" />
        <div className="animate-blob-fourth absolute top-1/2 left-1/2 h-[35vmax] w-[35vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/30 blur-[80px]" />
        {!subtle && (
          <div className="animate-blob-third absolute top-1/3 right-1/4 h-[30vmax] w-[30vmax] translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/30 blur-[80px]" />
        )}
      </div>
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] bg-background/40" />
    </div>
  );
}
