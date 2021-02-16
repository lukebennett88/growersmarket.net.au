export default {
  title: 'Carousel',
  name: 'carousel',
  type: 'document',
  fields: [
    {
      name: 'slides',
      type: 'array',
      of: [{ type: 'slide' }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'CTA Carousel',
      };
    },
  },
};
