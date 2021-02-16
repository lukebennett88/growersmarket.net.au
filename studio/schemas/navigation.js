export default {
  title: 'Navigation',
  name: 'navigation',
  type: 'document',
  fields: [
    {
      name: 'navItems',
      type: 'array',
      of: [{ type: 'navItem' }],
    },
    {
      name: 'footerNavItems',
      type: 'array',
      of: [{ type: 'footerNavSection' }],
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
