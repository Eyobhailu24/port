'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, MapPin, Menu, X } from 'lucide-react';
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
            <SheetContent side="right" showCloseButton={false} className="mobile-nav-panel" overlayClassName="mobile-nav-overlay" data-lenis-prevent>
              <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-primary/10 blur-3xl" />
              <SheetHeader className="relative px-6 pt-7 pb-4">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-2xl font-semibold">{initials}<span className="text-brand">_</span></span>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="rounded-full" aria-label="Close menu"><X aria-hidden className="size-4" /></Button>
                    </SheetClose>
                  </div>
                </div>
                <SheetTitle className="text-2xl font-semibold tracking-tight">Take a look around.</SheetTitle>
                <SheetDescription className="mt-1.5 text-sm">A little about me, and what I build.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="relative px-4">
                <motion.ul initial={reduceMotion ? false : 'hidden'} animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.055, delayChildren: reduceMotion ? 0 : 0.08 } } }} className="space-y-1.5">
                  {navItems.map((item, index) => (
                    <motion.li key={item.href} variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } } }}>
                      <SheetClose asChild>
                        <a
                          href={item.href}
                          aria-current={activeSection === item.href ? 'location' : undefined}
                          className="group flex min-h-14 items-center gap-4 rounded-2xl px-4 py-3 text-foreground/90 transition-colors hover:bg-control/60 focus-visible:outline-2 focus-visible:outline-ring aria-[current=location]:bg-primary/10 aria-[current=location]:text-primary"
                        >
                          <span className="font-mono text-[10px] text-muted-foreground group-aria-[current=location]:text-primary">{String(index + 1).padStart(2, '0')}</span>
                          <span className="flex-1 text-lg font-medium tracking-tight">{item.name}</span>
                          <ArrowUpRight aria-hidden className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-aria-[current=location]:text-primary motion-reduce:transition-none" />
                        </a>
                      </SheetClose>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>
              <div className="relative mt-auto px-6 pt-8 pb-6">
                <p className="mb-3 text-sm text-muted-foreground">Have something in mind?</p>
                <SheetClose asChild>
                  <Button asChild className="h-12 w-full justify-between rounded-2xl px-4">
                    <a href="#contact">Let&apos;s Talk <ArrowUpRight aria-hidden className="size-4" /></a>
                  </Button>
                </SheetClose>
                <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin aria-hidden className="size-3" />{profile.location}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </header>
  );
}
