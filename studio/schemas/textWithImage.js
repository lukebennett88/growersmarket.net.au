export default {
  title: 'Text with image',
  name: 'textWithImage',
  type: 'object',
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'array',
      of: [{ type: 'cta' }],
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'imageWithAltText' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
};
