export default {
  title: 'Nav item',
  name: 'navItem',
  type: 'object',
  fieldsets: [
    {
      name: 'menuItem',
      description: 'Only the first value of these will be used',
    },
  ],
  fields: [
    {
      name: 'sanityPage',
      type: 'sanityPage',
    },
    {
      name: 'externalPage',
      type: 'externalPage',
    },
  ],
};
