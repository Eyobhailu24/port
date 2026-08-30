import { cn } from '@/lib/utils';

type AmbientGlowProps = {
  className?: string;
  /** Render fewer blobs / lower opacity for a subtler section background. */
  variant?: 'hero' | 'subtle';
};

/**
 * Decorative animated neon-green glow behind hero/section content — a
 * couple of blurred, solid-color (no gradient) circles drifting slowly, kept
 * restrained so the flat-black "terminal" background stays dominant.
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
      <div className={cn('absolute inset-0', subtle ? 'opacity-10' : 'opacity-20')}>
        <div className="animate-blob-first absolute top-1/4 left-1/4 h-[36vmax] w-[36vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/50 blur-[100px]" />
        {!subtle && (
          <div className="animate-blob-fourth absolute top-1/2 right-1/4 h-[30vmax] w-[30vmax] translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500/40 blur-[100px]" />
        )}
      </div>
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] bg-background/60" />
    </div>
  );
}
