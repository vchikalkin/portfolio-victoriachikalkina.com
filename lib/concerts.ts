import type { ConcertItem } from '@/lib/types/content';

function startOfLocalDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function parseConcertDate(isoDate: string): Date | null {
  const [year, month, day] = isoDate.split('-').map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

export function isConcertDatePast(isoDate: string): boolean {
  const concertDate = parseConcertDate(isoDate);

  if (!concertDate) {
    return true;
  }

  return concertDate.getTime() < startOfLocalDay(new Date());
}

export function findNextConcert(concerts: readonly ConcertItem[]): ConcertItem | undefined {
  return concerts.find((concert) => !isConcertDatePast(concert.date));
}
