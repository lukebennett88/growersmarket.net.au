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
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation',
      };
    },
  },
};
