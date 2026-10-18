import { defineField, defineType } from 'sanity';

export const concert = defineType({
  name: 'concert',
  title: 'Concert',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'program',
      title: 'Program',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'artists',
      title: 'Artists',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'ticketsUrl',
      title: 'Tickets / more info URL',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Date, newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      date: 'date',
      city: 'city.0.value',
      venue: 'venue.0.value',
    },
    prepare: ({ date, city, venue }) => {
      return {
        title: [date, city].filter(Boolean).join(' · '),
        subtitle: venue,
      };
    },
  },
});
