import { CartContent } from '@components/cart/cart-content';
import {
  Breadcrumbs,
  Carousel,
  Container,
  HorizontalPadding,
  TopSellingProducts,
} from '@components/index';
import { CartContextProvider } from '@lib/cart-provider';
import {
  getAllSlides,
  getTopSelling,
  ISlide,
  ITopSellingProducts,
  useCartCount,
} from '@lib/index';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { NextSeo } from 'next-seo';
import * as React from 'react';

function CartPage({
  topSelling,
  carouselSlides,
}: {
  topSelling: ITopSellingProducts;
  carouselSlides: Array<ISlide>;
}): React.ReactElement {
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
        <div className="relative grid lg:grid-cols-3">
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
  whenUnauthedBeforeInit: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.RENDER,
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
})(CartPage);
