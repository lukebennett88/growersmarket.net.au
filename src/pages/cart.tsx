import {
  Breadcrumbs,
  Carousel,
  Container,
  HorizontalPadding,
  QuantityPicker,
  TopSellingProducts,
} from '@components/index';
import { useRemoveItemFromCart } from '@lib/hooks/use-remove-item-from-cart';
import { useUpdateItemQuantity } from '@lib/hooks/use-update-item-quantity';
import {
  getSiteNavigation,
  getSiteSettings,
  getTopSelling,
  ITopSellingProducts,
  useCart,
  useCartCount,
  useCartItems,
} from '@lib/index';
import Image from 'next/image';
import Link from 'next/link';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { NextSeo } from 'next-seo';
import * as React from 'react';

function CartPage({ topSelling }: { topSelling: ITopSellingProducts }) {
  const count = useCartCount();
  const [step, setStep] = React.useState(3);
  const authUser = useAuthUser();
  return (
    <>
      <NextSeo title="Cart" />
      <Carousel />
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
              {step === 3 && <Delivery />}
              {step === 4 && <ConfirmOrder />}
            </HorizontalPadding>
          </div>
          <TopSellingProducts topSelling={topSelling} />
        </div>
      </Container>
    </>
  );
}

function Summary({ setStep }) {
  const cart = useCart();
  const nextStep = () => setStep(2);
  return (
    <>
      <ProductSummary />
      <dl className="grid mt-16 gap-y-2">
        <div className="flex justify-between">
          <dt className="font-bold">Subtotal:</dt>
          <dd>${Number(cart?.totalPrice || 0).toFixed(2)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-bold">Shipping:</dt>
          <dd>Calculated at checkout</dd>
        </div>
      </dl>
      <div className="flex justify-between mt-16">
        <Link href="/">
          <a className="inline-flex items-center space-x-2 cta text-green-dark bg-yellow">
            <svg
              aria-hidden
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 -ml-3"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Continue Shopping
          </a>
        </Link>

        <button
          type="button"
          onClick={nextStep}
          className="inline-flex items-center space-x-2 cta text-green-dark bg-yellow"
        >
          Next Step
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 -mr-3"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

function ProductSummary() {
  const lineItems = useCartItems();
  return (
    <ul className="grid gap-8 mt-12">
      {lineItems.map((lineItem) => (
        <LineItem key={lineItem.id} lineItem={lineItem} />
      ))}
    </ul>
  );
}

function LineItem({ lineItem }) {
  // Variant to add to cart
  const variantId = lineItem.variant.id;

  // Number of items in cart
  const [quantity, setQuantity] = React.useState<number>(lineItem.quantity);

  // Increment quantity
  const decrement = (): void => {
    if (quantity > 0) {
      setQuantity((prevQty) => prevQty - 1);
    }
  };

  // Decrement quantity
  const increment = (): void => setQuantity((prevQty) => prevQty + 1);

  const removeFromCart = useRemoveItemFromCart();
  const updateQuantity = useUpdateItemQuantity();

  React.useEffect(() => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    updateQuantity(variantId, quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantId, quantity]);

  return (
    <li key={lineItem.id} className="grid max-w-md grid-cols-2 gap-4">
      <div className="bg-white">
        {lineItem.variant.image?.src && (
          <Link href={`/products/${lineItem.variant.product.handle as string}`}>
            <a aria-hidden tabIndex={-1} className="block bg-white">
              <Image
                src={lineItem.variant.image.src}
                height={360}
                width={480}
                layout="responsive"
                alt=""
                className="object-cover"
              />
            </a>
          </Link>
        )}
      </div>
      <div className="flex flex-col col-start-2">
        <div className="font-bold">
          <Link href={`/products/${lineItem.variant.product.handle as string}`}>
            <a className="block">
              <h3 className="text-sm">{lineItem.title}</h3>
            </a>
          </Link>
          <div className="text-2xl">
            <sup className="text-sm">$</sup>
            <span>{Number(lineItem.variant.price).toFixed(2)}</span>
          </div>
        </div>
        <div className="pt-4 mt-auto">
          <QuantityPicker
            increment={increment}
            decrement={decrement}
            quantity={quantity}
            showDelete
          />
        </div>
      </div>
    </li>
  );
}

interface IStep {
  children: React.ReactNode;
  index: number;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function Step({ index, children, step, setStep }: IStep) {
  return (
    <li className="relative grid">
      <button
        type="button"
        onClick={() => setStep(index)}
        className={`px-3 py-4 relative focus:z-10 ${
          step === index
            ? 'bg-green-dark text-white font-bold'
            : 'bg-gray-light'
        }`}
      >
        {children}
      </button>
    </li>
  );
}

function ProgressIndicator({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <ol className="grid mt-4 text-center sm:grid-cols-4">
      <Step index={1} step={step} setStep={setStep}>
        1. Summary
      </Step>
      <Step index={2} step={step} setStep={setStep}>
        2. Login
      </Step>
      <Step index={3} step={step} setStep={setStep}>
        3. Delivery
      </Step>
      <Step index={4} step={step} setStep={setStep}>
        4. Confirm Order
      </Step>
    </ol>
  );
}

interface ILogin {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  authUser: Record<string, unknown>;
}

function Login({ setStep, authUser }: ILogin) {
  if (authUser.clientInitialized && authUser.email) {
    setStep(3);
  }
  // if (authUser.client)
  return (
    <>
      <div>Login</div>
    </>
  );
}

function Delivery() {
  const [active, setActive] = React.useState('');
  const [deliveryArea, setDeliveryArea] = React.useState('');
  return (
    <div className="grid gap-8">
      {/* Delivery or Pick Up */}
      <div className="bg-gray-light">
        <h2 className="py-4 font-bold text-center">Delivery or Pick Up?</h2>
        <div className="grid grid-cols-2 px-8 py-4 text-center border-t gap-y-4 gap-x-8">
          <button
            type="button"
            onClick={() => setActive('PICKUP')}
            className={`p-4 border rounded ${
              active === 'PICKUP' ? 'bg-green-dark text-white' : 'bg-white'
            }`}
          >
            <h3 className="font-bold">Pick Up</h3>
            <p>($15 minimum spend)</p>
          </button>
          <button
            type="button"
            onClick={() => setActive('DELIVERY')}
            className={`p-4 border rounded ${
              active === 'DELIVERY' ? 'bg-green-dark text-white' : 'bg-white'
            }`}
          >
            <h3 className="font-bold">Delivery</h3>
            <p>($40 minimum spend)</p>
          </button>
        </div>
      </div>
      {/* Your Address */}
      {active === 'DELIVERY' && (
        <div className="bg-gray-light">
          <h2 className="py-4 font-bold text-center">Your Address</h2>
          <div className="grid px-8 py-4 text-center border-t gap-y-4 gap-x-8">
            <button
              type="button"
              onClick={() => setDeliveryArea('PORT_MACQUARIE')}
              className={`p-4 border rounded ${
                deliveryArea === 'PORT_MACQUARIE'
                  ? 'bg-green-dark text-white'
                  : 'bg-white'
              }`}
            >
              <h3 className="font-bold">Port Macquarie</h3>
              <p>Monday, Tuesday, Wednesday, Thursday, Friday</p>
              <p>Please place your order before 10am for same day delivery.</p>
            </button>
            <button
              type="button"
              onClick={() => setDeliveryArea('WAUCHOPE')}
              className={`p-4 border rounded ${
                deliveryArea === 'WAUCHOPE'
                  ? 'bg-green-dark text-white'
                  : 'bg-white'
              }`}
            >
              <h3 className="font-bold">Wauchope</h3>
              <p>Monday, Wednesday, Friday</p>
              <p>Please place your order before 10am for same day delivery.</p>
            </button>
            <button
              type="button"
              onClick={() => setDeliveryArea('LAURIETON')}
              className={`p-4 border rounded ${
                deliveryArea === 'LAURIETON'
                  ? 'bg-green-dark text-white'
                  : 'bg-white'
              }`}
            >
              <h3 className="font-bold">
                Laurieton / Lake Cathie / North Haven / Bonny Hills
              </h3>
              <p>Tuesday and Friday</p>
              <p>Please place your order before 10am for same day delivery.</p>
            </button>
            <button
              type="button"
              onClick={() => setDeliveryArea('KEMPSEY')}
              className={`p-4 border rounded ${
                deliveryArea === 'KEMPSEY'
                  ? 'bg-green-dark text-white'
                  : 'bg-white'
              }`}
            >
              <h3 className="font-bold">Kempsey/Crescent Head</h3>
              <p>Friday</p>
              <p>Please place your order before 10am for same day delivery.</p>
            </button>
            <button
              type="button"
              onClick={() => setDeliveryArea('LORD_HOWE_ISLAND')}
              className={`p-4 border rounded ${
                deliveryArea === 'LORD_HOWE_ISLAND'
                  ? 'bg-green-dark text-white'
                  : 'bg-white'
              }`}
            >
              <h3 className="font-bold">Lord Howe Island</h3>
              <p>Monday, Tuesday, Wednesday, Thursday, Friday</p>
              <p>Please place your order before 10am for same day delivery.</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ConfirmOrder() {
  return (
    <>
      <div>Confirm Order</div>
    </>
  );
}

const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
})(async ({ AuthUser }) => {
  const siteNavigation = await getSiteNavigation();
  const siteSettings = await getSiteSettings();
  const topSelling = await getTopSelling({
    query: `available_for_sale:true`,
  });

  return {
    props: {
      siteNavigation,
      siteSettings,
      topSelling,
    },
  };
});

export { getServerSideProps };
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(CartPage);
