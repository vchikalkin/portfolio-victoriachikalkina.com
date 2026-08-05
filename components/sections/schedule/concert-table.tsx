import { useFormatter } from 'next-intl';
import { ConcertRow } from '@/components/sections/schedule/concert-row';
import type { ConcertItem } from '@/lib/types/content';

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
      {/* Desktop/tablet table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[800px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border text-xs tracking-[0.15em] text-foreground/50 uppercase">
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

      {/* Mobile cards */}
      <div className="space-y-6 md:hidden">
        {concerts.map((concert) => {
          const date = new Date(concert.date);
          const displayDate = format.dateTime(date, { dateStyle: 'medium' });

          return (
            <div
              key={concert.id}
              className="rounded-lg border border-border bg-white/5 p-4 text-sm backdrop-blur-sm"
            >
              <div className="mb-0.5 font-serif text-lg">{displayDate}</div>
              <div className="mt-3">
                <div className="mb-1">
                  <span className="block text-xs text-foreground/50">{columns.city}</span>
                  <span className="font-medium">{concert.city}</span>
                </div>
                <div className="mb-1">
                  <span className="block text-xs text-foreground/50">{columns.venue}</span>
                  <span>{concert.venue}</span>
                </div>
                {concert.artists ? (
                  <div className="mb-1">
                    <span className="block text-xs text-foreground/50">{columns.artists}</span>
                    <span>{concert.artists}</span>
                  </div>
                ) : null}
                {concert.program ? (
                  <div>
                    <span className="block text-xs text-foreground/50">{columns.program}</span>
                    <span>{concert.program}</span>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
