import { groq } from 'next-sanity';
import { localized } from './locale';

/** Published docs only (excludes drafts.* even if a token is added later). */
const published = `!(_id in path("drafts.**"))`;

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings" && _id == "siteSettings" && ${published}][0]{
  ${localized('name')},
  ${localized('jobTitle')},
  contactEmail,
  instagram,
  facebook,
  youtube,
  heroImage,
  ${localized('heroImageAlt')},
  ${localized('metaTitle')},
  ${localized('metaDescription')},
  ${localized('metaKeywords')},
  ${localized('ogTitle')},
  ${localized('ogDescription')},
  ${localized('contactTitle')},
  ${localized('contactSubtitle')},
  ${localized('contactDescription')},
  _updatedAt
}`;

export const BIOGRAPHY_QUERY = groq`*[_type == "biography" && _id == "biography" && ${published}][0]{
  ${localized('intro')},
  sections[]{
    ${localized('title')},
    ${localized('paragraphs')},
    ${localized('listIntro')},
    ${localized('items')},
    ${localized('closing')}
  }
}`;

export const CONCERTS_QUERY = groq`*[_type == "concert" && ${published}] | order(date asc){
  "id": _id,
  date,
  ${localized('city')},
  ${localized('venue')},
  ${localized('program')},
  ${localized('artists')},
  ticketsUrl
}`;

export const REPERTOIRE_QUERY = groq`*[_type == "repertoireEra" && ${published}] | order(sortOrder asc){
  "id": _id,
  ${localized('title')},
  composers[]{
    "id": _key,
    ${localized('name')},
    ${localized('works')}
  }
}`;

export const MEDIA_QUERY = groq`*[_type == "mediaItem" && ${published}] | order(sortOrder asc){
  "id": _id,
  ${localized('title')},
  youtubeUrl
}`;

export const GALLERY_QUERY = groq`*[_type == "galleryImage" && ${published}] | order(sortOrder asc){
  "id": _id,
  image,
  ${localized('alt')}
}`;
