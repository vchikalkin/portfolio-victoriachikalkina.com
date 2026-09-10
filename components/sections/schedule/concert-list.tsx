'use client';

import { useFormatter } from 'next-intl';
import type { ConcertItem } from '@/lib/types/content';

interface ConcertListProps {
  readonly concerts: ConcertItem[];
  readonly detailsLabel: string;
}

interface ConcertMonthGroup {
  readonly key: string;
  readonly label: string;
  readonly concerts: ConcertItem[];
}

function formatConcertDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);

  if (!year || !month || !day) {
    return isoDate;
  }

  return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.`;
}

function groupConcertsByMonth(
  concerts: ConcertItem[],
  formatMonth: (date: Date) => string,
): ConcertMonthGroup[] {
  const groups: ConcertMonthGroup[] = [];

  for (const concert of concerts) {
    const [year, month, day] = concert.date.split('-').map(Number);

    if (!year || !month || !day) {
      continue;
    }

    const date = new Date(year, month - 1, day);
    const key = `${String(year)}-${String(month).padStart(2, '0')}`;
    const existing = groups.find((group) => group.key === key);

    if (existing) {
      existing.concerts.push(concert);
      continue;
    }

    groups.push({
      key,
      label: formatMonth(date),
      concerts: [concert],
    });
  }

  return groups;
}

export function ConcertList({ concerts, detailsLabel }: ConcertListProps) {
  const format = useFormatter();

  if (concerts.length === 0) {
    return null;
  }

  const groups = groupConcertsByMonth(concerts, (date) =>
    format.dateTime(date, { month: 'long', year: 'numeric' }),
  );

  return (
    <div className="space-y-16">
      {groups.map((group) => {
        return (
          <section key={group.key} aria-labelledby={`month-${group.key}`}>
            <h4
              id={`month-${group.key}`}
              className="mb-10 text-base font-medium text-foreground/70 lining-nums md:text-lg"
            >
              {group.label}
            </h4>
            <ul className="space-y-12">
              {group.concerts.map((concert) => {
                return (
                  <li key={concert.id}>
                    <p className="text-base text-pretty lining-nums tabular-nums md:text-lg">
                      <time dateTime={concert.date}>{formatConcertDate(concert.date)}</time>
                      <span> {concert.city}</span>
                    </p>
                    <p className="mt-2 text-base text-pretty md:text-lg">{concert.venue}</p>
                    {concert.program ? (
                      <p className="mt-2 text-sm leading-relaxed text-pretty text-foreground/70 md:text-base">
                        {concert.program}
                      </p>
                    ) : null}
                    {concert.ticketsUrl ? (
                      <a
                        href={concert.ticketsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        {detailsLabel}
                      </a>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
