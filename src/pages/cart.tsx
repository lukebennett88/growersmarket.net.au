import { ConfirmOrder } from '@components/cart/confirm-order';
import { Delivery } from '@components/cart/delivery';
import { Login } from '@components/cart/login';
import { ProgressIndicator } from '@components/cart/progress-indicator';
import { Summary } from '@components/cart/summary';
import {
  Breadcrumbs,
  Carousel,
  Container,
  HorizontalPadding,
  TopSellingProducts,
} from '@components/index';
import {
  getAllSlides,
  getTopSelling,
  ISlide,
  ITopSellingProducts,
  useCartCount,
} from '@lib/index';
import {
  AuthAction,
  useAuthUser,
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
}) {
  const count = useCartCount();
  const [step, setStep] = React.useState(1);
  const authUser = useAuthUser();
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
                Your shopping cart{' '}
                <strong>
                  {count > 0
                    ? `contains ${count as number} ${
                        count === 1 ? 'product' : 'products'
                      }`
                    : 'is empty'}
                </strong>
              </p>
              <ProgressIndicator step={step} setStep={setStep} />
              {step === 1 && <Summary setStep={setStep} />}
              {step === 2 && <Login setStep={setStep} authUser={authUser} />}
              {step === 3 && <Delivery setStep={setStep} />}
              {step === 4 && <ConfirmOrder />}
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
