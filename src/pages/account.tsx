import { HorizontalPadding } from '@components/index';
import { getSiteNavigation, getSiteSettings } from '@lib/index';
import { NextSeo } from 'next-seo';
import * as React from 'react';

function AccountPage() {
  return (
    <HorizontalPadding>
      <NextSeo title="Account" />
      <div className="py-24">
        <h1>Account Page</h1>
      </div>
    </HorizontalPadding>
  );
}

async function getServerSideProps() {
  const siteNavigation = await getSiteNavigation();
  const siteSettings = await getSiteSettings();

  return {
    props: {
      siteNavigation,
      siteSettings,
    },
  };
}

export { AccountPage as default, getServerSideProps };
