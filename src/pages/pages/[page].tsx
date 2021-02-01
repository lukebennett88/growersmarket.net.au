import { NextSeo } from 'next-seo';
import SanityBlockContent from '@sanity/block-content-to-react';

import {
  Container,
  Breadcrumbs,
  TopSellingProducts,
  DeliverySchedule,
  HorizontalPadding,
  Carousel,
} from '@components/index';
import {
  getAllSanityPages,
  getSanityPage,
  getSiteNavigation,
  getSiteSettings,
  getTopSelling,
} from '@lib/index';

function PageTemplate({ sanityPage, topSelling }) {
  // Navigation array from Breadcrumbs
  const navigation = [
    {
      title: sanityPage.title,
      handle: sanityPage.slug.current,
    },
  ];

  return (
    <>
      <NextSeo title={sanityPage.title} />
      <Carousel />
      <Breadcrumbs navigation={navigation} />
      <Container>
        <div className="relative grid lg:grid-cols-3">
          <div className="py-16 lg:col-span-2">
            <HorizontalPadding>
              <h1 className="text-2xl font-bold">{sanityPage.title}</h1>
              {sanityPage.content.map(({ _key, _type, blockContentRaw }) => {
                return _type === 'richText' ? (
                  <SanityBlockContent
                    key={_key}
                    blocks={blockContentRaw}
                    imageOptions={{ w: 600, fit: 'max' }}
                    renderContainerOnSingleChild
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    className="mt-5 prose"
                  />
                ) : null;
              })}
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
  const pageId = allSanityPages.filter(
    ({ slug }) => slug.current === params.page
  )[0]._id;

  const sanityPage = await getSanityPage({
    id: pageId,
  });

  const topSelling = await getTopSelling({
    query: 'available_for_sale:true',
  });

  const siteNavigation = await getSiteNavigation();
  const siteSettings = await getSiteSettings();

  return {
    props: {
      siteNavigation,
      siteSettings,
      sanityPage,
      topSelling,
    },
    revalidate: 60,
  };
}

export { PageTemplate as default, getStaticPaths, getStaticProps };
