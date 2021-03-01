import { LineItem } from '@components/line-item';
import { useCartItems } from '@lib/hooks/use-cart-items';
import * as React from 'react';

function ProductSummary(): React.ReactElement {
  const lineItems = useCartItems();
  return (
    <ul className="grid gap-8 mt-12">
      {lineItems.map((lineItem) =>
        lineItem.variant ? (
          <LineItem key={lineItem.id} lineItem={lineItem} />
        ) : (
          <InvalidLineItem key={lineItem.id} lineItem={lineItem} />
        )
      )}
    </ul>
  );
}

function InvalidLineItem({ lineItem }) {
  return (
    <li>
      <p>{lineItem.title} is out of stock.</p>
      <p>Refresh the page to clear your cart.</p>
    </li>
  );
}

export { ProductSummary };
