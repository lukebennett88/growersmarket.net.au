import { Carousel } from '@components/carousel';
import { Container } from '@components/container';
import { HorizontalPadding } from '@components/horizontal-padding';
import { ProductCard } from '@components/product-card';
import { ProductGrid } from '@components/product-grid';
import { getAllFAQs } from '@lib/get-all-faqs';
import { getAllSlides } from '@lib/get-all-slides';
import { getBottomCta, IBottomCta } from '@lib/get-bottom-cta';
import { getHomepageSpecials } from '@lib/get-homepage-specials';
import { getHomepageTopSellingBoxes } from '@lib/get-homepage-top-selling-boxes';
import { getHomepageTopSellingFruit } from '@lib/get-homepage-top-selling-fruit';
import { getHomepageTopSellingVegetables } from '@lib/get-homepage-top-selling-vegetables';
import { configuredSanityClient } from '@lib/sanity-client';
import SanityBlockContent from '@sanity/block-content-to-react';
import Image from 'next/image';
import Link from 'next/link';
import { useNextSanityImage } from 'next-sanity-image';
import { NextSeo } from 'next-seo';
import * as React from 'react';
import siteSettings from 'studio/schemas/siteSettings';

function HomePage({
  bottomCta,
  carouselSlides,
  faqs,
  specials,
  topSellingBoxes,
  topSellingFruit,
  topSellingVegetables,
}) {
  return (
    <>
      <NextSeo title="Home" />
      <h1 className="sr-only">{siteSettings.title}</h1>
      <Carousel slides={carouselSlides} />
      <div className="grid gap-12 pb-12 lg:grid-cols-2">
        <ThisWeeksSpecials products={specials.edges} />
        <TopSellingFruit products={topSellingFruit.edges} />
        <div className="col-span-full">
          <Container>
            <div className="grid gap-12 mx-auto lg:grid-cols-2">
              <TopSellingVegetables products={topSellingVegetables.edges} />
              <TopSellingBoxes products={topSellingBoxes.edges} />
            </div>
            <div className="grid gap-12 mt-12 lg:grid-cols-5">
              <FrequentlyAskedQuestions faqs={faqs} />
              <DeliverySchedule bottomCta={bottomCta} />
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

function DeliverySchedule({ bottomCta }: { bottomCta: IBottomCta }) {
  const { backgroundImage, ctaLabel, ctaSlug, heading } = bottomCta;
  const { src, loader } = useNextSanityImage(
    configuredSanityClient,
    backgroundImage.asset
  );
  return (
    <article className="relative grid items-end lg:col-span-3">
      <Image
        loader={loader}
        src={src}
        layout="fill"
        objectFit="cover"
        sizes="(min-width: 1920px) 1920px, 100vw"
        alt={backgroundImage?.altText || ''}
      />
      <HorizontalPadding>
        <div className="relative py-8">
          <h2 className="space-y-3">
            {heading.map((line, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={index}>
                <span className="inline-block px-4 text-3xl font-bold leading-loose uppercase text-green-dark bg-yellow">
                  {line}{' '}
                </span>
                {index !== heading.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          {ctaSlug && ctaLabel && (
            <div className="mt-5">
              <Link href={ctaSlug}>
                <a className="cta">{ctaLabel}</a>
              </Link>
            </div>
          )}
        </div>
      </HorizontalPadding>
    </article>
  );
}

async function getStaticProps() {
  const topSellingFruit = await getHomepageTopSellingFruit();
  const topSellingVegetables = await getHomepageTopSellingVegetables();
  const specials = await getHomepageSpecials();
  const topSellingBoxes = await getHomepageTopSellingBoxes();

  const carouselSlides = await getAllSlides();
  const allFaqs = await getAllFAQs();
  const faqs = await allFaqs.slice(0, 2);
  const bottomCta = await getBottomCta();

  return {
    props: {
      bottomCta,
      carouselSlides,
      faqs,
      specials,
      topSellingBoxes,
      topSellingFruit,
      topSellingVegetables,
    },
    revalidate: 1,
  };
}

export { HomePage as default, getStaticProps };
