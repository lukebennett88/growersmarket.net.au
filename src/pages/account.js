import { HorizontalPadding } from '@components/index';
import { NextSeo } from 'next-seo';

import { SignInIcon } from '@components/vectors';
import { getSiteNavigation, getSiteSettings } from '@lib/index';

function AccountPage() {
  return (
    <HorizontalPadding>
      <NextSeo title={`Sign in`} />
      <div className="py-24">
        <div className="flex items-center justify-center space-x-6">
          <SignInIcon className="w-16" />
          <h1 className="text-2xl font-bold">Log into your account</h1>
        </div>
        <div className="mt-4 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="space-y-4">
            <button
              type="button"
              className="w-full bg-white border cta border-green-dark text-green-dark"
            >
              Sign in
            </button>
          </div>
        </div>
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
