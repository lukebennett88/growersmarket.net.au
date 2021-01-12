import { providers, signIn } from 'next-auth/client';

import { HorizontalPadding } from '@components/index';
import { SignInIcon } from '@components/vectors';
import { apolloClient } from '@lib/index';
import { SANITY_DATA } from '@queries/index';

function SignInPage({ providers }) {
  return (
    <HorizontalPadding>
      <div className="py-24">
        <div className="flex items-center justify-center space-x-6">
          <SignInIcon className="w-16" />
          <h1 className="text-2xl font-bold">Log into your account</h1>
        </div>
        <div className="mt-4 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="space-y-4">
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id)}
                  className="w-full bg-white border cta border-green-dark text-green-dark"
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HorizontalPadding>
  );
}

SignInPage.getInitialProps = async (context) => {
  const sanityData = await apolloClient.query({
    query: SANITY_DATA,
    context: {
      clientName: 'SANITY',
    },
  });
  return {
    providers: await providers(context),
    siteNavigation: sanityData.data.SiteNavigation,
    siteSettings: sanityData.data.SiteSettings,
  };
};

export { SignInPage as default };
