import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const SANITY_DATA = gql`
  query SanityQuery {
    SiteSettings(id: "siteSettings") {
      title
      description
      siteUrl
      shareImage {
        asset {
          url
        }
      }
      phoneNumber
      address {
        streetAddress
        suburb
        googleMaps {
          link
          embed
        }
      }
      socialLinks {
        _key
        socialNetwork
        link
      }
    }
  }
`;

async function getSiteSettings() {
  const { data } = await apolloClient.query({
    query: SANITY_DATA,
    context: {
      clientName: 'SANITY',
    },
  });
  return data.SiteSettings;
}

export { getSiteSettings };
