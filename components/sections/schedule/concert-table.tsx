import { useFormatter } from 'next-intl';
import { ConcertRow } from '@/components/sections/schedule/concert-row';
import type { ConcertItem } from '@/lib/types/content';
import { cn } from '@/lib/utils';

interface ConcertTableProps {
  readonly concerts: ConcertItem[];
  readonly columns: Record<string, string>;
}

export function ConcertTable({ concerts, columns }: ConcertTableProps) {
  const format = useFormatter();

  if (concerts.length === 0) {
    return null;
  }

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border text-xs text-foreground/50 uppercase">
              <th className="pr-4 pb-4 font-medium">{columns.date}</th>
              <th className="pr-4 pb-4 font-medium">{columns.city}</th>
              <th className="pr-4 pb-4 font-medium">{columns.venue}</th>
              <th className="pr-4 pb-4 font-medium">{columns.artists}</th>
              <th className="pb-4 font-medium">{columns.program}</th>
            </tr>
          </thead>
          <tbody>
            {concerts.map((concert) => (
              <ConcertRow key={concert.id} concert={concert} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-6 md:hidden">
        {concerts.map((concert) => {
          const date = new Date(concert.date);
          const displayDate = format.dateTime(date, { dateStyle: 'medium' });

          return (
            <div
              key={concert.id}
              className="rounded-lg border border-border bg-secondary/40 p-4"
            >
              <p className="font-serif text-2xl tabular-nums">{displayDate}</p>
              <p className="mt-2 text-pretty text-foreground/80">
                {concert.city} · {concert.venue}
              </p>
              {concert.artists ? (
                <p className="mt-3 text-sm leading-relaxed text-pretty text-foreground/60">
                  {concert.artists}
                </p>
              ) : null}
              {concert.program ? (
                <p
                  className={cn(
                    'text-sm leading-relaxed text-pretty text-foreground/60',
                    concert.artists ? 'mt-2' : 'mt-3',
                  )}
                >
                  {concert.program}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
