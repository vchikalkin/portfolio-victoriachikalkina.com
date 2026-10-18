import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { BiographySection } from '@/components/sections/biography';
import { ContactSection } from '@/components/sections/contact';
import { HeroSection } from '@/components/sections/hero';
import { MediaSection } from '@/components/sections/media';
import { PhotosSection } from '@/components/sections/photos';
import { RepertoireSection } from '@/components/sections/repertoire';
import { ScheduleSection } from '@/components/sections/schedule';
import { routing } from '@/i18n/routing';
import { isConcertDatePast } from '@/lib/concerts';
import { getConcerts, getSiteSettings } from '@/lib/sanity/content';
import {
  buildStructuredData,
  getLocalePath,
  getOgAlternateLocales,
  getOgLocale,
} from '@/lib/seo';

interface HomePageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const settings = await getSiteSettings({ locale });
  const localePath = getLocalePath(locale);
  const siteName = settings?.name || 'Victoria Chikalkina';
  const title = settings?.metaTitle || siteName;
  const description = settings?.metaDescription || '';
  const ogTitle = settings?.ogTitle || title;
  const ogDescription = settings?.ogDescription || description;

  return {
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      alternateLocale: getOgAlternateLocales(locale),
      url: localePath,
      siteName,
      title: ogTitle,
      description: ogDescription,
    },
    twitter: {
      card: 'summary',
      title: ogTitle,
      description: ogDescription,
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const settings = await getSiteSettings({ locale });
  const concerts = await getConcerts({ locale });
  const upcomingConcerts = concerts.filter(
    (item) => !isConcertDatePast(item.date),
  );

  const structuredData = buildStructuredData({
    locale,
    name: settings?.name || 'Victoria Chikalkina',
    description: settings?.metaDescription || '',
    jobTitle: settings?.jobTitle || 'Pianist',
    upcomingConcerts,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <BiographySection />
        <ScheduleSection />
        <MediaSection />
        <PhotosSection />
        <RepertoireSection />
        <ContactSection />
      </main>
    </>
  );
}
