export default {
  title: 'Image',
  name: 'imageWithAltText',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      title: 'Alt text',
      name: 'altText',
      type: 'string',
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
