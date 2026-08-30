import { Mail, Phone } from 'lucide-react';
// lucide-react no longer ships brand/logo glyphs, so GitHub/LinkedIn come from react-icons.
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { navItems, profile } from '@/lib/content';
import { Separator } from '@/components/ui/separator';

const socialLinks = [
  { name: 'Email', href: `mailto:${profile.email}`, icon: Mail },
  { name: 'Phone', href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`, icon: Phone },
  { name: 'GitHub', href: profile.github, icon: FaGithub },
  { name: 'LinkedIn', href: profile.linkedin, icon: FaLinkedin },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <h4 className="text-brand mb-3 text-lg font-semibold">
            {profile.name}
          </h4>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {profile.role} based in {profile.location}, building clean,
            responsive, and accessible experiences with modern web tech.
          </p>
        </div>

        <div>
          <h4 className="text-brand mb-3 text-lg font-semibold">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-brand mb-3 text-lg font-semibold">
            Contact
          </h4>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={name}
                title={name}
                className="flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-transparent hover:bg-muted hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
    </footer>
  );
}
