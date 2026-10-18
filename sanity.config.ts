import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { internationalizedArray } from 'sanity-plugin-internationalized-array';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

const languages = [
  { id: 'en', title: 'English' },
  { id: 'ru', title: 'Русский' },
  { id: 'fr', title: 'Français' },
];

export default defineConfig({
  name: 'victoria-chikalkina',
  title: 'Victoria Chikalkina',
  // Sanity Vite only inlines SANITY_STUDIO_* (not NEXT_PUBLIC_*).
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [
    structureTool({ structure }),
    internationalizedArray({
      languages,
      defaultLanguages: ['en'],
      fieldTypes: ['string', 'text', 'stringList'],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
