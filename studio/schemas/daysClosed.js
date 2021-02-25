export default {
    name: 'daysClosed',
    title: 'Days Closed Location',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required().error('This field is required'),
      },
      {
        name: 'deliveryDays',
        title: 'Delivery Days',
        type: 'array',
        of: [{ type: 'deliveryDays' }],
      },
      {
        name: 'datesClosed',
        title: 'Dates Closed',
        type: 'array',
        of: [{ type: 'date', options: {
            dateFormat: 'YYYY-MM-DD',
            calendarTodayLabel: 'Today'
          } }],
      },
    ],
  };
  