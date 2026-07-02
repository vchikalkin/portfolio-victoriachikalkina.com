'use client';

import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionIds, siteConfig } from '@/config/site';

export function ContactSection() {
  const t = useTranslations('Contact');

  return (
    <Section id={sectionIds.contact}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <SectionHeading title={t('title')} subtitle={t('subtitle')} />
            <p className="max-w-md text-base leading-relaxed text-foreground/70 md:text-lg">
              {t('description')}
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              <Mail className="size-4" />
              {siteConfig.contactEmail}
            </a>
          </div>

          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm text-foreground/70">
                  {t('form.name')} <span className="text-foreground/40">*</span>
                </span>
                <input
                  required
                  type="text"
                  name="name"
                  autoComplete="name"
                  className="w-full border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-foreground/40"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm text-foreground/70">
                  {t('form.email')} <span className="text-foreground/40">*</span>
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="w-full border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-foreground/40"
                />
              </label>
            </div>
            <label className="block space-y-2">
              <span className="text-sm text-foreground/70">{t('form.subject')}</span>
              <input
                type="text"
                name="subject"
                className="w-full border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-foreground/40"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-foreground/70">
                {t('form.message')} <span className="text-foreground/40">*</span>
              </span>
              <textarea
                required
                name="message"
                rows={5}
                className="w-full resize-y border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-foreground/40"
              />
            </label>
            <Button type="submit" className="rounded-none px-8">
              {t('form.submit')}
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  );
}
