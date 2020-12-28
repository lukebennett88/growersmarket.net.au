import { ApolloClient, InMemoryCache } from '@apollo/client';

const shopifyClient = new ApolloClient({
  uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_SHOP_NAME}.myshopify.com/api/2020-10/graphql.json`,
  cache: new InMemoryCache(),
  headers: {
    'X-Shopify-Storefront-Access-Token':
      process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
    Accept: 'application/json',
  },
});

export { shopifyClient };
