import 'typeface-montserrat';
import 'intersection-observer';
import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { Layout } from '@components/layout';
import { apolloClient } from '@lib/apollo-client';
import { initAuth } from '@lib/init-auth';
import { ShopifyContextProvider } from '@lib/shopify-context';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import * as React from 'react';

import siteSettings from '../data/site-settings.json';

initAuth();

function App({ Component, pageProps }: AppProps) {
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
