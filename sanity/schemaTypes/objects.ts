import { defineArrayMember, defineField, defineType } from 'sanity';

/** Shared: list of paragraphs/lines (used inside internationalized arrays). */
export const stringList = defineType({
  name: 'stringList',
  title: 'List',
  type: 'array',
  of: [defineArrayMember({ type: 'text' })],
});

export const biographySection = defineType({
  name: 'biographySection',
  title: 'Biography section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'internationalizedArrayStringList',
    }),
    defineField({
      name: 'listIntro',
      title: 'List intro',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'items',
      title: 'List items',
      type: 'internationalizedArrayStringList',
    }),
    defineField({
      name: 'closing',
      title: 'Closing',
      type: 'internationalizedArrayText',
    }),
  ],
});

export const repertoireComposer = defineType({
  name: 'repertoireComposer',
  title: 'Composer',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'works',
      title: 'Works',
      type: 'internationalizedArrayStringList',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name.0.value' },
  },
});
