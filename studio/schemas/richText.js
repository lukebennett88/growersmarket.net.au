export default {
  title: 'Rich Text',
  name: 'richText',
  type: 'object',
  fields: [
    {
      title: 'Block Content',
      type: 'blockContent',
      name: 'blockContent',
      display: 'blockContent',
    },
  ],
  preview: {
    select: {
      title: 'blockContent[0].children[0].text',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
};
