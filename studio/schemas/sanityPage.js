export default {
  title: 'Sanity page',
  name: 'sanityPage',
  type: 'object',
  description: 'Reference to a page that is set up in Sanity',
  fieldset: 'menuItem',
  fields: [
    {
      title: 'Page',
      name: 'referencePage',
      type: 'reference',
      to: [{ type: 'page' }],
    },
    {
      title: 'Label',
      name: 'label',
      type: 'string',
      description:
        'Change this if you want the text to be different to the page title',
    },
  ],
  // TODO: label this so it looks better in the CMS
};
