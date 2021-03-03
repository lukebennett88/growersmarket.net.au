export default {
  title: 'Slide',
  name: 'slide',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
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
    {
      title: 'Hide slide',
      description:
        "Check this if you don't want this slide to appear on the website",
      name: 'isHidden',
      type: 'boolean',
    },
  ],
};
