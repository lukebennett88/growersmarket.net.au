import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_HOMEPAGE_TOP_SELLING_VEGETABLES = gql`
  query HomepageTopSellingVegetablesQuery {
    topSellingVegetables: products(
      first: 2
      sortKey: BEST_SELLING
      query: "product_type:Vegetables, available_for_sale:true"
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

async function getHomepageTopSellingVegetables() {
  const { data } = await apolloClient.query({
    query: GET_HOMEPAGE_TOP_SELLING_VEGETABLES,
    context: {
      clientName: 'SHOPIFY',
    },
  });
  return data.topSellingVegetables;
}

export { getHomepageTopSellingVegetables };
