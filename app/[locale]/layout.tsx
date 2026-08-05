import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import type { PropsWithChildren } from 'react';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { SkipLink } from '@/components/layout/skip-link';
import { SetHtmlLang } from '@/components/set-html-lang';
import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import {
  getLanguageAlternates,
  getLocalePath,
  getOgAlternateLocales,
  getOgLocale,
} from '@/lib/seo';

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
  const localePath = getLocalePath(locale);

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: t('title'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('description'),
    keywords: t('keywords')
      .split(',')
      .map((keyword) => keyword.trim())
      .filter(Boolean),
    authors: [{ name: t('siteName'), url: localePath }],
    creator: t('siteName'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: localePath,
      languages: getLanguageAlternates(),
    },
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      alternateLocale: getOgAlternateLocales(locale),
      url: localePath,
      siteName: t('siteName'),
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
    twitter: {
      card: 'summary',
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/*
        Root layout cannot read [locale], so html[lang] starts as defaultLocale.
        This inline script corrects lang before paint for crawlers and a11y.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
        }}
      />
      <SetHtmlLang locale={locale} />
      <SkipLink />
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
