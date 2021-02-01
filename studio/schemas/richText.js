export default {
  title: 'Rich Text',
  name: 'richText',
  type: 'object',
  fields: [
    {
      title: 'Block Content',
      type: 'blockContent',
      name: 'blockContent',
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
