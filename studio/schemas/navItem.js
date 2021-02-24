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
    // {
    //   title: 'Title',
    //   name: 'title',
    //   type: 'string',
    //   description: 'This the label for the nav item to be shown in Sanity',
    // },
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
      title1: 'sanityPage.label',
      title2: 'externalPage.label',
    },
    prepare(selection) {
      const {title1, title2} = selection
      return {
        title: title1 || title2,
      }
    }
  },
};
