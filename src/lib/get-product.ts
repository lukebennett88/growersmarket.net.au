import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_PRODUCT = gql`
  query ProductQuery($handle: String!) {
    productByHandle(handle: $handle) {
      availableForSale
      collections(first: 1) {
        edges {
          node {
            title
            handle
          }
        }
      }
      descriptionHtml
      handle
      id
      images(first: 250) {
        edges {
          node {
            id
            altText
            originalSrc
          }
        }
      }
      options {
        id
        name
        values
      }
      priceRange {
        minVariantPrice {
          amount
        }
      }
      productType
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
`;

interface IProduct {
  collections: {
    edges: Array<{
      node: {
        handle: string;
        title: string;
      };
    }>;
  };
  descriptionHtml: string;
  handle: string;
  images: {
    edges: Array<{
      node: {
        altText: string;
        originalSrc: string;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
    maxVariantPrice: {
      amount: string;
    };
  };
  productType: string;
  title: string;
  variants: {
    edges: Array<{
      node: {
        id: string;
      };
    }>;
  };
}

async function getProduct(variables) {
  const { data } = await apolloClient.query({
    query: GET_PRODUCT,
    variables,
    context: {
      clientName: 'SHOPIFY',
    },
  });
  return data.productByHandle;
}

export { getProduct };
export type { IProduct };
