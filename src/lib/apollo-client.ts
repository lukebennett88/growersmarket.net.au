import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

const sanityLink = new HttpLink({
  uri: `https://l3fqvsnn.api.sanity.io/v1/graphql/production/default`,
});

const shopifyLink = new HttpLink({
  uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_SHOP_NAME}.myshopify.com/api/2020-10/graphql.json`,
  headers: {
    'X-Shopify-Storefront-Access-Token':
      process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
    Accept: 'application/json',
  },
});

const apolloClient = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === 'SANITY',
    sanityLink,
    shopifyLink
  ),
  cache: new InMemoryCache(),
});

export { apolloClient };
