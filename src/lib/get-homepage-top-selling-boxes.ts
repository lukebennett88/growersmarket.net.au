import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_HOMEPAGE_TOP_SELLING_BOXES = gql`
  query HomepageTopSellingBoxesQuery {
    topSellingBoxes: products(
      first: 4
      sortKey: BEST_SELLING
      query: "product_type:Pre-Packed Boxes, available_for_sale:true"
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

async function getHomepageTopSellingBoxes() {
  const { data } = await apolloClient.query({
    query: GET_HOMEPAGE_TOP_SELLING_BOXES,
    context: {
      clientName: 'SHOPIFY',
    },
  });
  return data.topSellingBoxes;
}

export { getHomepageTopSellingBoxes };
