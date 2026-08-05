import { Calendar } from 'lucide-react';
import { useFormatter } from 'next-intl';
import { buttonVariants } from '@/components/ui/button';
import { sectionIds } from '@/config/site';
import type { ConcertItem } from '@/lib/types/content';
import { cn } from '@/lib/utils';

interface NextConcertBlockProps {
  readonly nextConcert: ConcertItem;
  readonly t: (key: string) => string;
}

export function NextConcertBlock({ nextConcert, t }: NextConcertBlockProps) {
  const date = new Date(nextConcert.date);
  const format = useFormatter();
  const displayDate = format.dateTime(date, { dateStyle: 'medium' });

  return (
    <aside className="max-w-md border border-white/15 bg-white/10 p-6 md:p-8">
      <div className="mb-4 flex items-center gap-2 text-sm text-white/60 uppercase">
        <Calendar className="size-4" />
        {t('nextConcertLabel')}
      </div>
      <p className="font-serif text-2xl tabular-nums">{displayDate}</p>
      <p className="mt-2 text-pretty text-white/80">
        {nextConcert.city} · {nextConcert.venue}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-pretty text-white/60">{nextConcert.program}</p>
      <div className="mt-6">
        <a
          href={`#${sectionIds.schedule}`}
          className={cn(
            buttonVariants({ variant: 'secondary' }),
            'rounded-none bg-white text-zinc-950 hover:bg-white/90',
          )}
        >
          {t('ctaSchedule')}
        </a>
      </div>
    </aside>
  );
}
