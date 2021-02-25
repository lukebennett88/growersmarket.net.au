export default {
    title: 'Dates Closed',
    name: 'datesClosed',
    type: 'object',
    fields: [
      {
        title: 'Dates',
        name: 'dates',
        type: 'array',
        of: [{ type: 'string' }],
      },
    ],
    preview: {
      select: {
        title: 'dates',
      },
    },
  };
  