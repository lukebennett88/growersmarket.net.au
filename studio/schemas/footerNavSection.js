export default {
  title: 'Footer navigation',
  name: 'footerNavSection',
  type: 'object',
  fieldsets: [
    {
      name: 'menuItem',
      description: 'Only the first value of these will be used',
    },
  ],
  fields: [
    {
      title: 'Subheading',
      name: 'subHeading',
      type: 'string',
    },
    {
      name: 'links',
      type: 'array',
      of: [{ type: 'navItem' }],
    },
  ],
};
