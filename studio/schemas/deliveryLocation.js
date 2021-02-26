export default {
  name: 'deliveryLocation',
  title: 'Delivery Location',
  type: 'object',
  fields: [
    {
      title: 'Location',
      name: 'location',
      type: 'string',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: ['Port Macquarie', 'Wauchope', 'Laurieton', 'Kempsey'],
      },
      validation: (Rule) => Rule.required().error('Please select a day'),
    },
    {
      title: 'Delivery Days',
      name: 'deliveryDays',
      type: 'array',
      of: [{ type: 'deliveryDays' }],
    },
  ],
  preview: {
    select: {
      title: 'location',
    },
  },
};
