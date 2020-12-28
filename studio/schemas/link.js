export default {
  type: 'object',
  name: 'link',
  title: 'URL',
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'url',
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
