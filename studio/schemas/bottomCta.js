export default {
  title: 'Bottom CTA',
  name: 'bottomCta',
  type: 'document',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      title: 'CTA Label',
      name: 'ctaLabel',
      type: 'string',
    },
    {
      title: 'CTA Slug',
      name: 'ctaSlug',
      type: 'string',
    },
    {
      title: 'Background image',
      name: 'backgroundImage',
      type: 'imageWithAltText',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Bottom CTA',
      };
    },
  },
};
