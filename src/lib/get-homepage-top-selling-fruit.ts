import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_HOMEPAGE_TOP_SELLING_FRUIT = gql`
  query HomepageTopSellingFruitQuery {
    topSellingFruit: products(
      first: 4
      sortKey: BEST_SELLING
      query: "product_type:Fruit, available_for_sale:true"
    ) {
      edges {
        node {
          id
          compareAtPriceRange {
            minVariantPrice {
              amount
            }
          }
          handle
          images(first: 1) {
            edges {
              node {
                altText
                id
                originalSrc
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          title
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

async function getHomepageTopSellingFruit() {
  const { data } = await apolloClient.query({
    query: GET_HOMEPAGE_TOP_SELLING_FRUIT,
    context: {
      clientName: 'SHOPIFY',
    },
  });
  return data.topSellingFruit;
}

export { getHomepageTopSellingFruit };
