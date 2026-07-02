import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { BiographySection } from '@/components/sections/biography';
import { ContactSection } from '@/components/sections/contact';
import { HeroSection } from '@/components/sections/hero';
import { MediaSection } from '@/components/sections/media';
import { RepertoireSection } from '@/components/sections/repertoire';
import { ScheduleSection } from '@/components/sections/schedule';
import { routing } from '@/i18n/routing';

interface HomePageProps {
  readonly params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <HeroSection />
      <BiographySection />
      <ScheduleSection />
      <MediaSection />
      <RepertoireSection />
      <ContactSection />
    </main>
  );
}
