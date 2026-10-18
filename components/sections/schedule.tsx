import { getTranslations } from 'next-intl/server';
import { ConcertList } from '@/components/sections/schedule/concert-list';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionIds } from '@/config/site';
import { isConcertDatePast } from '@/lib/concerts';
import { getConcerts } from '@/lib/sanity/content';

export async function ScheduleSection() {
  const t = await getTranslations('Schedule');
  const items = await getConcerts();
  const past = items.filter((item) => isConcertDatePast(item.date));
  const upcoming = items.filter((item) => !isConcertDatePast(item.date));
  const hasConcerts = upcoming.length > 0 || past.length > 0;
  const hasBothSections = upcoming.length > 0 && past.length > 0;

  return (
    <Section id={sectionIds.schedule} variant="muted">
      <Container>
        <SectionHeading title={t('title')} />

        {upcoming.length > 0 ? (
          <div className={past.length > 0 ? 'mb-16' : undefined}>
            {hasBothSections ? (
              <h3 className="mb-8 font-serif text-xl text-balance md:text-2xl">
                {t('upcoming')}
              </h3>
            ) : null}
            <ConcertList concerts={upcoming} detailsLabel={t('details')} />
          </div>
        ) : null}

        {past.length > 0 ? (
          <div>
            {hasBothSections ? (
              <h3 className="mb-8 font-serif text-xl text-balance text-foreground/70 md:text-2xl">
                {t('past')}
              </h3>
            ) : null}
            <ConcertList concerts={past} detailsLabel={t('details')} />
          </div>
        ) : null}

        {hasConcerts ? null : (
          <div className="max-w-md">
            <p className="text-base text-pretty text-foreground/70">{t('empty')}</p>
            <a
              href={`#${sectionIds.contact}`}
              className="mt-4 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {t('emptyAction')}
            </a>
          </div>
        )}
      </Container>
    </Section>
  );
}
