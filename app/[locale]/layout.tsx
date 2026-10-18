import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { PropsWithChildren } from 'react';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { SkipLink } from '@/components/layout/skip-link';
import { SetHtmlLang } from '@/components/set-html-lang';
import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import { getSiteSettings } from '@/lib/sanity/content';
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

  const settings = await getSiteSettings({ locale });
  const localePath = getLocalePath(locale);
  const siteName = settings?.name || 'Victoria Chikalkina';
  const title = settings?.metaTitle || siteName;
  const description = settings?.metaDescription || '';
  const ogTitle = settings?.ogTitle || title;
  const ogDescription = settings?.ogDescription || description;
  const keywords = (settings?.metaKeywords || '')
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords,
    authors: [{ name: siteName, url: localePath }],
    creator: siteName,
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
  const settings = await getSiteSettings({ locale });
  const siteName = settings?.name || 'Victoria Chikalkina';

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
      <Header siteName={siteName} />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
