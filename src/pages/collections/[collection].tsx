import {
  Breadcrumbs,
  Carousel,
  Container,
  DeliverySchedule,
  HorizontalPadding,
  ProductCard,
  ProductGrid,
  TopSellingProducts,
} from '@components/index';
import {
  getAllCollections,
  getAllSlides,
  getCollectionByHandle,
  getSiteSettings,
  getTopSelling,
  ICollectionByHandle,
  ISlide,
  ITopSellingProducts,
} from '@lib/index';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
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
  const {
    query: { productType },
  } = useRouter();

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
