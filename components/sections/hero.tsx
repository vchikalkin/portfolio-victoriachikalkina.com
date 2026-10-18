import { NextConcertBlock } from '@/components/sections/hero/next-concert-block';
import { Container } from '@/components/ui/container';
import { SiteImage } from '@/components/ui/site-image';
import { sectionIds } from '@/config/site';
import { findNextConcert } from '@/lib/concerts';
import { getConcerts, getSiteSettings } from '@/lib/sanity/content';
import { urlForImage } from '@/lib/sanity/image';

export async function HeroSection() {
  const settings = await getSiteSettings();
  const concerts = await getConcerts();
  const nextConcert = findNextConcert(concerts) ?? null;

  const heroSrc = settings?.heroImage
    ? urlForImage(settings.heroImage).width(2400).height(1600).fit('crop').url()
    : undefined;
  const heroAlt = settings?.heroImageAlt || settings?.name || '';
  const role = settings?.jobTitle || '';
  const name = settings?.name || '';

  return (
    <section
      id={sectionIds.hero}
      className="relative flex min-h-dvh items-end overflow-hidden bg-zinc-950 text-white"
    >
      {heroSrc ? (
        <SiteImage
          fill
          preload
          src={heroSrc}
          alt={heroAlt}
          className="object-cover object-left md:object-center"
          sizes="100vw"
        />
      ) : null}

      <div aria-hidden className="absolute inset-0 bg-zinc-950/70" />

      <Container className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            {role ? (
              <p className="mb-4 text-sm text-white/60">{role}</p>
            ) : null}
            <h1 className="font-serif text-5xl leading-none text-balance md:text-7xl lg:text-8xl">
              {name}
            </h1>
          </div>

          <NextConcertBlock concerts={concerts} initialConcert={nextConcert} />
        </div>
      </Container>
    </section>
  );
}
