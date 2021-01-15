import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { HiChevronLeft } from 'react-icons/hi';

import { getSiteNavigation, getSiteSettings } from '@lib/index';

function SuccessPage() {
  return (
    <>
      <NextSeo title="Success" />
      <article className="py-48 space-y-6 text-center">
        <h1 className="text-2xl font-bold">Success</h1>
        <p>
          Your form has submitted successfully, we will contact you shortly.
        </p>
        <p>
          <Link href="/">
            <a className="inline-flex bg-white border cta text-green-dark border-green-dark">
              <span className="inline-flex items-center justify-center -ml-2 space-x-1 leading-none">
                <HiChevronLeft />
                <span>Return Home</span>
              </span>
            </a>
          </Link>
        </p>
      </article>
    </>
  );
}

async function getStaticProps() {
  const siteNavigation = await getSiteNavigation();
  const siteSettings = await getSiteSettings();

  return {
    props: {
      siteNavigation,
      siteSettings,
    },
    revalidate: 60,
  };
}

export { SuccessPage as default, getStaticProps };
