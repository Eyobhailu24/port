import { Mail, Phone } from 'lucide-react';
// lucide-react no longer ships brand/logo glyphs, so GitHub/LinkedIn come from react-icons.
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { navItems, profile } from '@/lib/content';

const socialLinks = [
  { name: 'Email', href: `mailto:${profile.email}`, icon: Mail },
  { name: 'Phone', href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`, icon: Phone },
  { name: 'GitHub', href: profile.github, icon: FaGithub },
  { name: 'LinkedIn', href: profile.linkedin, icon: FaLinkedin },
];

const initials = profile.name
  .split(' ')
  .map((n) => n[0])
  .join('');

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-8 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base font-bold">
            {initials}
            <span className="text-brand">_</span>
          </span>
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={name}
              title={name}
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-sky-400/50 hover:text-sky-700 dark:hover:text-sky-400"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
