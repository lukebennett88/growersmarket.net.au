import {
  Breadcrumbs,
  Carousel,
  Container,
  DeliverySchedule,
  HorizontalPadding,
  TopSellingProducts,
} from '@components/index';
import {
  getAllSanityPages,
  getAllSlides,
  getSanityPage,
  getTopSelling,
} from '@lib/index';
import SanityBlockContent from '@sanity/block-content-to-react';
import { NextSeo } from 'next-seo';

function PageTemplate({ sanityPage, topSelling, carouselSlides }) {
  // Navigation array from Breadcrumbs
  const navigation = [
    {
      title: sanityPage.title,
      handle: `pages/${sanityPage.slug.current as string}`,
    },
  ];

  return (
    <>
      <NextSeo title={sanityPage.title} />
      <Carousel slides={carouselSlides} />
      <Breadcrumbs navigation={navigation} />
      <Container>
        <div className="relative grid lg:grid-cols-3">
          <div className="py-16 lg:col-span-2">
            <HorizontalPadding>
              <h1 className="text-2xl font-bold">{sanityPage.title}</h1>
              {sanityPage.content.map(({ _key, _type, blockContentRaw }) =>
                _type === 'richText' ? (
                  <SanityBlockContent
                    key={_key}
                    blocks={blockContentRaw}
                    imageOptions={{ w: 600, fit: 'max' }}
                    renderContainerOnSingleChild
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    className="mt-5 prose"
                  />
                ) : null
              )}
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
  const allSanityPages = await getAllSanityPages();
  return {
    paths: allSanityPages.map(({ slug }) => ({
      params: {
        page: slug.current,
      },
    })),
    fallback: false,
  };
}

async function getStaticProps({ params }) {
  const allSanityPages = await getAllSanityPages();
  const pageId = allSanityPages.find(({ slug }) => slug.current === params.page)
    ._id;

  const sanityPage = await getSanityPage({
    id: pageId,
  });

  const topSelling = await getTopSelling({
    query: 'available_for_sale:true',
  });

  const carouselSlides = await getAllSlides();

  return {
    props: {
      carouselSlides,
      sanityPage,
      topSelling,
    },
    revalidate: 60,
  };
}

export { PageTemplate as default, getStaticPaths, getStaticProps };
