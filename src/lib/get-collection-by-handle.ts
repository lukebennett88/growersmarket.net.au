import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_COLLECTION = gql`
  query GetCollectionQuery($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      description
      products(sortKey: TITLE, first: 250) {
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
      title
    }
  }
`;

interface ICollectionByHandle {
  description: string;
  products: {
    edges: Array<{
      node: {
        id: string;
        handle: string;
        compareAtPriceRange: {
          minVariantPrice: {
            amount: string;
          };
        };
        images: {
          edges: Array<{
            node: {
              altText: string | null;
              originalSrc: string;
            };
          }>;
        };
        priceRange: {
          minVariantPrice: {
            amount: string;
          };
        };
        title: string;
        variants: {
          edges: Array<{
            node: {
              id: string;
            };
          }>;
        };
      };
    }>;
  };
  title: string;
}

async function getCollectionByHandle(variables) {
  const { data } = await apolloClient.query({
    query: GET_COLLECTION,
    variables,
    context: {
      clientName: 'SHOPIFY',
    },
  });
  return data.collectionByHandle;
}

export { getCollectionByHandle };
export type { ICollectionByHandle };
