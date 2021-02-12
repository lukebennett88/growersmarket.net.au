export default {
  title: 'Navigation',
  name: 'siteNavigation',
  type: 'document',
  fields: [
    {
      name: 'items',
      type: 'array',
      of: [{ type: 'cta' }],
    },
    {
      name: 'navItem',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation',
      };
    },
  },
};
