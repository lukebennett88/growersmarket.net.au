import * as React from 'react';
import { NextSeo } from 'next-seo';
import slugify from 'slugify';

import { HorizontalPadding, Container, Carousel } from '@components/index';
import {
  getAllProductsByType,
  getProductTypes,
  getSiteNavigation,
  getSiteSettings,
} from '@lib/index';

function ProductTypePage({ allProductsByType }) {
  console.log(allProductsByType);
  return (
    <>
      <NextSeo title="Product Type Page" />
      <Carousel />
      {/* <Breadcrumbs
    productType={product.productType}
    collection={product.collections?.edges?.[0]?.node.title}
    title={product.title}
    handle={product.handle}
  /> */}
      <Container>
        <div className="relative grid lg:grid-cols-3">
          <div className="py-16 lg:col-span-2">
            <HorizontalPadding>
              <div className="grid gap-12 lg:grid-cols-3">
                <div>
                  <h1 className="text-2xl font-bold">All xxx</h1>
                  {/*  */}
                </div>
                {/* Product Grid */}
              </div>
            </HorizontalPadding>
          </div>
        </div>
      </Container>
    </>
  );
}

async function getStaticPaths() {
  const productTypes = await getProductTypes();
  return {
    paths: productTypes.map(({ node }) => ({
      params: {
        productType: slugify(node, {
          lower: true, // convert to lower case, defaults to `false`
        }),
      },
    })),
    fallback: false,
  };
}

async function getStaticProps({ params }) {
  const allProductsByType = getAllProductsByType({
    query: `product_type:${params.productType}`,
  });
  const siteNavigation = await getSiteNavigation();
  const siteSettings = await getSiteSettings();

  return {
    props: {
      siteNavigation,
      siteSettings,
      allProductsByType,
    },
    revalidate: 60,
  };
}

export { ProductTypePage as default, getStaticPaths, getStaticProps };
