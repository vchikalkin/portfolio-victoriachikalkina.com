import { getTranslations } from 'next-intl/server';
import { ConcertTable } from '@/components/sections/schedule/concert-table';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionIds } from '@/config/site';
import type { ConcertItem } from '@/lib/types/content';

export async function ScheduleSection() {
  const t = await getTranslations('Schedule');
  const items = t.raw('items') as ConcertItem[];
  const columns = t.raw('columns') as Record<string, string>;
  const upcoming = items.filter((item) => !item.isPast);
  const past = items.filter((item) => item.isPast);

  return (
    <Section id={sectionIds.schedule} variant="muted">
      <Container>
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        {upcoming.length > 0 ? (
          <div className="mb-16">
            <h3 className="mb-6 font-serif text-xl md:text-2xl">{t('upcoming')}</h3>
            <ConcertTable concerts={upcoming} columns={columns} />
          </div>
        ) : null}

        {past.length > 0 ? (
          <div>
            <h3 className="mb-6 font-serif text-xl text-foreground/70 md:text-2xl">
              {t('past')}
            </h3>
            <ConcertTable concerts={past} columns={columns} />
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
