import { gql } from '@apollo/client';
import { apolloClient } from './apollo-client';

const GET_SANITY_PAGE = gql`
  query ProductQuery($id: ID!) {
    Page(id: $id) {
      title
      description
      slug {
        current
      }
      shareImage {
        asset {
          url
        }
      }
      content {
        _key
        _type
        blockContentRaw
      }
    }
  }
`;

async function getSanityPage(variables) {
  const { data } = await apolloClient.query({
    query: GET_SANITY_PAGE,
    variables,
    context: {
      clientName: 'SANITY',
    },
  });
  return data.Page;
}

export { getSanityPage };
