import { Breadcrumbs } from '@components/breadcrumbs';
import { Carousel } from '@components/carousel';
import { Container } from '@components/container';
import { DeliverySchedule } from '@components/delivery-schedule';
import { HorizontalPadding } from '@components/horizontal-padding';
import { ProductCard } from '@components/product-card';
import { ProductGrid } from '@components/product-grid';
import { TopSellingProducts } from '@components/top-selling-products';
import { getAllCollections } from '@lib/get-all-collections';
import { getAllSlides, ISlide } from '@lib/get-all-slides';
import {
  getCollectionByHandle,
  ICollectionByHandle,
} from '@lib/get-collection-by-handle';
import { getSiteSettings } from '@lib/get-site-settings';
import { getTopSelling, ITopSellingProducts } from '@lib/get-top-selling';
import { NextSeo } from 'next-seo';
import * as React from 'react';
import slugify from 'slugify';

interface ICollectionPage {
  collection: ICollectionByHandle;
  topSelling: ITopSellingProducts;
  carouselSlides: Array<ISlide>;
}

function CollectionPage({
  collection,
  topSelling,
  carouselSlides,
}: ICollectionPage): React.ReactElement {
  const { title, description, products } = collection;
  return (
    <>
      <NextSeo title={title} />
      <Carousel slides={carouselSlides} />
      <Breadcrumbs
        navigation={[
          {
            title,
            handle: `collections/${slugify(title, {
              lower: true,
            })}`,
          },
        ]}
      />
      <Container>
        <div className="relative grid lg:grid-cols-3">
          <div className="py-16 lg:col-span-2">
            <HorizontalPadding>
              <div className="grid gap-12 lg:grid-cols-3">
                <div className="col-span-3">
                  <h1 className="text-2xl font-bold">{title}</h1>
                  {description && <p className="mt-2">{description}</p>}
                </div>
              </div>
              <div className="mt-2 -mx-4 border-t sm:-mx-6 lg:-mx-8">
                <ProductGrid columns={3}>
                  {products.edges.map((product) => (
                    <ProductCard key={product.node.id} product={product} />
                  ))}
                </ProductGrid>
              </div>
            </HorizontalPadding>
          </div>
          <TopSellingProducts topSelling={topSelling} />
        </div>
        <DeliverySchedule />
      </Container>
    </>
  );
}

async function getStaticPaths() {
  const collections = await getAllCollections();
  return {
    paths: collections.map(({ node }) => ({
      params: {
        collection: node.handle,
      },
    })),
    fallback: false,
  };
}

interface IParams {
  params: {
    collection: string;
  };
}

async function getStaticProps({ params }: IParams) {
  const collection = await getCollectionByHandle({
    handle: params.collection,
  });

  const topSelling = await getTopSelling({
    query: `available_for_sale:true`,
  });

  const siteSettings = await getSiteSettings();
  const carouselSlides = await getAllSlides();

  return {
    props: {
      siteSettings,
      topSelling,
      collection,
      carouselSlides,
    },
    revalidate: 60,
  };
}

export { CollectionPage as default, getStaticPaths, getStaticProps };
