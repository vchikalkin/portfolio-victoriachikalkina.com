import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionIds } from '@/config/site';

export async function BiographySection() {
  const t = await getTranslations('Biography');
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <Section id={sectionIds.biography}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <SectionHeading title={t('title')} subtitle={t('subtitle')} />
          <div className="space-y-6">
            {paragraphs.map((paragraph) => 
              { return <p
                key={paragraph.slice(0, 32)}
                className="text-base leading-relaxed text-foreground/80 md:text-lg"
              >
                {paragraph}
              </p> }
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
