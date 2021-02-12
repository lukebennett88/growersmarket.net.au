export default {
  title: 'External page',
  name: 'externalPage',
  type: 'object',
  description: 'Reference to a page that was created elsewhere',
  fieldset: 'menuItem',
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'string',
      description: 'URL that we are linking to (do not add leading "/")',
    },
  ],
  // TODO: label this so it looks better in the CMS
};
