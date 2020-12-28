export default {
  title: 'Google Maps',
  name: 'googleMaps',
  type: 'object',
  fields: [
    {
      title: 'Link to Google Maps listing',
      name: 'link',
      type: 'string',
    },
    {
      title: 'Embed map code',
      name: 'embed',
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
