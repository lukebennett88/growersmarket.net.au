#! /usr/bin/env node

const dotenv = require('dotenv');
const { gql } = require('@apollo/client');
const fetch = require('node-fetch');
const fs = require('fs');

dotenv.config({
  path: '.env.local',
});

const { ApolloClient, HttpLink, InMemoryCache } = require('@apollo/client');

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://l3fqvsnn.api.sanity.io/v1/graphql/production/default`,
    fetch,
  }),
  cache: new InMemoryCache(),
});

const SANITY_DATA = gql`
  query SanityQuery {
    SiteSettings(id: "siteSettings") {
      address {
        streetAddress
        suburb
        googleMaps {
          link
          embed
        }
      }
      description
      faxNumber
      hours {
        days
        hours
      }
      phoneNumber
      shareImage {
        asset {
          url
        }
      }
      siteUrl
      socialLinks {
        _key
        socialNetwork
        link
      }
      title
      deliverySchedule {
        deliveryLocations {
          _key
          location
          deliveryDays {
            _key
            day
          }
        }
        datesClosed {
          _key
          dates
        }
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

async function saveSettingsToFS() {
  const data = await getSiteSettings();
  fs.writeFile('./src/data/site-settings.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.info('Site settings written to file system');
  });
}

async function main() {
  try {
    await saveSettingsToFS();
  } catch (error) {
    throw new Error(error);
  }
}

main();
