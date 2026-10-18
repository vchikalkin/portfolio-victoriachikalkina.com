import { defineArrayMember, defineField, defineType } from 'sanity';

export const repertoireEra = defineType({
  name: 'repertoireEra',
  title: 'Repertoire era',
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
      title: 'Era title',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'composers',
      title: 'Composers',
      type: 'array',
      of: [defineArrayMember({ type: 'repertoireComposer' })],
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
    select: { title: 'title.0.value', order: 'sortOrder' },
    prepare: ({ title, order }) => {
      return {
        title: title ?? 'Era',
        subtitle: typeof order === 'number' ? `Order: ${String(order)}` : undefined,
      };
    },
  },
});
