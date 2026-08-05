import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Allow full crawl of the public portfolio. No private areas to block.
 * Demo/MDX routes stay crawlable so their robots noindex meta is honored.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
