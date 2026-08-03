import { getTranslations } from 'next-intl/server';
import { EraBlock } from '@/components/sections/repertoire/era-block';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionIds } from '@/config/site';
import type { RepertoireEra } from '@/lib/types/content';

export async function RepertoireSection() {
  const t = await getTranslations('Repertoire');
  const eras = t.raw('eras') as RepertoireEra[];

  return (
    <Section id={sectionIds.repertoire} variant="muted">
      <Container>
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        <div className="flex flex-col gap-10">
          {eras.map((era) => (
            <EraBlock key={era.id} title={era.title} composers={era.composers} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
