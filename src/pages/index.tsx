import { gql } from '@apollo/client';
import {
  Carousel,
  Container,
  HorizontalPadding,
  ProductCard,
  ProductGrid,
} from '@components/index';
import { apolloClient, getAllFAQs, getAllSlides } from '@lib/index';
import SanityBlockContent from '@sanity/block-content-to-react';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

function HomePage({
  faqs,
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
              <FrequentlyAskedQuestions faqs={faqs} />
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

function FrequentlyAskedQuestions({ faqs }) {
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
          <div className="mt-5 prose prose-on-dark">
            <ol>
              {faqs.map(({ id, blockContentRaw }) => (
                <li key={id}>
                  <SanityBlockContent
                    blocks={blockContentRaw}
                    renderContainerOnSingleChild
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    className="mt-5"
                  />
                </li>
              ))}
            </ol>
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
                id
                compareAtPriceRange {
                  minVariantPrice {
                    amount
                  }
                }
                handle
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
              id
              compareAtPriceRange {
                minVariantPrice {
                  amount
                }
              }
              handle
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
              id
              compareAtPriceRange {
                minVariantPrice {
                  amount
                }
              }
              handle
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
              id
              compareAtPriceRange {
                minVariantPrice {
                  amount
                }
              }
              handle
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

  const faqs = await getAllFAQs();

  return {
    props: {
      bestSellingBoxes: data.bestSellingBoxes,
      bestSellingFruit: data.bestSellingFruit,
      bestSellingVegetables: data.bestSellingVegetables,
      carouselSlides,
      specials: data.specials.products,
      faqs: faqs.slice(0, 2),
    },
    revalidate: 60,
  };
}

export { HomePage as default, getStaticProps };
