export default {
  title: 'Address',
  name: 'address',
  type: 'object',
  fields: [
    {
      title: 'Street Address',
      name: 'streetAddress',
      type: 'string',
    },
    {
      title: 'Suburb',
      name: 'suburb',
      type: 'string',
    },
    {
      title: 'Google Maps',
      name: 'googleMaps',
      type: 'googleMaps',
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
