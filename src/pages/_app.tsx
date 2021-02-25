import 'typeface-montserrat';
import 'intersection-observer';
import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { Layout } from '@components/layout';
import { apolloClient } from '@lib/apollo-client';
import { initAuth } from '@lib/init-auth';
import { ShopifyContextProvider } from '@lib/shopify-context';
import { AppProps } from 'next/app';
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ShopifyContextProvider>
  );
}

export default App;
