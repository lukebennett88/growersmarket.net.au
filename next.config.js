module.exports = {
  target: 'serverless',
  future: {
    webpack5: true
  },
  images: {
    domains: [
      'cdn.shopify.com',
      'burst.shopifycdn.com',
    ]
  }
};
