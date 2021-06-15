import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_FIRST_COLLECTIONS = gql`
  query {
    collections(sortKey: TITLE, first: 250) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          handle
          title
        }
      }
    }
  }
`;

const GET_NEXT_COLLECTIONS = gql`
  query getNextCollections($cursor: String!) {
    collections(sortKey: TITLE, first: 250, after: $cursor) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          handle
          title
        }
      }
    }
  }
`;

async function getAllCollections() {
  let collections = [];
  async function getCollectionsFromQuery() {
    let newCursor = '';

    async function getNextCollections(cursor) {
      return apolloClient
        .query({
          query: GET_NEXT_COLLECTIONS,
          variables: { cursor },
        })
        .then((result) => {
          collections = collections.concat(result.data.collections.edges);
          if (result.data.collections.pageInfo.hasNextPage) {
            newCursor =
              result.data.collections.edges[
                result.data.collections.edges.length - 1
              ].cursor;
            return getNextCollections(newCursor);
          }
          return collections;
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
        query: GET_FIRST_COLLECTIONS,
      })
      .then((result) => {
        collections = collections.concat(result.data.collections.edges);
        if (result.data.collections.pageInfo.hasNextPage) {
          newCursor =
            result.data.collections.edges[
              result.data.collections.edges.length - 1
            ].cursor;
          return getNextCollections(newCursor);
        }
        return collections;
      })
      .catch((error: string) =>
        // eslint-disable-next-line no-console
        console.error({
          error: `Error building collection pages \n${error}`,
        })
      );
  }
  await getCollectionsFromQuery();
  return collections;
}

export { getAllCollections };
