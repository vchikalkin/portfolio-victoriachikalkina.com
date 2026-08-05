import { getTranslations } from 'next-intl/server';
import { BiographyBlock } from '@/components/sections/biography/biography-block';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionIds } from '@/config/site';
import type { BiographyContent } from '@/lib/types/biography';

export async function BiographySection() {
  const t = await getTranslations('Biography');
  const content = t.raw('content') as BiographyContent;

  return (
    <Section id={sectionIds.biography}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <SectionHeading title={t('title')} subtitle={content.tagline} />
          <div className="space-y-10">
            <div className="space-y-4">
              {content.intro.map((paragraph) => 
                { return <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-pretty text-foreground/80 md:text-lg"
                >
                  {paragraph}
                </p> }
              )}
            </div>
            {content.sections.map((section) => (
              <BiographyBlock key={section.title} section={section} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
