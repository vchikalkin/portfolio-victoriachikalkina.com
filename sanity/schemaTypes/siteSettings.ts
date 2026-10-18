import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Artist name',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'jobTitle',
      title: 'Role',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero image alt',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO title',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO description',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'metaKeywords',
      title: 'SEO keywords',
      type: 'internationalizedArrayString',
      description: 'Comma-separated',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph title',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph description',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'contactTitle',
      title: 'Contact section title',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'contactSubtitle',
      title: 'Contact subtitle',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'contactDescription',
      title: 'Contact description',
      type: 'internationalizedArrayText',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site settings' }),
  },
});
