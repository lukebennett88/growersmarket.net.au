import { Breadcrumbs } from '@components/breadcrumbs';
import { Carousel } from '@components/carousel';
import { CartContent } from '@components/cart/cart-content';
import { Container } from '@components/container';
import { HorizontalPadding } from '@components/horizontal-padding';
import { TopSellingProducts } from '@components/top-selling-products';
import { CartContextProvider } from '@lib/cart-context';
import { getAllSlides, ISlide } from '@lib/get-all-slides';
import { getTopSelling, ITopSellingProducts } from '@lib/get-top-selling';
import { useCartCount } from '@lib/hooks/use-cart-count';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { NextSeo } from 'next-seo';
import * as React from 'react';

interface ICartPage {
  topSelling: ITopSellingProducts;
  carouselSlides: Array<ISlide>;
}

function CartPage({
  topSelling,
  carouselSlides,
}: ICartPage): React.ReactElement {
  const count = useCartCount();

  const [cartCount, setCartCount] = React.useState('is empty');

  React.useEffect(() => {
    if (count > 0) {
      setCartCount(
        `contains ${count as number} ${count === 1 ? 'product' : 'products'}`
      );
    }
  }, [count]);

  return (
    <>
      <NextSeo title="Cart" />
      <Carousel slides={carouselSlides} />
      <Breadcrumbs
        navigation={[
          {
            title: 'Cart',
            handle: 'cart',
          },
        ]}
      />
      <Container>
        <div className="relative z-0 grid lg:grid-cols-3">
          <div className="py-16 lg:col-span-2">
            <HorizontalPadding>
              <h1 className="text-2xl font-bold">Checkout</h1>
              <p>
                Your shopping cart <strong>{cartCount}</strong>
              </p>
              <CartContextProvider>
                <CartContent />
              </CartContextProvider>
            </HorizontalPadding>
          </div>
          <TopSellingProducts topSelling={topSelling} />
        </div>
      </Container>
    </>
  );
}

const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.RENDER,
  whenUnauthed: AuthAction.RENDER,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
})(async ({ AuthUser }) => {
  const topSelling = await getTopSelling({
    query: `available_for_sale:true`,
  });
  const carouselSlides = await getAllSlides();

  return {
    props: {
      topSelling,
      carouselSlides,
    },
  };
});

export { getServerSideProps };
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  // @ts-ignore // TODO: fix this warning caused by newly added types in `next-firebase-auth`
})(CartPage);
