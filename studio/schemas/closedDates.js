export default {
  title: 'Closed Dates',
  name: 'closedDates',
  type: 'object',
  fields: [
    {
      title: 'Dates',
      name: 'dates',
      type: 'array',
      of: [
        {
          title: 'Closed on:',
          type: 'date',
          options: {
            dateFormat: 'Do MMMM YYYY',
            calendarTodayLabel: 'Today',
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'dates',
    },
  },
};
