'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems, profile } from '@/lib/content';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { scrollY } = useScroll();
  const [floating, setFloating] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (current) => {
    setFloating(current > 40);
  });

  return (
    <motion.header className="fixed inset-x-0 top-4 z-50 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center justify-center">
      <div
        className={cn(
          'flex items-center gap-1 rounded-full border border-white/10 px-2 py-2 transition-all duration-300',
          floating
            ? 'glass-panel shadow-lg shadow-black/10'
            : 'bg-background/40 backdrop-blur-md'
        )}
      >
        <a
          href="#Home"
          className="text-brand px-3 text-sm font-semibold tracking-tight"
        >
          {profile.name.split(' ')[0]}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 pl-1">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden rounded-full sm:inline-flex">
            <a href="#contact">Let&apos;s Talk</a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-panel border-l">
              <SheetHeader>
                <SheetTitle className="text-brand">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="rounded-lg px-3 py-2.5 text-base text-foreground/90 transition-colors hover:bg-muted"
                    >
                      {item.name}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button asChild className="mt-2 rounded-full">
                    <a href="#contact">Let&apos;s Talk</a>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
