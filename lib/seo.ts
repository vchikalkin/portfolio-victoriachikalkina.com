import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import { getHeroImage } from '@/lib/photos';
import type { ConcertItem } from '@/lib/types/content';

/** Open Graph uses underscore regional tags (for example en_US), not BCP 47 hyphens. */
const ogLocaleByLocale: Record<string, string> = {
  en: 'en_US',
  ru: 'ru_RU',
  fr: 'fr_FR',
};

export function getOgImageUrl(): string {
  const heroImage = getHeroImage() ?? '/hero/IMG_1468.jpg';

  return new URL(heroImage, siteConfig.siteUrl).toString();
}

export function getSharedOgImages() {
  const url = getOgImageUrl();

  return [
    {
      url,
      width: 1200,
      height: 630,
      alt: 'Victoria Chikalkina at the piano',
    },
  ];
}

/** Relative locale path — resolved against metadataBase for canonical/hreflang. */
export function getLocalePath(locale: string): string {
  return `/${locale}`;
}

/** Absolute locale URL for sitemap, JSON-LD, and robots. */
export function getLocaleUrl(locale: string): string {
  return `${siteConfig.siteUrl}${getLocalePath(locale)}`;
}

export function getOgLocale(locale: string): string {
  return ogLocaleByLocale[locale] ?? locale.replace('-', '_');
}

export function getOgAlternateLocales(locale: string): string[] {
  return routing.locales
    .filter((item) => item !== locale)
    .map((item) => getOgLocale(item));
}

/**
 * Builds the hreflang map for Metadata.alternates.languages.
 * Derived from routing.locales so new locales (for example fr) are included automatically.
 * The x-default entry points at the primary (default) locale for international users.
 */
export function getLanguageAlternates(): NonNullable<
  NonNullable<Metadata['alternates']>['languages']
> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = getLocalePath(locale);
  }

  languages['x-default'] = getLocalePath(routing.defaultLocale);

  return languages;
}

/** Absolute hreflang map for sitemap xhtml:link entries. */
export function getSitemapLanguageAlternates(): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = getLocaleUrl(locale);
  }

  languages['x-default'] = getLocaleUrl(routing.defaultLocale);

  return languages;
}

interface PersonStructuredDataOptions {
  locale: string;
  name: string;
  description: string;
  jobTitle: string;
}

interface StructuredDataOptions extends PersonStructuredDataOptions {
  upcomingConcerts?: ConcertItem[];
}

function buildPersonSchema({
  locale,
  name,
  description,
  jobTitle,
}: PersonStructuredDataOptions) {
  return {
    '@type': 'Person',
    '@id': `${siteConfig.siteUrl}/#person`,
    name,
    jobTitle,
    url: getLocaleUrl(locale),
    image: getOgImageUrl(),
    email: siteConfig.contactEmail,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.youtube,
    ],
    description,
    knowsAbout: [
      'Classical piano',
      'Historical fortepiano',
      'Harpsichord',
      'Chamber music',
    ],
  };
}

function buildWebsiteSchema({
  locale,
  name,
  description,
}: Pick<PersonStructuredDataOptions, 'locale' | 'name' | 'description'>) {
  return {
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}/#website`,
    url: getLocaleUrl(locale),
    name,
    description,
    inLanguage: locale,
    publisher: { '@id': `${siteConfig.siteUrl}/#person` },
  };
}

function buildMusicEventSchema(
  concert: ConcertItem,
  locale: string,
  performerName: string,
) {
  return {
    '@type': 'MusicEvent',
    name: concert.program || concert.venue,
    startDate: concert.date,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: concert.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: concert.city,
      },
    },
    performer: {
      '@type': 'Person',
      '@id': `${siteConfig.siteUrl}/#person`,
      name: performerName,
    },
    // Point at the locale homepage (schedule is an on-page section, not a route).
    url: getLocaleUrl(locale),
    inLanguage: locale,
  };
}

export function buildStructuredData({
  locale,
  name,
  description,
  jobTitle,
  upcomingConcerts = [],
}: StructuredDataOptions) {
  const graph: Record<string, unknown>[] = [
    buildPersonSchema({ locale, name, description, jobTitle }),
    buildWebsiteSchema({ locale, name, description }),
  ];

  for (const concert of upcomingConcerts) {
    graph.push(buildMusicEventSchema(concert, locale, name));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
