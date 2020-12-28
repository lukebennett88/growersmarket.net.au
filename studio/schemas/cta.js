export default {
  title: 'Call to action',
  name: 'cta',
  type: 'object',
  fieldsets: [
    {
      title: 'Menu item',
      name: 'menuItem',
      description: 'Only the first value of these will be used',
    },
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Sub Menu',
      name: 'subMenu',
      fieldset: 'menuItem',
      description: 'Menu heading with menus inside',
      type: 'array',
      of: [{type: "cta"}],
    },
    {
      title: 'Route',
      name: 'route',
      fieldset: 'menuItem',
      description: 'Example: /blog',
      type: 'string',
    },
    {
      title: 'External link',
      name: 'link',
      type: 'string',
      description: 'Example: https://www.facebook.com',
      fieldset: 'menuItem',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subMenu: 'subMenu',
      route: 'route',
      link: 'link',
    },
    prepare({ title, subMenu, route, link }) {
      let subtitle = 'Not set';
      if (subMenu) {
        subtitle = `Submenu`;
      }
      if (route) {
        subtitle = `Route: ${route}`;
      }
      if (link) {
        subtitle = `External: ${link}`;
      }
      return {
        title,
        subtitle,
      };
    },
  },
};
