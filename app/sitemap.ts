import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getLocaleUrl } from '@/lib/seo';

/**
 * Indexable pages only: one URL per locale (the single-page portfolio).
 * Hash sections (#biography, #schedule, …) are intentionally omitted —
 * fragments are not separate documents and must not appear in sitemaps.
 *
 * MDX demo routes (/[locale]/mdx) are excluded and noindexed separately.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.map((locale) => {
    return {
      url: getLocaleUrl(locale),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 1,
    };
  });
}
