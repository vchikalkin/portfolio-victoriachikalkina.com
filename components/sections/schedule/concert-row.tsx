import type { ConcertItem } from '@/lib/types/content';

interface ConcertRowProps {
  readonly concert: ConcertItem;
}

export function ConcertRow({ concert }: ConcertRowProps) {
  return (
    <tr className="border-b border-border/60 last:border-0">
      <td className="py-5 pr-4 align-top text-sm font-medium whitespace-nowrap md:py-6">
        {concert.date}
      </td>
      <td className="hidden py-5 pr-4 align-top text-sm text-foreground/70 md:table-cell md:py-6">
        {concert.city}
      </td>
      <td className="py-5 pr-4 align-top text-sm md:py-6">{concert.venue}</td>
      <td className="hidden py-5 align-top text-sm leading-relaxed text-foreground/70 lg:table-cell lg:py-6">
        {concert.program}
      </td>
    </tr>
  );
}
