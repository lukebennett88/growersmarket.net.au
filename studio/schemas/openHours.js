export default {
  title: 'Hours',
  name: 'openHours',
  type: 'object',
  fields: [
    {
      title: 'Days',
      name: 'days',
      type: 'string',
    },
    {
      title: 'Hours',
      name: 'hours',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'days',
      subtitle: 'hours',
    },
  },
};
