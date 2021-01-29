import { gql } from '@apollo/client';
import { apolloClient } from './apollo-client';

const GET_FIRST_PRODUCTS_BY_TYPE = gql`
  query GetFirstProductsByTypeQuery($query: String!) {
    products(sortKey: TITLE, first: 250, query: $query) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          handle
          collections(first: 250) {
            edges {
              node {
                descriptionHtml
                handle
                id
                image {
                  altText
                  originalSrc
                }
                title
              }
            }
          }
        }
      }
    }
  }
`;

const GET_NEXT_PRODUCTS_BY_TYPE = gql`
  query GetNextProductsByTypeQuery($cursor: String!, $query: String!) {
    products(sortKey: TITLE, first: 250, query: $query, after: $cursor) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          handle
          collections(first: 250) {
            edges {
              node {
                descriptionHtml
                handle
                id
                image {
                  altText
                  originalSrc
                }
                title
              }
            }
          }
        }
      }
    }
  }
`;

async function getAllCollectionsByType(variables) {
  let products = [];
  async function getProductsFromQuery() {
    let newCursor = '';

    async function getNextProds(cursor) {
      return await apolloClient
        .query({
          query: GET_NEXT_PRODUCTS_BY_TYPE,
          variables: { ...variables, cursor: cursor },
        })
        .then((result) => {
          products = products.concat(result.data.products.edges);
          if (result.data.products.pageInfo.hasNextPage) {
            newCursor =
              result.data.products.edges[result.data.products.edges.length - 1]
                .cursor;
            return getNextProds(newCursor);
          } else {
            return products;
          }
        })
        .catch((err) =>
          console.error({
            error: `Error building product pages \n${err}`,
          })
        );
    }

    await apolloClient
      .query({
        query: GET_FIRST_PRODUCTS_BY_TYPE,
        variables,
      })
      .then((result) => {
        products = products.concat(result.data.products.edges);
        if (result.data.products.pageInfo.hasNextPage) {
          newCursor =
            result.data.products.edges[result.data.products.edges.length - 1]
              .cursor;
          return getNextProds(newCursor);
        } else {
          return products;
        }
      })
      .catch((err) =>
        console.error({
          error: `Error building product pages \n${err}`,
        })
      );
  }
  await getProductsFromQuery();
  return products;
}

export { getAllCollectionsByType };
