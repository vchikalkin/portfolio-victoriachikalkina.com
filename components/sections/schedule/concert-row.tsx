import { useFormatter } from 'next-intl';
import type { ConcertItem } from '@/lib/types/content';

interface ConcertRowProps {
  readonly concert: ConcertItem;
}

export function ConcertRow({ concert }: ConcertRowProps) {
  const format = useFormatter();

  const date = new Date(concert.date);
  const displayDate = format.dateTime(date, { dateStyle: 'medium' });

  return (
    <tr className="border-border/60 border-b last:border-0">
      <td className="py-5 pr-4 align-top text-sm font-medium whitespace-nowrap md:py-6">
        {displayDate}
      </td>
      <td className="text-foreground/70 hidden py-5 pr-4 align-top text-sm md:table-cell md:py-6">
        {concert.city}
      </td>
      <td className="py-5 pr-4 align-top text-sm md:py-6">{concert.venue}</td>
      <td className="text-foreground/70 hidden py-5 pr-4 align-top text-sm leading-relaxed lg:table-cell lg:py-6">
        {concert.artists ?? '—'}
      </td>
      <td className="text-foreground/70 hidden py-5 align-top text-sm leading-relaxed lg:table-cell lg:py-6">
        {concert.program}
      </td>
    </tr>
  );
}
