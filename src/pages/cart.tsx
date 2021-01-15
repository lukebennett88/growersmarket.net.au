import { NextSeo } from 'next-seo';

import { getSiteNavigation, getSiteSettings, useCartCount } from '@lib/index';

function CartPage() {
  const count = useCartCount();
  return (
    <>
      <NextSeo title="Success" />
      <article className="py-48 space-y-6 text-center">
        <h1 className="text-2xl font-bold">Cart</h1>
        <dl>
          <dt>Items in cart: </dt>
          <dd>{count}</dd>
        </dl>
      </article>
    </>
  );
}

async function getStaticProps() {
  const siteNavigation = await getSiteNavigation();
  const siteSettings = await getSiteSettings();

  return {
    props: {
      siteNavigation,
      siteSettings,
    },
    revalidate: 60,
  };
}

export { CartPage as default, getStaticProps };
