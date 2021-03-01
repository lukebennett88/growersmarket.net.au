import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_HOMEPAGE_SPECIALS = gql`
  query HomepageSpecialsQuery {
    specials: collectionByHandle(handle: "specials") {
      products(first: 8, sortKey: CREATED) {
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
  }
`;

async function getHomepageSpecials() {
  const { data } = await apolloClient.query({
    query: GET_HOMEPAGE_SPECIALS,
    context: {
      clientName: 'SHOPIFY',
    },
  });
  return data.specials.products;
}

export { getHomepageSpecials };
