import { gql } from '@apollo/client';
import { apolloClient } from './apollo-client';

const GET_PRODUCT_TYPES = gql`
  query ProductTypesQuery {
    productTypes(first: 250) {
      edges {
        node
      }
    }
  }
`;

async function getProductTypes() {
  const { data } = await apolloClient.query({
    query: GET_PRODUCT_TYPES,
    context: {
      clientName: 'SHOPIFY',
    },
  });
  return data.productTypes.edges;
}

export { getProductTypes };
