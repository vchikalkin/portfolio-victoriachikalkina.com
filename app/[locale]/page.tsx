import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BiographySection } from '@/components/sections/biography';
import { ContactSection } from '@/components/sections/contact';
import { HeroSection } from '@/components/sections/hero';
import { MediaSection } from '@/components/sections/media';
import { PhotosSection } from '@/components/sections/photos';
import { RepertoireSection } from '@/components/sections/repertoire';
import { ScheduleSection } from '@/components/sections/schedule';
import { routing } from '@/i18n/routing';
import { buildStructuredData, getSharedOgImages } from '@/lib/seo';

interface HomePageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'MetaHome' });
  const ogImages = getSharedOgImages();

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      locale,
      url: `/${locale}`,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ogImages.map((image) => image.url),
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const tMeta = await getTranslations({ locale, namespace: 'Meta' });
  const tSite = await getTranslations({ locale, namespace: 'Site' });
  const structuredData = buildStructuredData({
    locale,
    name: tSite('name'),
    description: tMeta('description'),
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
