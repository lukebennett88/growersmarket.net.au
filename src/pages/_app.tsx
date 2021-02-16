import 'typeface-montserrat';
import 'intersection-observer';
import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { Layout } from '@components/layout';
import { apolloClient, ShopifyContextProvider } from '@lib/index';
import { initAuth } from '@lib/init-auth';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import { config } from '../../config';
// import defaultSeoImage from './growers-market.jpg';

initAuth();

function App({ Component, pageProps }: AppProps) {
  // console.log(defaultSeoImage);
  return (
    <ShopifyContextProvider
      shopName={process.env.NEXT_PUBLIC_SHOPIFY_SHOP_NAME}
      accessToken={process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN}
    >
      <ApolloProvider client={apolloClient}>
        <DefaultSeo
          titleTemplate={`%s | ${config.title}`}
          description={config.description}
          openGraph={{
            type: 'website',
            locale: 'en_AU',
            url: config.siteUrl,
            site_name: config.title,
            images: [{ url: '/growers-market.jpg' }],
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
