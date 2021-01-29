import * as React from 'react';
import { NextSeo } from 'next-seo';
import slugify from 'slugify';

import {
  HorizontalPadding,
  Container,
  Carousel,
  Breadcrumbs,
  TopSellingProducts,
} from '@components/index';
import {
  getAllCollectionsByType,
  getProductTypes,
  getSiteNavigation,
  getSiteSettings,
  getTopSelling,
} from '@lib/index';
import Link from 'next/link';

function ProductTypePage({ productType, allCollectionsByType, topSelling }) {
  return (
    <>
      <NextSeo title="Product Type Page" />
      <Carousel />
      <Breadcrumbs
        productType={{
          title: productType,
          handle: slugify(productType, {
            lower: true,
          }),
        }}
      />
      <Container>
        <div className="relative grid lg:grid-cols-3">
          <div className="py-16 lg:col-span-2">
            <HorizontalPadding>
              <div className="grid gap-12 lg:grid-cols-3">
                <div>
                  <h1 className="text-2xl font-bold">All {productType}</h1>
                  Sort by{' '}
                  <select name="" id="">
                    <option value="A – Z (Name)">A – Z (Name)</option>
                  </select>
                </div>
              </div>
              <div className="mt-2 border-t">
                {/* <ul className="mt-2 space-y-6">
                  {collections.map(({ node }) => (
                    <li key={node.id}>
                      <Link href={node.collections.handle}>
                        <a>
                          <div className="prose">
                            <pre>{JSON.stringify(node, null, 2)}</pre>
                          </div>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul> */}
              </div>
            </HorizontalPadding>
          </div>
          <TopSellingProducts
            topSelling={topSelling}
            productType={productType}
          />
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
          lower: true,
        }),
        node,
      },
    })),
    fallback: false,
  };
}

async function getStaticProps({ params }) {
  // We can't pass the non-slugified productType so we need to run the
  const productTypes = await getProductTypes();
  const productType = productTypes.filter(
    ({ node }) =>
      slugify(node, {
        lower: true,
      }) === params.productType
  )[0].node;

  const allCollectionsByType = await getAllCollectionsByType({
    query: `product_type:${productType}`,
  });

  const topSelling = await getTopSelling({
    query: `product_type:${productType}, available_for_sale:true`,
  });

  const siteNavigation = await getSiteNavigation();
  const siteSettings = await getSiteSettings();

  return {
    props: {
      siteNavigation,
      siteSettings,
      topSelling,
      productType,
      allCollectionsByType,
    },
    revalidate: 60,
  };
}

export { ProductTypePage as default, getStaticPaths, getStaticProps };
