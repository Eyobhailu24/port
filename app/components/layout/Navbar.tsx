'use client';

import { useState } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';
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

const initials = profile.name
  .split(' ')
  .map((n) => n[0])
  .join('');

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#Home" className="font-mono text-lg font-bold tracking-tight">
          {initials}
          <span className="text-brand">_</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 font-mono text-xs tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href="#contact">
              Let&apos;s Talk <ArrowUpRight className="size-3.5" />
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l border-border bg-background">
              <SheetHeader>
                <SheetTitle className="font-mono">
                  {initials}
                  <span className="text-brand">_</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="rounded-md px-3 py-2.5 font-mono text-sm text-foreground/90 uppercase transition-colors hover:bg-muted"
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
      </div>
    </header>
  );
}
