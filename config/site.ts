export const siteConfig = {
  siteUrl: 'https://victoriachikalkina.com',
  social: {
    instagram: 'https://www.instagram.com/victoriachikalkina.piano',
    facebook: 'https://www.facebook.com/share/1BLRZTJnSa/?mibextid=wwXIfr',
    youtube: 'https://www.youtube.com/@edurmajor',
    // telegram: 'https://t.me',
  },
  contactEmail: 'victoriachikalkina@gmail.com',
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
