import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.map((locale) => {
    return {
      url: `${siteConfig.siteUrl}/${locale}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: locale === routing.defaultLocale ? 1 : 0.9,
    };
  });
}
