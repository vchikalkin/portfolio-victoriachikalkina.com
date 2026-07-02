import { Calendar } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SiteImage } from '@/components/ui/site-image';
import { sectionIds, siteConfig } from '@/config/site';
import { getHeroImage } from '@/lib/photos';
import type { ConcertItem } from '@/lib/types/content';
import { cn } from '@/lib/utils';

export async function HeroSection() {
  const t = await getTranslations('Hero');
  const tSchedule = await getTranslations('Schedule');
  const concerts = tSchedule.raw('items') as ConcertItem[];
  const nextConcert = concerts.find((item) => !item.isPast);
  const heroImage = getHeroImage();

  return (
    <section
      id={sectionIds.hero}
      className="relative flex min-h-svh items-end overflow-hidden bg-zinc-950 text-white"
    >
      {heroImage ? (
        <SiteImage
          fill
          priority
          src={heroImage}
          alt={t('imageAlt')}
          className="object-cover object-left md:object-center"
          sizes="100vw"
        />
      ) : null}

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/70 to-zinc-900/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_50%)]"
      />

      <Container className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm tracking-[0.25em] text-white/60 uppercase">
              {t('role')}
            </p>
            <h1 className="font-serif text-5xl leading-none tracking-tight md:text-7xl lg:text-8xl">
              {siteConfig.name}
            </h1>
          </div>

          {nextConcert ? (
            <aside className="max-w-md border border-white/15 bg-white/5 p-6 backdrop-blur-sm md:p-8">
              <div className="mb-4 flex items-center gap-2 text-sm tracking-[0.15em] text-white/60 uppercase">
                <Calendar className="size-4" />
                {t('nextConcertLabel')}
              </div>
              <p className="font-serif text-2xl">{nextConcert.date}</p>
              <p className="mt-2 text-white/80">
                {nextConcert.city} · {nextConcert.venue}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {nextConcert.program}
              </p>
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
          ) : null}
        </div>
      </Container>
    </section>
  );
}
