import { useCartContext } from '@lib/cart-context';
import Link from 'next/link';
import * as React from 'react';

function PaginationLinks() {
  return (
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
      <NextStepButton />
    </div>
  );
}

function NextStepButton() {
  const { state, setState } = useCartContext();

  if (state.deliveryMethod === '') {
    return null;
  }

  if (state.deliveryMethod === 'Pickup' && state.pickupTime === '') {
    return null;
  }

  if (
    state.deliveryMethod === 'Delivery' &&
    state.deliveryDate === '' &&
    state.deliveryZone !== 'Lord Howe Island'
  ) {
    return null;
  }

  if (
    state.deliveryMethod === 'Delivery' &&
    state.deliveryZone === 'Lord Howe Island' &&
    state.shippingType === ''
  ) {
    return null;
  }

  const nextStep = () => setState((prevState) => ({ ...prevState, step: 3 }));

  return (
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
  );
}

export { PaginationLinks };
