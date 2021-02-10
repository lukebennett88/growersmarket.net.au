import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_COLLECTION = gql`
  query GetCollectionQuery($handle: String!) {
    collectionByHandle(handle: $handle) {
      title
      description
      products(sortKey: TITLE, first: 250) {
        edges {
          node {
            handle
            id
            title
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

interface ICollectionByHandle {
  title: string;
  description: string;
  products: {
    edges: Array<{
      node: {
        handle: string;
        id: string;
        title: string;
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
