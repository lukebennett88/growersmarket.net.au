import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_FAQS = gql`
  query FAQsQuery {
    Page(id: "1887c410-abe0-4b02-b4e6-ad80620a305b") {
      content {
        _key
        _type
        blockContentRaw
      }
    }
  }
`;

async function getAllFAQs() {
  const { data } = await apolloClient.query({
    query: GET_FAQS,
    context: {
      clientName: 'SANITY',
    },
  });
  return data.Page.content;
}

export { getAllFAQs };
