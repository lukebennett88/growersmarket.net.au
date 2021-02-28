import { LineItem } from '@components/line-item';
import { useCartItems } from '@lib/hooks/use-cart-items';

function ProductSummary(): React.ReactElement {
  const lineItems = useCartItems();
  return (
    <ul className="grid gap-8 mt-12">
      {lineItems.map(
        (lineItem) =>
          lineItem.variant && <LineItem key={lineItem.id} lineItem={lineItem} />
      )}
    </ul>
  );
}

export { ProductSummary };
