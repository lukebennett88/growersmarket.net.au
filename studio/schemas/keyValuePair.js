export default {
  title: 'Key Value Pair',
  name: 'keyValuePair',
  type: 'object',
  fields: [
    {
      title: 'Key',
      name: 'key',
      type: 'string',
    },
    {
      title: 'Value',
      name: 'value',
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
