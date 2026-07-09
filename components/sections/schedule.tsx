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
  const past = items.filter((item) => new Date(item.date) < new Date());
  const upcoming = items.filter((item) => !past.includes(item));

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
          <div className="hidden md:block">
            <h3 className="text-foreground/70 mb-6 font-serif text-xl md:text-2xl">{t('past')}</h3>
            <ConcertTable concerts={past} columns={columns} />
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
