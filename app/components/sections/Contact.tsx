'use client';

import { useRef, useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Mail, Phone, Send } from 'lucide-react';
// lucide-react no longer ships brand/logo glyphs, so GitHub/LinkedIn come from react-icons.
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { profile } from '@/lib/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Reveal } from '@/app/components/motion/Reveal';
import { AmbientGlow } from '@/app/components/motion/AmbientGlow';
import { SectionHeading } from '@/app/components/motion/SectionHeading';

const contactLinks = [
  { name: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  {
    name: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`,
    icon: Phone,
  },
  { name: 'GitHub', value: '@Eyobhailu24', href: profile.github, icon: FaGithub },
  { name: 'LinkedIn', value: 'Eyob Hailu', href: profile.linkedin, icon: FaLinkedin },
];

const projectTypes = [
  { value: 'new-project', label: 'New Project' },
  { value: 'freelance', label: 'Freelance Work' },
  { value: 'full-time', label: 'Full-Time Opportunity' },
  { value: 'other', label: 'Other' },
];

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current) return;

    setSubmitting(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        body: new FormData(formRef.current),
      });

      if (res.ok) {
        toast.success('Message sent successfully!');
        formRef.current.reset();
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <AmbientGlow variant="subtle" className="-z-10" />
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something together."
        subtitle="Have a project in mind? Send me a message."
      />

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <Reveal from="left">
          <Card className="glass-panel h-full py-8">
            <CardHeader>
              <CardTitle className="text-brand text-lg">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {contactLinks.map(({ name, value, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 text-sm text-foreground/90 transition-colors hover:text-foreground"
                >
                  <span className="text-brand flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-400/10">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">{name}</span>
                    {value}
                  </span>
                </a>
              ))}

              <div className="mt-2 pt-4 text-sm">
                <span className="block text-xs text-muted-foreground">Location</span>
                {profile.location}
              </div>
              <div className="text-sm">
                <span className="block text-xs text-muted-foreground">Response time</span>
                {profile.responseTime}
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal from="right" delay={0.1}>
          <Card className="glass-panel h-full py-8">
            <CardHeader>
              <CardTitle className="text-brand text-lg">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="user_name">Full Name</Label>
                    <Input id="user_name" name="user_name" required placeholder="Your name" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="user_email">Email Address</Label>
                    <Input
                      id="user_email"
                      name="user_email"
                      type="email"
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="project_type">Project Type</Label>
                  <Select name="project_type" defaultValue="new-project">
                    <SelectTrigger id="project_type" className="w-full">
                      <SelectValue placeholder="Select a project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project, goals, and timeline..."
                  />
                </div>

                <Button type="submit" disabled={submitting} className="mt-1">
                  {submitting ? (
                    <>
                      Sending <Loader2 className="size-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message <Send className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
