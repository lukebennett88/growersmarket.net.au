#! /usr/bin/env node

const dotenv = require('dotenv');
const { gql } = require('@apollo/client');
const fetch = require('node-fetch');
const fs = require('fs');

dotenv.config({
  path: '.env.local',
});

const {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} = require('@apollo/client');

const sanityLink = new HttpLink({
  uri: `https://l3fqvsnn.api.sanity.io/v1/graphql/production/default`,
  fetch,
});

const shopifyLink = new HttpLink({
  uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_SHOP_NAME}.myshopify.com/api/2020-10/graphql.json`,
  fetch,
  headers: {
    'X-Shopify-Storefront-Access-Token':
      process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
    Accept: 'application/json',
  },
});

const apolloClient = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === 'SANITY',
    sanityLink,
    shopifyLink
  ),
  cache: new InMemoryCache(),
});

const GET_FIRST_PRODUCTS_BY_TYPE = gql`
  query GetFirstProductsByTypeQuery($query: String!) {
    products(sortKey: TITLE, first: 250, query: $query) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
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
          handle
          id
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
          handle
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
      return apolloClient
        .query({
          query: GET_NEXT_PRODUCTS_BY_TYPE,
          variables: { ...variables, cursor },
        })
        .then((result) => {
          products = products.concat(result.data.products.edges);
          if (result.data.products.pageInfo.hasNextPage) {
            newCursor =
              result.data.products.edges[result.data.products.edges.length - 1]
                .cursor;
            return getNextProds(newCursor);
          }
          return products;
        })
        .catch((error) =>
          // eslint-disable-next-line no-console
          console.error({
            error: `${error} (in getNextProds)`,
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
        }
        return products;
      })
      .catch((error) =>
        // eslint-disable-next-line no-console
        console.error({
          error: `${error} (in getProductsFromQuery)`,
        })
      );
  }
  await getProductsFromQuery();
  return products;
}

const SANITY_DATA = gql`
  query SanityQuery {
    Navigation(id: "navigation") {
      navItems {
        id: _key
        sanityPage {
          referencePage {
            title
            slug {
              current
            }
          }
          label
        }
        externalPage {
          label
          slug
        }
      }
      footerNavItems {
        id: _key
        subHeading
        links {
          id: _key
          sanityPage {
            referencePage {
              title
              slug {
                current
              }
            }
            label
          }
          externalPage {
            label
            slug
          }
        }
      }
    }
  }
`;

async function getCollectionsByProductType(productType) {
  // Query for all collects that contain a specific productType
  const allCollectionsByType = await getAllCollectionsByType({
    query: `product_type:${productType}`,
  });

  // Stringify all the nodes so that we can compare them in the next step
  const stringifiedCollections = allCollectionsByType.map(({ node }) => {
    const collection = node.collections.edges?.[0]?.node;
    return JSON.stringify(collection);
  });

  // Filter out all duplicates and return the result
  return [...new Set(stringifiedCollections)]
    .filter((node) => typeof node === 'string')
    .map((node) => JSON.parse(node));
}

async function getSiteNavigation() {
  const { data } = await apolloClient.query({
    query: SANITY_DATA,
    context: {
      clientName: 'SANITY',
    },
  });

  const collectionPages = [
    {
      id: '43c526b2-66b1-4522-b253-114367b3aebc',
      title: 'Fruit',
      route: 'fruit',
      image: '/product-type/fruit.jpg',
      subMenu: await getCollectionsByProductType('Fruit'),
    },
    {
      id: 'cfd8dab3-ec0a-401a-a760-007147f218ed',
      title: 'Vegetables',
      route: 'vegetables',
      image: '/product-type/vegetables.jpg',
      subMenu: await getCollectionsByProductType('Vegetables'),
    },
    {
      id: '93a02192-41c5-40fc-82ba-40b8bfea2c63',
      title: 'Fridge & Pantry',
      route: 'fridge-and-pantry',
      image: '/product-type/fridge-pantry.jpg',
      subMenu: await getCollectionsByProductType('Fridge & Pantry'),
    },
    {
      id: 'f1a5589f-998f-4de3-a982-5e916c228a9f',
      title: 'Pre-Packed Boxes',
      route: 'pre-packed-boxes',
      image: '/product-type/pre-packed-boxes.jpg',
      subMenu: await getCollectionsByProductType('Pre-Packed Boxes'),
    },
  ];

  const sanityPages = data.Navigation.navItems.map(
    ({ id, sanityPage, externalPage }) => ({
      id,
      title:
        externalPage?.label ||
        sanityPage?.label ||
        sanityPage?.referencePage.title,
      route: externalPage?.slug
        ? `${externalPage?.slug}`
        : `pages/${sanityPage?.referencePage.slug.current}`,
    })
  );

  return {
    mainNavigation: [...collectionPages, ...sanityPages],
    footerNavigation: {
      collectionPages,
      navLinks: data.Navigation.footerNavItems.map(
        ({ id, subHeading, links }) => ({
          id,
          subHeading,
          links: links.map((link) => ({
            id: link.id,
            title:
              link.externalPage?.label ||
              link.sanityPage?.label ||
              link.sanityPage?.referencePage.title,
            route: link.externalPage?.slug
              ? `${link.externalPage?.slug}`
              : `pages/${link.sanityPage?.referencePage.slug.current}`,
          })),
        })
      ),
    },
  };
}

async function saveNavigationToFS() {
  const data = await getSiteNavigation();
  fs.writeFile(
    './src/data/site-navigation.json',
    JSON.stringify(data),
    (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.info('Site navigation written to file system');
    }
  );
}

async function main() {
  try {
    await saveNavigationToFS();
  } catch (error) {
    throw new Error(error);
  }
}

main();
