export default {
  title: 'Delivery Days',
  name: 'deliveryDays',
  type: 'object',
  fields: [
    {
      title: 'Day',
      name: 'day',
      type: 'string',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      },
      validation: (Rule) => Rule.required().error('Please select a day'),
    },
  ],
  preview: {
    select: {
      title: 'day',
    },
  },
};
