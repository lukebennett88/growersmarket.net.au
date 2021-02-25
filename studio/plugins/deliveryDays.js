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
          layout: 'dropdown',
          direction: 'Horizontal',
          list: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
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
  