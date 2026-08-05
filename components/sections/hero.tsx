import { getTranslations } from 'next-intl/server';
import { NextConcertBlock } from '@/components/sections/hero/next-concert-block';
import { Container } from '@/components/ui/container';
import { SiteImage } from '@/components/ui/site-image';
import { sectionIds } from '@/config/site';
import { getHeroImage } from '@/lib/photos';
import type { ConcertItem } from '@/lib/types/content';

export async function HeroSection() {
  const t = await getTranslations('Hero');
  const tSite = await getTranslations('Site');
  const tSchedule = await getTranslations('Schedule');
  const concerts = tSchedule.raw('items') as ConcertItem[];
  const nextConcert = concerts.find((item) => new Date(item.date) >= new Date());
  const heroImage = getHeroImage();

  return (
    <section
      id={sectionIds.hero}
      className="relative flex min-h-dvh items-end overflow-hidden bg-zinc-950 text-white"
    >
      {heroImage ? (
        <SiteImage
          fill
          preload
          src={heroImage}
          alt={t('imageAlt')}
          className="object-cover object-left md:object-center"
          sizes="100vw"
        />
      ) : null}

      <div aria-hidden className="absolute inset-0 bg-zinc-950/70" />

      <Container className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm text-white/60 uppercase">{t('role')}</p>
            <h1 className="font-serif text-5xl leading-none text-balance md:text-7xl lg:text-8xl">
              {tSite('name')}
            </h1>
          </div>

          {nextConcert ? <NextConcertBlock nextConcert={nextConcert} t={t} /> : null}
        </div>
      </Container>
    </section>
  );
}
