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
      sanityPageLabel: 'sanityPage.label',
      sanityPageTitle: 'sanityPage.referencePage.title',
      externalPageLabel: 'externalPage.label',
    },
    prepare(selection) {
      const { sanityPageLabel, externalPageLabel, sanityPageTitle } = selection;
      return {
        title: sanityPageLabel || externalPageLabel || sanityPageTitle,
      };
    },
  },
};
