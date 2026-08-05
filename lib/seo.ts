import { siteConfig } from '@/config/site';
import { getHeroImage } from '@/lib/photos';

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

interface StructuredDataOptions {
  locale: string;
  name: string;
  description: string;
}

export function buildStructuredData({ locale, name, description }: StructuredDataOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: locale === 'ru' ? 'Пианист' : 'Pianist',
    url: `${siteConfig.siteUrl}/${locale}`,
    image: getOgImageUrl(),
    email: siteConfig.contactEmail,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.youtube,
    ],
    description,
  };
}
