import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { MdxPageContent } from '@/lib/mdx-content';

interface MdxPageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: MdxPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return { robots: { index: false, follow: false } };
  }

  const t = await getTranslations({ locale, namespace: 'MdxPage' });

  return {
    title: t('title'),
    alternates: {
      canonical: `/${locale}/mdx`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function MdxPage({ params }: MdxPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <MdxPageContent locale={locale} />;
}
