export default {
  title: 'Sanity page',
  name: 'sanityPage',
  type: 'object',
  description: 'Reference to a page that is set up in Sanity',
  fieldset: 'menuItem',
  fields: [
    {
      Label: 'Page',
      name: 'referencePage',
      type: 'reference',
      to: [{ type: 'page' }],
    },
    {
      Label: 'Label',
      name: 'label',
      type: 'string',
      description:
        'Change this if you want the text to be different to the page title',
    },
  ],
  // Specials / FAQs / About / Delivery / Contact
  // TODO: label this so it looks better in the CMS
};
