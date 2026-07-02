export const siteConfig = {
  name: 'Victoria Chikalkina',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    telegram: 'https://t.me',
  },
  contactEmail: 'booking@victoriachikalkina.com',
} as const;

export const sectionIds = {
  hero: 'hero',
  biography: 'biography',
  schedule: 'schedule',
  media: 'media',
  photos: 'photos',
  repertoire: 'repertoire',
  contact: 'contact',
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

export interface NavigationItem {
  id: SectionId;
  labelKey: string;
}

export const navigationItems: NavigationItem[] = [
  { id: sectionIds.hero, labelKey: 'home' },
  { id: sectionIds.biography, labelKey: 'biography' },
  { id: sectionIds.schedule, labelKey: 'schedule' },
  { id: sectionIds.media, labelKey: 'media' },
  { id: sectionIds.photos, labelKey: 'photos' },
  { id: sectionIds.repertoire, labelKey: 'repertoire' },
  { id: sectionIds.contact, labelKey: 'contact' },
];
