import { getAllProducts } from '@lib/get-products';
import { GetServerSideProps } from 'next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getServerSideSitemap } from 'next-sitemap';

import siteSettings from '../../data/site-settings.json';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const products = await getAllProducts();

  const fields = products.map((product) => ({
    loc: `${siteSettings.siteUrl}/products/${String(product.handle)}`, // Absolute url
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
