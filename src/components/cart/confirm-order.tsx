import { useCartContext } from '@lib/cart-provider';
import { useCart } from '@lib/hooks/use-cart';
import { useCheckoutUrl } from '@lib/hooks/use-checkout-url';
import dayjs from 'dayjs';
import Link from 'next/link';

import { ProductSummary } from './product-summary';

function ConfirmOrder({ authUser }): React.ReactElement {
  const { state, setState } = useCartContext();

  if (!authUser.clientInitialized || !authUser.email) {
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

  const checkout = useCheckoutUrl();

  const cart = useCart();

  const handleChange = (event) =>
    setState((prevState) => ({
      ...prevState,
      customerNotes: event.target.value,
    }));

  console.log(state);

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
          <dd>${Number(cart?.totalPrice || 0).toFixed(2)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-bold">Shipping:</dt>
          <dd>${state.deliveryMethod === 'Delivery' ? '15.00' : '0.00'}</dd>
        </div>
      </dl>
      <h2 className="mt-16 text-xl font-bold text-green-dark">Notes</h2>
      <label htmlFor="notes">
        <span className="sr-only">Order notes</span>
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
        <a
          href={checkout}
          className="inline-flex items-center space-x-2 cta text-green-dark bg-yellow"
        >
          Checkout
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
        </a>
      </div>
    </>
  );
}

export { ConfirmOrder };
