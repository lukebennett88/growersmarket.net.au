import { useCartContext } from '@lib/cart-context';
import { useCart } from '@lib/hooks/use-cart';
import Link from 'next/link';

import { ProductSummary } from './product-summary';

function Summary(): React.ReactElement {
  const { setState } = useCartContext();

  const cart = useCart();

  const nextStep = () => setState((prevState) => ({ ...prevState, step: 2 }));

  const cartTotal = Number(cart?.totalPrice || 0).toFixed(2);

  return (
    <>
      <ProductSummary />
      <dl className="grid mt-16 gap-y-2">
        <div className="flex justify-between">
          <dt className="font-bold">Subtotal:</dt>
          <dd>${cartTotal}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-bold">Shipping:</dt>
          <dd>Calculated at checkout</dd>
        </div>
        {Number(cartTotal) < 15 ? (
          <div className="flex justify-between text-red">
            <dt className="font-bold">Warning:</dt>
            <dd>Minimum order amount is $15.00</dd>
          </div>
        ) : null}
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
        {Number(cartTotal) >= 15 ? (
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
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export { Summary };
