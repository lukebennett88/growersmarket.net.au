import { useShopifyContext } from '../shopify-context';

export function useCartItems() {
  const { cart } = useShopifyContext();
  if (cart == null || cart.lineItems == null) {
    return [];
  }

  return cart.lineItems;
}
