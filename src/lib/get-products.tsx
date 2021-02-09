/* eslint-disable sonarjs/no-identical-functions */
import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_FIRST_PRODUCTS = gql`
  query {
    products(sortKey: TITLE, first: 250) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          handle
          updatedAt
        }
      }
    }
  }
`;

const GET_NEXT_PRODUCTS = gql`
  query getProds($cursor: String!) {
    products(sortKey: TITLE, first: 250, after: $cursor) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          handle
          updatedAt
        }
      }
    }
  }
`;

async function getAllProducts() {
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
        console.error({
          error: `Error building product pages \n${error}`,
        })
      );
  }
  await getProductsFromQuery();
  return products;
}

export { getAllProducts };
