import { ConcertRow } from '@/components/sections/schedule/concert-row';
import type { ConcertItem } from '@/lib/types/content';

interface ConcertTableProps {
  readonly concerts: ConcertItem[];
  readonly columns: Record<string, string>;
}

export function ConcertTable({ concerts, columns }: ConcertTableProps) {
  if (concerts.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border text-xs tracking-[0.15em] text-foreground/50 uppercase">
            <th className="pr-4 pb-4 font-medium">{columns.date}</th>
            <th className="hidden pr-4 pb-4 font-medium md:table-cell">{columns.city}</th>
            <th className="pr-4 pb-4 font-medium">{columns.venue}</th>
            <th className="hidden pb-4 font-medium lg:table-cell">{columns.program}</th>
          </tr>
        </thead>
        <tbody>
          {concerts.map((concert) => (
            <ConcertRow key={concert.id} concert={concert} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
