import { gql } from '@apollo/client';
import { apolloClient } from './apollo-client';

const SANITY_DATA = gql`
  query SanityQuery {
    SiteNavigation(id: "siteNavigation") {
      items {
        _key
        title
        subMenu {
          _key
          title
          route
          link
        }
        route
        link
      }
    }
  }
`;

async function getSiteNavigation() {
  const { data } = await apolloClient.query({
    query: SANITY_DATA,
    context: {
      clientName: 'SANITY',
    },
  });
  return data.SiteNavigation;
}

export { getSiteNavigation };
