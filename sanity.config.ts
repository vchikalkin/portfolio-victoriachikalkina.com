import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { internationalizedArray } from 'sanity-plugin-internationalized-array';
import { dataset, projectId } from './sanity/env';
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
  projectId,
  dataset,
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
