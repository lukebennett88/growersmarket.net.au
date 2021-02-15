import { ContactForm } from '@components/contact-form';
import {
  Breadcrumbs,
  Carousel,
  Container,
  DeliverySchedule,
  HorizontalPadding,
  TopSellingProducts,
} from '@components/index';
import { getTopSelling } from '@lib/index';
import { config } from 'config';
import { GetStaticPropsResult } from 'next';
import { NextSeo } from 'next-seo';
import * as React from 'react';

function ContactPage({ topSelling }): React.ReactElement {
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
      <Carousel />
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
                        <a href={`tel:${config.phone}`} className="underline">
                          {config.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="inline font-bold">Fax: </dt>
                      <dd className="inline">{config.fax}</dd>
                    </div>
                    <div>
                      <dt className="inline font-bold">Address: </dt>
                      <dd className="inline">
                        <a
                          href={config.address.googleMaps.link}
                          className="underline"
                        >
                          {config.address.line1}, {config.address.line2}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="inline font-bold">Hours: </dt>
                      <dd className="inline">
                        {config.hours.weekdays} <br />
                        {config.hours.weekends}
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
}

async function getStaticProps(): Promise<
  GetStaticPropsResult<ContactPageProps>
> {
  const topSelling = await getTopSelling({
    query: 'available_for_sale:true',
  });

  return {
    props: {
      topSelling,
    },
    revalidate: 60,
  };
}

export { ContactPage as default, getStaticProps };
