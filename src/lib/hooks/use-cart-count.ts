import { useShopifyContext } from '../shopify-context';

export function useCartCount() {
  const { cart } = useShopifyContext();
  if (cart == null || cart.lineItems.length === 0) {
    return 0;
  }

  return cart.lineItems.reduce(
    (totalCount: number, lineItem) =>
      totalCount + (lineItem.quantity as number),
    0
  );
}
