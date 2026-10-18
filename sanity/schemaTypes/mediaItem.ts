import { defineField, defineType } from 'sanity';

export const mediaItem = defineType({
  name: 'mediaItem',
  title: 'Media',
  type: 'document',
  fields: [
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title.0.value', url: 'youtubeUrl' },
    prepare: ({ title, url }) => {
      return {
        title: title ?? 'Video',
        subtitle: url,
      };
    },
  },
});
