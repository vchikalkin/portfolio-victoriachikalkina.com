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
          <SectionHeading title={t('title')} subtitle={t('subtitle')} align="center" />
          <p className="text-base leading-relaxed text-pretty text-foreground/70 md:text-lg">
            {t('description')}
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-10 inline-block text-lg text-foreground underline-offset-4 hover:underline md:text-xl"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </Container>
    </Section>
  );
}
