import * as React from 'react';
import { NextSeo } from 'next-seo';
import slugify from 'slugify';

import {
  HorizontalPadding,
  Container,
  Carousel,
  Breadcrumbs,
  TopSellingProducts,
  DeliverySchedule,
} from '@components/index';
import {
  getAllCollectionsByType,
  getProductTypes,
  getSiteNavigation,
  getSiteSettings,
  getTopSelling,
} from '@lib/index';
import Link from 'next/link';
import Image from 'next/image';

function ProductTypePage({ productType, allCollectionsByType, topSelling }) {
  const collections = allCollectionsByType.map(({ node }) => {
    const collection = node.collections.edges?.[0]?.node;
    return JSON.stringify(collection);
  });

  const unique = Array.from(new Set(collections))
    .filter((node) => typeof node === 'string')
    .map((node: string) => JSON.parse(node));

  return (
    <>
      <NextSeo title={`All ${productType}`} />
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
                <ul className="grid gap-12 mt-2 lg:grid-cols-3">
                  {unique.map((node) => (
                    <li key={node.id}>
                      <Link href={node.handle}>
                        <a>
                          <div className="relative aspect-w-4 aspect-h-3">
                            <div className="absolute inset-0 bg-gray-light">
                              {node.image && (
                                <Image
                                  src={node.image.originalSrc}
                                  alt={node.image.altText || ''}
                                  width={600}
                                  height={450}
                                  layout="intrinsic"
                                  objectFit="cover"
                                />
                              )}
                            </div>
                          </div>
                          <h2 className="mt-2 font-bold text-center">
                            {node.title}
                          </h2>
                        </a>
                      </Link>
                      <div className="mt-2 text-center">
                        <Link href={node.handle}>
                          <a className="bg-white border cta text-green-dark border-green-dark">
                            View all
                          </a>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </HorizontalPadding>
          </div>
          <TopSellingProducts
            topSelling={topSelling}
            productType={productType}
          />
        </div>
        <DeliverySchedule />
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
