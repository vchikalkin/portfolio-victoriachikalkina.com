import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import type { PropsWithChildren } from 'react';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { SetHtmlLang } from '@/components/set-html-lang';
import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';

interface LocaleLayoutProps extends PropsWithChildren {
  readonly params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface MetadataPageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: MetadataPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Meta' });
  const localePath = `/${locale}`;

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords')
      .split(',')
      .map((keyword) => keyword.trim())
      .filter(Boolean),
    alternates: {
      canonical: localePath,
      languages: {
        ru: '/ru',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: localePath,
      siteName: t('siteName'),
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SetHtmlLang locale={locale} />
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
