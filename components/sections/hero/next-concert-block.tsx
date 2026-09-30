'use client';

import { Calendar } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { buttonVariants } from '@/components/ui/button';
import { sectionIds } from '@/config/site';
import { findNextConcert, parseConcertDate } from '@/lib/concerts';
import type { ConcertItem } from '@/lib/types/content';
import { useIsClientMounted } from '@/lib/use-client-mounted';
import { cn } from '@/lib/utils';

interface NextConcertBlockProps {
  readonly concerts: readonly ConcertItem[];
  readonly initialConcert: ConcertItem | null;
}

export function NextConcertBlock({ concerts, initialConcert }: NextConcertBlockProps) {
  const t = useTranslations('Hero');
  const format = useFormatter();
  const isMounted = useIsClientMounted();
  const nextConcert = isMounted ? (findNextConcert(concerts) ?? null) : initialConcert;
  const date = nextConcert ? parseConcertDate(nextConcert.date) : null;

  if (!nextConcert || !date) {
    return null;
  }

  const displayDate = format.dateTime(date, { dateStyle: 'medium' });

  return (
    <aside className="max-w-md border border-white/15 bg-white/10 p-6 md:p-8">
      <div className="mb-4 flex items-center gap-2 text-sm text-white/60">
        <Calendar className="size-4" aria-hidden="true" />
        {t('nextConcertLabel')}
      </div>
      <p className="font-sans text-2xl lining-nums tabular-nums">{displayDate}</p>
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
