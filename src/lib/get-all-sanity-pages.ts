import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const SANITY_DATA = gql`
  query SanityQuery {
    allPage {
      _id
      slug {
        current
      }
    }
  }
`;

async function getAllSanityPages() {
  const { data } = await apolloClient.query({
    query: SANITY_DATA,
    context: {
      clientName: 'SANITY',
    },
  });
  return data.allPage;
}

export { getAllSanityPages };
