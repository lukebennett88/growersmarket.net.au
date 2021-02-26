export default {
  title: 'Main navigation',
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
  preview: {
    select: {
      sanityPageTitle: 'sanityPage.label',
      externalPageTitle: 'externalPage.label',
    },
    prepare(selection) {
      const { sanityPageTitle, externalPageTitle } = selection;
      return {
        title: sanityPageTitle || externalPageTitle,
      };
    },
  },
};
