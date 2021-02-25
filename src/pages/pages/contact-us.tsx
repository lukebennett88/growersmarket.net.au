import { Breadcrumbs } from '@components/breadcrumbs';
import { Carousel } from '@components/carousel';
import { ContactForm } from '@components/contact-form';
import { Container } from '@components/container';
import { DeliverySchedule } from '@components/delivery-schedule';
import { HorizontalPadding } from '@components/horizontal-padding';
import { TopSellingProducts } from '@components/top-selling-products';
import { getAllSlides, ISlide } from '@lib/get-all-slides';
import { getTopSelling } from '@lib/get-top-selling';
import { GetStaticPropsResult } from 'next';
import { NextSeo } from 'next-seo';
import * as React from 'react';

import siteSettings from '../../data/site-settings.json';

function ContactPage({ topSelling, carouselSlides }): React.ReactElement {
  // Navigation array from Breadcrumbs
  const navigation = [
    {
      title: 'Contact Us',
      handle: 'pages/contact-us',
    },
  ];

  return (
    <>
      <NextSeo title="Contact Us" />
      <Carousel slides={carouselSlides} />
      <Breadcrumbs navigation={navigation} />
      <Container>
        <div className="relative grid lg:grid-cols-3">
          <div className="py-16 lg:col-span-2">
            <HorizontalPadding>
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h1 className="text-2xl font-bold">Send a Message</h1>
                  <div className="-mt-6">
                    <ContactForm />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Contact Us</h1>
                  <dl className="mt-2 space-y-2">
                    <div>
                      <dt className="inline font-bold">Phone: </dt>
                      <dd className="inline">
                        <a
                          href={`tel:${siteSettings.phoneNumber}`}
                          className="underline"
                        >
                          {siteSettings.phoneNumber}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="inline font-bold">Fax: </dt>
                      <dd className="inline">{siteSettings.faxNumber}</dd>
                    </div>
                    <div>
                      <dt className="inline font-bold">Address: </dt>
                      <dd className="inline">
                        <a
                          href={siteSettings.address.googleMaps.link}
                          className="underline"
                        >
                          {siteSettings.address.streetAddress},{' '}
                          {siteSettings.address.suburb}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="inline font-bold">Hours: </dt>
                      <dd className="inline">
                        {siteSettings.hours.map(({ days, hours }, index) => (
                          <React.Fragment key={days}>
                            {days}: {hours}
                            {index !== siteSettings.hours.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
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

// TODO: Type this properly
interface ContactPageProps {
  topSelling: [];
  carouselSlides: Array<ISlide>;
}

async function getStaticProps(): Promise<
  GetStaticPropsResult<ContactPageProps>
> {
  const topSelling = await getTopSelling({
    query: 'available_for_sale:true',
  });

  const carouselSlides = await getAllSlides();

  return {
    props: {
      topSelling,
      carouselSlides,
    },
    revalidate: 60,
  };
}

export { ContactPage as default, getStaticProps };
