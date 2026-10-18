import type { SchemaTypeDefinition } from 'sanity';
import { biography } from './biography';
import { concert } from './concert';
import { galleryImage } from './galleryImage';
import { mediaItem } from './mediaItem';
import {
  biographySection,
  repertoireComposer,
  stringList,
} from './objects';
import { repertoireEra } from './repertoireEra';
import { siteSettings } from './siteSettings';

export const schemaTypes: SchemaTypeDefinition[] = [
  stringList,
  biographySection,
  repertoireComposer,
  siteSettings,
  biography,
  concert,
  repertoireEra,
  mediaItem,
  galleryImage,
];
