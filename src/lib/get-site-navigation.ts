import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';
import { getAllCollectionsByType } from './get-all-collections-by-type';

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
    }
  }
`;

interface INavItem {
  id: string;
  title: string;
  route: string;
  subMenu?: Array<{
    id: string;
    handle: string;
    title: string;
  }>;
}

async function getCollectionsByProductType(productType: string) {
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
    .map((node: string) => JSON.parse(node));
}

async function getSiteNavigation() {
  const { data } = await apolloClient.query({
    query: SANITY_DATA,
    context: {
      clientName: 'SANITY',
    },
  });

  return [
    {
      id: '43c526b2-66b1-4522-b253-114367b3aebc',
      title: 'Fruit',
      route: 'fruit',
      subMenu: await getCollectionsByProductType('Fruit'),
    },
    {
      id: 'cfd8dab3-ec0a-401a-a760-007147f218ed',
      title: 'Vegetables',
      route: 'vegetables',
      subMenu: await getCollectionsByProductType('Vegetables'),
    },
    {
      id: '93a02192-41c5-40fc-82ba-40b8bfea2c63',
      title: 'Fridge & Pantry',
      route: 'fridge-and-pantry',
      subMenu: await getCollectionsByProductType('Fridge & Pantry'),
    },
    {
      id: 'f1a5589f-998f-4de3-a982-5e916c228a9f',
      title: 'Pre-Packed Boxes',
      route: 'pre-packed-boxes',
      subMenu: await getCollectionsByProductType('Pre-Packed Boxes'),
    },
    ...data.Navigation.navItems.map(({ id, sanityPage, externalPage }) => ({
      id,
      title:
        externalPage?.label ||
        sanityPage?.label ||
        sanityPage?.referencePage.title,
      route: externalPage?.slug || sanityPage?.referencePage.slug.current,
    })),
  ];
}

export { getSiteNavigation };
export type { INavItem };
