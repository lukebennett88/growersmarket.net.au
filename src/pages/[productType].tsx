import { Breadcrumbs } from '@components/breadcrumbs';
import { Carousel } from '@components/carousel';
import { Container } from '@components/container';
import { DeliverySchedule } from '@components/delivery-schedule';
import { HorizontalPadding } from '@components/horizontal-padding';
import { TopSellingProducts } from '@components/top-selling-products';
import { getAllCollectionsByType } from '@lib/get-all-collections-by-type';
import { getAllSlides, ISlide } from '@lib/get-all-slides';
import { getProductTypes } from '@lib/get-product-types';
import { getTopSelling, ITopSellingProducts } from '@lib/get-top-selling';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import * as React from 'react';
import slugify from 'slugify';

interface IProductTypePage {
  productType: string;

  collections: Array<{
    id: string;
    handle: string;
    image: {
      originalSrc: string;
      altText?: string;
    };
    title: string;
  }>;

  topSelling: ITopSellingProducts;
  carouselSlides: Array<ISlide>;
}

function ProductTypePage({
  productType,
  collections,
  topSelling,
  carouselSlides,
}: IProductTypePage): React.ReactElement {
  const [filter, setFilter] = React.useState('All');
  const [filteredCollections, setFilteredCollections] = React.useState(
    collections
  );

  // Update state whenever filter changes
  React.useEffect(() => {
    // Start off with all collections
    const tempCollections = JSON.parse(JSON.stringify(collections));

    // Then handle the A-Z filter
    if (filter === 'A – Z (Name)') {
      tempCollections.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Then handle the Z-A filter
    if (filter === 'Z – A (Name)') {
      tempCollections.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredCollections(tempCollections);
  }, [collections, filter]);

  return (
    <>
      <NextSeo title={`All ${productType}`} />
      <Carousel slides={carouselSlides} />
      <Breadcrumbs
        navigation={[
          {
            title: productType,
            handle: slugify(productType, {
              lower: true,
            }),
          },
        ]}
      />
      <Container>
        <div className="relative grid lg:grid-cols-3">
          <div className="py-16 lg:col-span-2">
            <HorizontalPadding>
              <div>
                <h1 className="text-2xl font-bold">All {productType}</h1>
                <div className="mt-2">
                  Sort by{' '}
                  <select
                    onChange={(e) => setFilter(e.target.value)}
                    name="filter_collections"
                    id="filter_collections"
                    className="ml-1 focus:ring-1"
                  >
                    <option value="All">All Products</option>
                    <option value="A – Z (Name)">A – Z (Name)</option>
                    <option value="Z – A (Name)">Z – A (Name)</option>
                  </select>
                </div>
              </div>
              <div className="mt-2 border-t">
                <ul className="grid gap-12 mt-8 lg:grid-cols-3">
                  {filteredCollections.map((node) => (
                    <li key={node.id}>
                      <Link href={`/collections/${node.handle}`}>
                        <a className="block">
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
                        <Link href={`/collections/${node.handle}`}>
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
      },
    })),
    fallback: false,
  };
}

async function getStaticProps({ params }) {
  // We can't pass the non-slugified productType so we need to compare the slugified value
  // we get from params against the same list
  const productTypes = await getProductTypes();
  const productType: string = productTypes.find(
    ({ node }) =>
      slugify(node, {
        lower: true,
      }) === params.productType
  ).node;

  const allCollectionsByType = await getAllCollectionsByType({
    query: `product_type:${productType}`,
  });

  const stringifiedCollections = allCollectionsByType.map(({ node }) => {
    const collection = node.collections.edges?.[0]?.node;
    return JSON.stringify(collection);
  });

  const collections = [...new Set(stringifiedCollections)]
    .filter((node) => typeof node === 'string')
    .map((node: string) => JSON.parse(node));

  const topSelling = await getTopSelling({
    query: `product_type:${productType}, available_for_sale:true`,
  });

  const carouselSlides = await getAllSlides();

  return {
    props: {
      collections,
      productType,
      topSelling,
      carouselSlides,
    },
    revalidate: 60,
  };
}

export { ProductTypePage as default, getStaticPaths, getStaticProps };
