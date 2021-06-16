/* eslint-disable unicorn/consistent-function-scoping */
import 'typeface-montserrat';
import 'intersection-observer';
import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { Layout } from '@components/layout';
import { apolloClient } from '@lib/apollo-client';
import * as gtag from '@lib/gtag';
import { ShopifyContextProvider } from '@lib/shopify-context';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import * as React from 'react';

import siteSettings from '../data/site-settings.json';

LogRocket.init('uelrcs/growers-market');
setupLogRocketReact(LogRocket);

function App({ Component, pageProps }: AppProps) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1,
  });

  const router = useRouter();
  React.useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ShopifyContextProvider
      shopName={process.env.NEXT_PUBLIC_SHOPIFY_SHOP_NAME}
      accessToken={process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN}
    >
      <ApolloProvider client={apolloClient}>
        <DefaultSeo
          titleTemplate={`%s | ${siteSettings.title}`}
          description={siteSettings.description}
          openGraph={{
            type: 'website',
            locale: 'en_AU',
            url: siteSettings.siteUrl,
            site_name: siteSettings.title,
            images: [{ url: siteSettings.shareImage.asset.url }],
          }}
        />
        <Head>
          <link rel="preconnect" href="https://cdn.sanity.io" />
          <link rel="preconnect" href="https://vitals.vercel-insights.com" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ShopifyContextProvider>
  );
}

export default App;
