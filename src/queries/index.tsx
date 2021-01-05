import { gql } from '@apollo/client';

export const SANITY_DATA = gql`
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
