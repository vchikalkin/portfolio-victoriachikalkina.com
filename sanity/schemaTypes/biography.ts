import { defineField, defineType } from 'sanity';

export const biography = defineType({
  name: 'biography',
  title: 'Biography',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro paragraphs',
      type: 'internationalizedArrayStringList',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'biographySection' }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Biography' }),
  },
});
