/* eslint-disable react/no-danger */
import { GA_TRACKING_ID } from '@lib/gtag';
import { stripIndent } from 'common-tags';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-AU">
        <Head>
          {/* Intersection Observer Polyfill */}
          <Script
            strategy="beforeInteractive"
            src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"
          />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: stripIndent(`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
            `),
            }}
          />
          {/* Userback Feedback Widget */}
          <script
            dangerouslySetInnerHTML={{
              __html: stripIndent(`
                window.Userback = window.Userback || {};
                Userback.access_token = '9958|21405|UOPOAwbQRBy2Qf9CnNIAol5nyC9NXwwF7UjFuniyWu0hPnUM9U';
                (function(d) {
                  var s = d.createElement('script');s.async = true;
                  s.src = 'https://static.userback.io/widget/v1.js';
                  (d.head || d.body).appendChild(s);
                })(document);
              `),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
