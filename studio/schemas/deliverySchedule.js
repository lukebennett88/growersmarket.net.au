export default {
  title: 'Delivery Schedule',
  name: 'deliverySchedule',
  type: 'object',
  fields: [
    {
      title: 'Delivery Locations',
      name: 'deliveryLocations',
      type: 'array',
      of: [{ type: 'deliveryLocation' }],
    },
    {
      title: 'Closed Dates',
      name: 'datesClosed',
      type: 'closedDates',
    },
  ],
};
