import { Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionIds, siteConfig } from '@/config/site';

export async function ContactSection() {
  const t = await getTranslations('Contact');

  return (
    <Section id={sectionIds.contact} variant="muted">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            title={t('title')}
            subtitle={t('subtitle')}
            align="center"
          />
          <p className="text-base leading-relaxed text-foreground/70 md:text-lg">
            {t('description')}
          </p>
        </div>

        <a
          href={`mailto:${siteConfig.contactEmail}`}
          className="group mx-auto mt-12 block max-w-xl border border-border bg-background p-8 text-center transition-colors hover:border-foreground/30 md:p-10"
        >
          <Mail className="mx-auto mb-6 size-6 text-foreground/50 transition-colors group-hover:text-foreground" />
          <p className="mb-3 text-sm tracking-[0.15em] text-foreground/50 uppercase">
            {t('email')}
          </p>
          <p className="font-serif text-xl leading-snug tracking-tight break-all text-foreground sm:text-2xl md:text-3xl">
            {siteConfig.contactEmail}
          </p>
        </a>
      </Container>
    </Section>
  );
}
