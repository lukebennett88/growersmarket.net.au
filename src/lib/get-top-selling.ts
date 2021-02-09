import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_TOP_SELLING = gql`
  query ProductQuery($query: String!) {
    products(first: 3, sortKey: BEST_SELLING, query: $query) {
      edges {
        node {
          handle
          id
          images(first: 1) {
            edges {
              node {
                id
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
  }
`;

interface ITopSellingProductNode {
  handle: string;
  id: string;
  images: {
    edges: Array<{
      node: {
        id: string;
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
}

interface ITopSellingProduct {
  node: ITopSellingProductNode;
}

interface ITopSellingProducts {
  edges: ITopSellingProduct[];
}

async function getTopSelling(variables) {
  const { data } = await apolloClient.query({
    query: GET_TOP_SELLING,
    variables,
    context: {
      clientName: 'SHOPIFY',
    },
  });
  return data.products;
}

export { getTopSelling };
export type { ITopSellingProduct, ITopSellingProductNode, ITopSellingProducts };
