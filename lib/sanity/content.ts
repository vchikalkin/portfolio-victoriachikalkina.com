import { getLocale } from 'next-intl/server';
import type { SanityImageSource } from '@sanity/image-url';
import type { BiographyContent } from '@/lib/types/biography';
import type {
  ConcertItem,
  MediaItem,
  RepertoireEra,
} from '@/lib/types/content';
import { sanityFetch } from './fetch';
import {
  BIOGRAPHY_QUERY,
  CONCERTS_QUERY,
  GALLERY_QUERY,
  MEDIA_QUERY,
  REPERTOIRE_QUERY,
  SITE_SETTINGS_QUERY,
} from './queries';
import { toYoutubeEmbedUrl } from './youtube';

interface LocaleOptions {
  locale?: string;
}

export interface SiteSettingsContent {
  name?: string;
  jobTitle?: string;
  contactEmail?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  heroImage?: SanityImageSource;
  heroImageAlt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  contactTitle?: string;
  contactSubtitle?: string;
  contactDescription?: string;
  _updatedAt?: string;
}

export interface GalleryPhotoContent {
  id: string;
  image: SanityImageSource;
  alt?: string;
}

interface BiographySectionRaw {
  title?: string;
  paragraphs?: string[];
  listIntro?: string;
  items?: string[];
  closing?: string;
}

interface RepertoireComposerRaw {
  id?: string;
  name: string;
  works?: string[];
}

interface RepertoireEraRaw {
  id: string;
  title: string;
  composers?: RepertoireComposerRaw[];
}

async function resolveLocale({ locale }: LocaleOptions = {}) {
  return { locale: locale ?? (await getLocale()) };
}

export async function getSiteSettings({
  locale,
}: LocaleOptions = {}): Promise<SiteSettingsContent | null> {
  return sanityFetch<SiteSettingsContent>({
    query: SITE_SETTINGS_QUERY,
    params: await resolveLocale({ locale }),
    tags: ['sanity', 'siteSettings'],
  });
}

export async function getBiography({
  locale,
}: LocaleOptions = {}): Promise<BiographyContent | null> {
  const data = await sanityFetch<{
    intro?: string[];
    sections?: BiographySectionRaw[];
  }>({
    query: BIOGRAPHY_QUERY,
    params: await resolveLocale({ locale }),
    tags: ['sanity', 'biography'],
  });

  if (!data?.intro) {
    return null;
  }

  return {
    intro: data.intro,
    sections: (data.sections ?? []).map((section) => {
      return {
        title: section.title ?? '',
        paragraphs: section.paragraphs ?? [],
        listIntro: section.listIntro,
        items: section.items,
        closing: section.closing,
      };
    }),
  };
}

export async function getConcerts({
  locale,
}: LocaleOptions = {}): Promise<ConcertItem[]> {
  const data = await sanityFetch<ConcertItem[]>({
    query: CONCERTS_QUERY,
    params: await resolveLocale({ locale }),
    tags: ['sanity', 'concerts'],
  });

  return (data ?? []).filter((item) => Boolean(item.date && item.city));
}

export async function getRepertoire({
  locale,
}: LocaleOptions = {}): Promise<RepertoireEra[]> {
  const data = await sanityFetch<RepertoireEraRaw[]>({
    query: REPERTOIRE_QUERY,
    params: await resolveLocale({ locale }),
    tags: ['sanity', 'repertoire'],
  });

  return (data ?? []).map((era) => {
    return {
      id: era.id,
      title: era.title,
      composers: (era.composers ?? [])
        .filter((composer) => Boolean(composer.name))
        .map((composer, index) => {
          return {
            id: composer.id || `${era.id}-${String(index)}`,
            name: composer.name,
            works: composer.works ?? [],
          };
        }),
    };
  });
}

export async function getMediaItems({
  locale,
}: LocaleOptions = {}): Promise<MediaItem[]> {
  const data = await sanityFetch<
    { id: string; title?: string; youtubeUrl?: string }[]
  >({
    query: MEDIA_QUERY,
    params: await resolveLocale({ locale }),
    tags: ['sanity', 'media'],
  });

  return (data ?? [])
    .map((item) => {
      const embedUrl = item.youtubeUrl
        ? toYoutubeEmbedUrl(item.youtubeUrl)
        : undefined;

      return {
        id: item.id,
        title: item.title ?? '',
        type: 'video' as const,
        platform: 'youtube' as const,
        embedUrl,
      };
    })
    .filter((item) => Boolean(item.title));
}

export async function getGalleryPhotos({
  locale,
}: LocaleOptions = {}): Promise<GalleryPhotoContent[]> {
  const data = await sanityFetch<GalleryPhotoContent[]>({
    query: GALLERY_QUERY,
    params: await resolveLocale({ locale }),
    tags: ['sanity', 'gallery'],
  });

  return (data ?? []).filter((photo) => Boolean(photo.image));
}
