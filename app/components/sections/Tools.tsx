import { tools } from '@/lib/content';
import { Reveal } from '@/app/components/motion/Reveal';

// Plain <img> is used for these logos (not next/image) since Next's image
// optimizer doesn't process SVGs without extra config, and these are tiny
// static assets where optimization wouldn't help anyway.

export function Tools() {
  // Duplicate the list so the CSS marquee can loop seamlessly.
  const track = [...tools, ...tools];

  return (
    <section className="relative overflow-hidden px-6 py-16">
      <Reveal className="mx-auto mb-10 max-w-2xl text-center">
        <h3 className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          <span className="text-brand">// </span>
          Tools &amp; Platforms I Work With
        </h3>
      </Reveal>

      <div
        className="mx-auto max-w-5xl [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        style={{ ['--marquee-duration' as string]: '28s' }}
      >
        <div className="animate-marquee flex w-max items-center gap-16 hover:[animation-play-state:paused]">
          {track.map((tool, i) => (
            <div
              key={`${tool.id}-${i}`}
              className="flex shrink-0 items-center gap-2 grayscale opacity-60 transition duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <img src={tool.logo} alt="" width={28} height={28} aria-hidden="true" />
              <img src={tool.wordmark} alt={tool.name} width={90} height={20} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
