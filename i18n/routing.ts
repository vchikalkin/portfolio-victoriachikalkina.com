import { defineRouting } from 'next-intl/routing';

/**
 * Locale configuration for next-intl.
 *
 * English is the primary/default locale (international audience, x-default).
 * Russian is secondary. Add `'fr'` here (and messages/fr.json) when French ships —
 * sitemap, hreflang, and OG alternates derive from `locales` automatically.
 */
export const routing = defineRouting({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  // ponytail: as-needed so `/` is English (no redirect). Static export has no
  // middleware — root page below re-exports the en locale shell.
  localePrefix: 'as-needed',
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
