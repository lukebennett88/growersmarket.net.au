export default {
  title: 'Route',
  name: 'route',
  type: 'object',
  fields: [
    {
      title: 'slug',
      name: 'Slug',
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
