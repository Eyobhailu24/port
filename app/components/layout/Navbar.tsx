'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { navItems, profile } from '@/lib/content';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import { ThemeToggle } from './ThemeToggle';

const initials = profile.name
  .split(' ')
  .map((n) => n[0])
  .join('');

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#Home');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const sections = navItems.map(({ href }) => ({ href, element: document.querySelector(href) }));

    const updateNavigation = () => {
      setScrolled(window.scrollY > 64);
      const current = [...sections].reverse().find(({ element }) => element && element.getBoundingClientRect().top <= 180);
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
      setActiveSection(atBottom ? '#contact' : current?.href ?? '#Home');
      frame = 0;
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateNavigation);
    };

    updateNavigation();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <motion.div
        initial={false}
        animate={{ maxWidth: scrolled ? 1088 : 1200, y: scrolled ? 6 : 0, paddingTop: scrolled ? 10 : 16, paddingBottom: scrolled ? 10 : 16 }}
        transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 240, damping: 30, mass: 0.8 }}
        data-scrolled={scrolled}
        className="navbar-shell pointer-events-auto mx-auto flex w-full items-center justify-between gap-3 rounded-full px-4 sm:px-5"
      >
        <a href="#Home" aria-label={`${profile.name}, back to top`} className="shrink-0 rounded-full px-2 font-mono text-lg font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          {initials}
          <span className="text-brand">_</span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeSection === item.href ? 'location' : undefined}
              className="relative rounded-full px-3 py-2.5 font-mono text-[11px] tracking-wide text-muted-foreground uppercase transition-colors hover:bg-accent/60 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=location]:text-primary"
            >
              {activeSection === item.href && (
                <motion.span
                  layoutId={reduceMotion ? undefined : 'active-nav-pill'}
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden rounded-full px-4 sm:inline-flex">
            <a href="#contact">
              Let&apos;s Talk <ArrowUpRight className="size-3.5" />
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-0 bg-background">
              <SheetHeader>
                <SheetTitle className="font-mono">
                  {initials}
                  <span className="text-brand">_</span>
                </SheetTitle>
                <SheetDescription>Explore my work and get in touch.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      aria-current={activeSection === item.href ? 'location' : undefined}
                      className="rounded-xl px-3 py-3 font-mono text-sm text-foreground/90 uppercase transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring aria-[current=location]:bg-accent aria-[current=location]:text-primary"
                    >
                      {item.name}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button asChild className="mt-2">
                    <a href="#contact">
                      Let&apos;s Talk <ArrowUpRight className="size-3.5" />
                    </a>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </header>
  );
}
