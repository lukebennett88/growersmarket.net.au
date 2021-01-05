import { IoShareSocial as icon } from 'react-icons/io5';

export default {
  title: 'Social Links',
  name: 'socialLinks',
  type: 'object',
  icon,
  fields: [
    {
      title: 'Social Network',
      name: 'socialNetwork',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'],
        direction: 'horizontal',
      },
    },
    {
      title: 'Link',
      name: 'link',
      type: 'string',
    },
  ],
  preview: {
    select: {
      socialNetwork: 'socialNetwork',
    },
    prepare({ socialNetwork }) {
      const title = socialNetwork;
      return {
        title,
      };
    },
  },
};
