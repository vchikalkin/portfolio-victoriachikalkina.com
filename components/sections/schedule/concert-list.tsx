'use client';

import { useFormatter } from 'next-intl';
import type { ConcertItem } from '@/lib/types/content';

interface ConcertListProps {
  readonly concerts: ConcertItem[];
  readonly ticketsLabel: string;
}

interface ConcertMonthGroup {
  readonly key: string;
  readonly label: string;
  readonly concerts: ConcertItem[];
}

function groupConcertsByMonth(
  concerts: ConcertItem[],
  formatMonth: (date: Date) => string,
): ConcertMonthGroup[] {
  const groups: ConcertMonthGroup[] = [];

  for (const concert of concerts) {
    const date = new Date(concert.date);
    const key = `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}`;
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

export function ConcertList({ concerts, ticketsLabel }: ConcertListProps) {
  const format = useFormatter();

  if (concerts.length === 0) {
    return null;
  }

  const groups = groupConcertsByMonth(concerts, (date) =>
    format.dateTime(date, { month: 'long', year: 'numeric' }),
  );

  return (
    <div className="space-y-14">
      {groups.map((group) => {
        return (
          <section key={group.key} aria-labelledby={`month-${group.key}`}>
            <h4
              id={`month-${group.key}`}
              className="mb-8 text-base font-medium text-foreground/70 lining-nums md:text-lg"
            >
              {group.label}
            </h4>
            <ul className="space-y-10">
              {group.concerts.map((concert) => {
                const date = new Date(concert.date);
                const dayMonth = format.dateTime(date, {
                  day: 'numeric',
                  month: 'short',
                });

                return (
                  <li key={concert.id}>
                    <p className="font-sans text-base font-medium text-pretty lining-nums tabular-nums md:text-lg">
                      <time dateTime={concert.date}>{dayMonth}</time>
                      <span className="font-normal text-foreground/40"> · </span>
                      <span className="font-normal">{concert.city}</span>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-pretty text-foreground/70 md:text-base">
                      {concert.venue}
                    </p>
                    {concert.artists ? (
                      <p className="mt-2 text-sm leading-relaxed text-pretty text-foreground/55">
                        {concert.artists}
                      </p>
                    ) : null}
                    {concert.program ? (
                      <p className="mt-1 text-sm leading-relaxed text-pretty text-foreground/55">
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
                        {ticketsLabel}
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
