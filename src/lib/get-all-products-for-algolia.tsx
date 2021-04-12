/* eslint-disable sonarjs/no-identical-functions */
import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_FIRST_PRODUCTS = gql`
  query FirstProductsQuery {
    products(sortKey: TITLE, first: 250) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          handle
          description
          title
          tags
          productType
          availableForSale
          totalInventory
          images(first: 1) {
            edges {
              node {
                id
                originalSrc
                altText
              }
            }
          }
        }
      }
    }
  }
`;

const GET_NEXT_PRODUCTS = gql`
  query NextProductsQuery($cursor: String!) {
    products(sortKey: TITLE, first: 250, after: $cursor) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          handle
          description
          title
          tags
          productType
          availableForSale
          totalInventory
          images(first: 1) {
            edges {
              node {
                id
                originalSrc
                altText
              }
            }
          }
        }
      }
    }
  }
`;

async function getAllProductsForAlgolia() {
  let products = [];

  async function getProductsFromQuery() {
    let newCursor = '';

    async function getNextProds(cursor) {
      return apolloClient
        .query({
          query: GET_NEXT_PRODUCTS,
          variables: { cursor },
        })
        .then((result) => {
          products = products.concat(result.data.products.edges);
          if (result.data.products.pageInfo.hasNextPage) {
            newCursor =
              result.data.products.edges[result.data.products.edges.length - 1]
                .cursor;
            return getNextProds(newCursor);
          }
          return products;
        })
        .catch((error: string) =>
          // eslint-disable-next-line no-console
          console.error({
            error: `Error building product pages \n${error}`,
          })
        );
    }

    await apolloClient
      .query({
        query: GET_FIRST_PRODUCTS,
      })
      .then((result) => {
        products = products.concat(result.data.products.edges);
        if (result.data.products.pageInfo.hasNextPage) {
          newCursor =
            result.data.products.edges[result.data.products.edges.length - 1]
              .cursor;
          return getNextProds(newCursor);
        }
        return products;
      })
      .catch((error: string) =>
        // eslint-disable-next-line no-console
        console.error({
          error: `Error building product pages \n${error}`,
        })
      );
  }

  await getProductsFromQuery();

  return products.map(
    ({
      node: {
        handle,
        description,
        title,
        tags,
        productType,
        availableForSale,
        totalInventory,
        images,
      },
    }) => ({
      handle,
      description,
      title,
      tags,
      productType,
      availableForSale,
      totalInventory,
      image: {
        id: images.edges[0].node.id,
        originalSrc: images.edges[0].node.originalSrc,
        altText: images.edges[0].node.altText,
      },
    })
  );
  return flattened;
}

export { getAllProductsForAlgolia };
