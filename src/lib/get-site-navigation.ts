import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';
import { getAllCollectionsByType } from './get-all-collections-by-type';

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

function filterCollection(allProducts) {
  const collections = allProducts.map(({ node }) => {
    const collection = node.collections?.edges?.[0];
    return JSON.stringify(collection);
  });

  const unique = [...new Set(collections)]
    .filter((node) => typeof node === 'string')
    .map((node: string) => JSON.parse(node));

  const filterSpecials = unique.filter(
    (collection) => collection.node.title !== 'Specials'
  );

  return filterSpecials.map((collection) => ({
    route: collection.node.handle,
    title: collection.node.title,
    _key: collection.node.id,
  }));
}

async function getSiteNavigation() {
  const { data } = await apolloClient.query({
    query: SANITY_DATA,
    context: {
      clientName: 'SANITY',
    },
  });

  const fruitProducts = await getAllCollectionsByType({
    query: `product_type:Fruit`,
  });
  const vegetablesProducts = await getAllCollectionsByType({
    query: `product_type:Vegetables`,
  });
  const fridgeAndPantryProducts = await getAllCollectionsByType({
    query: `product_type:Fridge & Pantry`,
  });
  const prePackedBoxesProducts = await getAllCollectionsByType({
    query: `product_type:Pre-Packed Boxes`,
  });

  const siteProductNavigation = [
    {
      _key: '61997361e278',
      title: 'Fruit',
      route: 'fruit',
      subMenu: filterCollection(fruitProducts),
    },
    {
      _key: '3bebc89df5e1',
      title: 'Vegetables',
      route: 'vegetables',
      subMenu: filterCollection(vegetablesProducts),
    },
    {
      _key: '3e9c56148601',
      title: 'Fridge & Pantry',
      route: 'fridge-and-pantry',
      subMenu: filterCollection(fridgeAndPantryProducts),
    },
    {
      _key: 'd4d25a3c8d2e',
      title: 'Pre-Packed Boxes',
      route: 'pre-packed-boxes',
      subMenu: filterCollection(prePackedBoxesProducts),
    },
  ];

  return data.SiteNavigation;
}

export { getSiteNavigation };
