import { getTranslations } from 'next-intl/server';
import { EraBlock } from '@/components/sections/repertoire/era-block';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionIds } from '@/config/site';
import { getRepertoire } from '@/lib/sanity/content';

export async function RepertoireSection() {
  const t = await getTranslations('Repertoire');
  const eras = await getRepertoire();

  if (eras.length === 0) {
    return null;
  }

  return (
    <Section id={sectionIds.repertoire} variant="muted">
      <Container>
        <SectionHeading title={t('title')} />
        <div className="divide-y divide-border">
          {eras.map((era) => (
            <EraBlock key={era.id} title={era.title} composers={era.composers} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
