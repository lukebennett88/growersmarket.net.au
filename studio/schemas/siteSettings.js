export default {
  title: 'Settings',
  name: 'siteSettings',
  type: 'document',
  fields: [
    {
      title: 'Default page title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Default page description',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Site URL',
      name: 'siteUrl',
      type: 'string',
    },
    {
      title: 'Share image',
      name: 'shareImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Phone number',
      name: 'phoneNumber',
      type: 'string',
    },
    {
      title: 'Address',
      name: 'address',
      type: 'address',
    },
    {
      title: 'Social Links',
      name: 'socialLinks',
      type: 'array',
      of: [{ type: 'socialLinks' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
};
