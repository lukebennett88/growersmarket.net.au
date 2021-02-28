import 'typeface-montserrat';
import 'intersection-observer';
import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { Layout } from '@components/layout';
import { apolloClient } from '@lib/apollo-client';
import { initAuth } from '@lib/init-auth';
import { ShopifyContextProvider } from '@lib/shopify-context';
import * as Sentry from '@sentry/node';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import * as React from 'react';

import siteSettings from '../data/site-settings.json';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

initAuth();

type TAppProps = AppProps & { err: any };

function App({ Component, pageProps, err }: TAppProps) {
  // Workaround for https://github.com/vercel/next.js/issues/8592
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
        </Head>
        <Layout>
          <Component {...pageProps} err={err} />
        </Layout>
      </ApolloProvider>
    </ShopifyContextProvider>
  );
}

export default App;
