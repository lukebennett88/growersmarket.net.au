import { LineItem } from '@components/line-item';
import { useCart, useCartItems } from '@lib/index';
import Link from 'next/link';

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

export { Summary };
