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
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation',
      };
    },
  },
};
