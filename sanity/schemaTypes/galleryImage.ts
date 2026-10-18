import { defineField, defineType } from 'sanity';

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'internationalizedArrayString',
    }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      media: 'image',
      alt: 'alt.0.value',
      order: 'sortOrder',
    },
    prepare: ({ media, alt, order }) => {
      return {
        title: alt ?? 'Photo',
        subtitle: typeof order === 'number' ? `Order: ${String(order)}` : undefined,
        media,
      };
    },
  },
});
