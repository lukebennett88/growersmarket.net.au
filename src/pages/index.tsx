import { gql } from '@apollo/client';
import {
  Carousel,
  Container,
  HorizontalPadding,
  ProductCard,
  ProductGrid,
} from '@components/index';
import { apolloClient, getAllSlides } from '@lib/index';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

function HomePage({
  specials,
  bestSellingFruit,
  bestSellingVegetables,
  bestSellingBoxes,
  carouselSlides,
}) {
  return (
    <>
      <NextSeo title="Home" />
      <Carousel slides={carouselSlides} />
      <div className="grid gap-12 pb-12 lg:grid-cols-2">
        <ThisWeeksSpecials products={specials.edges} />
        <TopSellingFruit products={bestSellingFruit.edges} />
        <div className="col-span-full">
          <Container>
            <div className="grid gap-12 mx-auto lg:grid-cols-2">
              <TopSellingVegetables products={bestSellingVegetables.edges} />
              <TopSellingBoxes products={bestSellingBoxes.edges} />
            </div>
            <div className="grid gap-12 mt-12 lg:grid-cols-5">
              <FrequentlyAskedQuestions />
              <DeliverySchedule />
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

function ThisWeeksSpecials({ products }) {
  return (
    <ProductGrid heading="This week's specials">
      {products.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </ProductGrid>
  );
}

function TopSellingFruit({ products }) {
  return (
    <ProductGrid
      heading="Our Top Selling Fruit"
      colour={ProductGrid.colour.GRAY}
    >
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </ProductGrid>
  );
}

function TopSellingVegetables({ products }) {
  return (
    <ProductGrid
      heading="Our Top Selling Vegetables"
      colour={ProductGrid.colour.GRAY}
      columns={2}
    >
      {products.slice(0, 2).map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </ProductGrid>
  );
}

function TopSellingBoxes({ products }) {
  return (
    <ProductGrid
      heading="Our Top Selling Boxes"
      colour={ProductGrid.colour.GRAY}
      columns={2}
    >
      {products.slice(0, 2).map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </ProductGrid>
  );
}

function FrequentlyAskedQuestions() {
  return (
    <article className="grid lg:col-span-2">
      <HorizontalPadding variant={HorizontalPadding.variant.GREEN}>
        <div className="py-8">
          <h2 className="space-y-3">
            <span className="inline-block px-4 -mx-4 text-3xl font-bold leading-loose uppercase text-green-dark bg-yellow">
              Frequently Asked
            </span>
            <br />
            <span className="inline-block px-4 -mx-4 text-3xl font-bold leading-loose uppercase text-green-dark bg-yellow">
              Questions
            </span>
          </h2>
          <h3 className="mt-5 font-bold leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna.
          </h3>
          <div className="mt-5 prose text-white">
            <dl className="space-y-5">
              <div>
                <dt className="font-bold">1. Lorem ipsum dolor sit?</dt>
                <dd>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat....{' '}
                  <a href="#" style={{ color: '#ffffff' }} className="italic">
                    read more
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-bold">
                  2. Lorem ipsum est sit dolor sed magna sit?
                </dt>
                <dd>
                  Ut enim ad minim veniam, quis nostrud exercitation ullanco
                  laboris nisi ut aliquip ex ea commodo consequat....{' '}
                  <a href="#" style={{ color: '#ffffff' }} className="italic">
                    read more
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-5">
            <Link href="/pages/faq/">
              <a className="bg-white cta text-green-dark">More FAQs</a>
            </Link>
          </div>
        </div>
      </HorizontalPadding>
    </article>
  );
}

function DeliverySchedule() {
  return (
    <article className="relative grid items-end lg:col-span-3">
      <Image
        src="https://burst.shopifycdn.com/photos/red-apple-against-white-background.jpg?width=1000&amp;format=pjpg&amp;exif=0&amp;iptc=0"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <HorizontalPadding>
        <div className="relative py-8">
          <h2 className="space-y-3">
            <span className="inline-block px-4 text-3xl font-bold leading-loose uppercase text-green-dark bg-yellow">
              Check Out Our
            </span>
            <br />
            <span className="inline-block px-4 text-3xl font-bold leading-loose uppercase text-green-dark bg-yellow">
              Delivery Schedule
            </span>
          </h2>
          <div className="mt-5">
            <Link href="/pages/delivery-schedule/">
              <a className="cta">Find Out More</a>
            </Link>
          </div>
        </div>
      </HorizontalPadding>
    </article>
  );
}

async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query ShopifyQuery {
        specials: collectionByHandle(handle: "specials") {
          products(first: 8, sortKey: CREATED) {
            edges {
              node {
                handle
                id
                images(first: 1) {
                  edges {
                    node {
                      altText
                      id
                      originalSrc
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                  }
                }
                title
                variants(first: 1) {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            }
          }
        }
        bestSellingFruit: products(
          first: 4
          sortKey: BEST_SELLING
          query: "product_type:Fruit, available_for_sale:true"
        ) {
          edges {
            node {
              handle
              id
              images(first: 1) {
                edges {
                  node {
                    altText
                    id
                    originalSrc
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              title
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
        bestSellingVegetables: products(
          first: 2
          sortKey: BEST_SELLING
          query: "product_type:Vegetables, available_for_sale:true"
        ) {
          edges {
            node {
              handle
              id
              images(first: 1) {
                edges {
                  node {
                    altText
                    id
                    originalSrc
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              title
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
        bestSellingBoxes: products(
          first: 2
          sortKey: BEST_SELLING
          query: "product_type:Pre-Packed Boxes, available_for_sale:true"
        ) {
          edges {
            node {
              handle
              id
              images(first: 1) {
                edges {
                  node {
                    altText
                    id
                    originalSrc
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              title
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `,
    context: {
      clientName: 'SHOPIFY',
    },
  });

  const carouselSlides = await getAllSlides();

  return {
    props: {
      bestSellingBoxes: data.bestSellingBoxes,
      bestSellingFruit: data.bestSellingFruit,
      bestSellingVegetables: data.bestSellingVegetables,
      carouselSlides,
      specials: data.specials.products,
    },
    revalidate: 60,
  };
}

export { HomePage as default, getStaticProps };
