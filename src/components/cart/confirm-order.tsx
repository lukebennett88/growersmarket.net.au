import { useCartContext } from '@lib/cart-provider';
import { useCheckoutUrl } from '@lib/hooks/use-checkout-url';
import { useShopifyContext } from '@lib/shopify-context';
import dayjs from 'dayjs';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import { FaSpinner } from 'react-icons/fa';

import { ProductSummary } from './product-summary';

// eslint-disable-next-line sonarjs/cognitive-complexity
function ConfirmOrder({ authUser }): React.ReactElement {
  const { state, setState } = useCartContext();

  const { cart, client, setCart } = useShopifyContext();

  const cartTotal = Number(cart?.totalPrice || 0).toFixed(2);

  if (Number(cartTotal) < 15) {
    setState((prevState) => ({ ...prevState, step: 1 }));
  }

  if (!authUser?.clientInitialized || !authUser.email) {
    setState((prevState) => ({ ...prevState, step: 2 }));
  }

  if (state.deliveryMethod === '') {
    setState((prevState) => ({ ...prevState, step: 3 }));
  }

  if (state.deliveryMethod === 'Pickup' && state.pickupTime === '') {
    setState((prevState) => ({ ...prevState, step: 3 }));
  }

  if (state.deliveryMethod === 'Delivery' && state.deliveryDate === '') {
    setState((prevState) => ({ ...prevState, step: 3 }));
  }

  const checkoutUrl = useCheckoutUrl();

  const handleChange = (event) =>
    setState((prevState) => ({
      ...prevState,
      customerNotes: event.target.value,
    }));

  const customAttributes =
    state.deliveryMethod === 'Pickup'
      ? [
          {
            key: 'Delivery Method',
            value: state.deliveryMethod,
          },
          {
            key: 'Delivery Date',
            value: state.deliveryDate,
          },
          {
            key: 'Pickup Time',
            value: state.pickupTime,
          },
        ]
      : [
          {
            key: 'Delivery Method',
            value: state.deliveryMethod,
          },
          {
            key: 'Delivery Zone',
            value: state.deliveryZone,
          },
          {
            key: 'Delivery Date',
            value: state.deliveryDate,
          },
        ];

  const checkoutId = cart.id;
  const input = {
    note: state.customerNotes,
    customAttributes,
  };

  const [isLoading, setIsLoading] = React.useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const newCheckout = await client.checkout.updateAttributes(
        checkoutId,
        input
      );
      setCart(newCheckout);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setIsLoading(false);
    } finally {
      Router.push(checkoutUrl);
    }
  };

  const subtotal = Number(cart?.totalPrice || 0);

  const shippingCost =
    state.deliveryMethod === 'Delivery' && Number(cartTotal) < 40 ? 15 : 0;

  return (
    <>
      <h2 className="mt-8 text-xl font-bold text-green-dark">
        {authUser?.firebaseUser?.displayName}
        &rsquo;s Order Details
      </h2>

      <dl className="mt-4 space-y-4">
        <div>
          <dt className="inline font-bold">Delivery or Pick Up? </dt>
          <dd className="inline">{state.deliveryMethod}</dd>
        </div>
        <div>
          <dt className="inline font-bold">Delivering Zone: </dt>
          <dd className="inline">{state.deliveryZone}</dd>
        </div>
        <div>
          <dt className="inline font-bold">
            {state.deliveryMethod === 'Delivery' ? 'Delivery' : 'Pickup'} Date:{' '}
          </dt>
          <dd className="inline">
            {dayjs(state.deliveryDate).format('dddd, Do MMMM')}
          </dd>
        </div>
      </dl>
      <h2 className="mt-16 text-xl font-bold text-green-dark">
        Your Shopping Cart
      </h2>
      <ProductSummary />
      <h2 className="mt-16 text-xl font-bold text-green-dark">Total Costs</h2>
      <dl className="grid mt-16 gap-y-2">
        <div className="flex justify-between">
          <dt className="font-bold">Subtotal:</dt>
          <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-bold">Shipping:</dt>
          <dd className="tabular-nums">${shippingCost.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-bold">Total:</dt>
          <dd className="tabular-nums">
            ${(subtotal + shippingCost).toFixed(2)}
          </dd>
        </div>
      </dl>
      <label htmlFor="notes">
        <h2 className="mt-16 text-xl font-bold text-green-dark">Notes</h2>
        <textarea
          id="notes"
          name="notes"
          value={state.customerNotes}
          onChange={handleChange}
          rows={6}
          className="block w-full mt-2 focus:ring-2 focus:ring-green-dark focus:border-transparent"
        />
      </label>
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
          disabled={isLoading}
          onClick={handleCheckout}
          className={`inline-flex items-center space-x-2 text-green-dark bg-yellow cta${
            isLoading ? ' opacity-75' : ''
          }`}
        >
          Checkout
          {isLoading ? (
            <FaSpinner className="w-5 h-5 ml-2.5 -mr-3 animate-spin opacity-50" />
          ) : (
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
          )}
        </button>
      </div>
    </>
  );
}

export { ConfirmOrder };
