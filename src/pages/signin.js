import { providers, signIn, signOut, useSession } from 'next-auth/client';

import { HorizontalPadding } from '@components/index';
import { SignInIcon } from '@components/vectors';
import { getSiteNavigation, getSiteSettings } from '@lib/index';
import Head from 'next/head';

function SignInPage({ providers }) {
  const [session] = useSession();
  return (
    <HorizontalPadding>
      <Head><title>Sign {session ? 'out' : "in"}</title></Head>
      <div className="py-24">
        <div className="flex items-center justify-center space-x-6">
          <SignInIcon className="w-16" />
          <h1 className="text-2xl font-bold">{session ? "Sign out of your account" : "Log into your account"}</h1>
        </div>
        <div className="mt-4 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="space-y-4">
            {session ? (
              <button
              onClick={() => signOut()}
              className="w-full bg-white border cta border-green-dark text-green-dark"
            >
              Sign out
            </button>
            ) : Object.values(providers).map((provider) => (
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
  const siteNavigation = await getSiteNavigation();
  const siteSettings = await getSiteSettings();
  return {
    providers: await providers(context),
    siteNavigation,
    siteSettings,
  };
};

export { SignInPage as default };
