import { MessageSquareQuote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Reveal } from '@/app/components/motion/Reveal';
import { SectionHeading } from '@/app/components/motion/SectionHeading';

/**
 * Deliberately a placeholder, not fabricated quotes: no real client
 * testimonials exist yet, and inventing them would misrepresent the site.
 */
export function Testimonials() {
  return (
    <section id="testimonials" className="relative px-6 py-24 md:py-32">
      <SectionHeading eyebrow="Testimonials" title="Client feedback." />

      <Reveal className="mx-auto max-w-xl">
        <Card className="glass-panel py-10 text-center">
          <CardContent className="flex flex-col items-center gap-3">
            <span className="text-brand flex size-12 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10">
              <MessageSquareQuote className="size-5" />
            </span>
            <p className="font-medium">Client feedback coming soon.</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              I&apos;m early in collecting testimonials — this space will hold
              real feedback from people I&apos;ve worked with.
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}
