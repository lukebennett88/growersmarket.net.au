import { useShopifyContext } from '../shopify-context';

export function useCart() {
  const { cart } = useShopifyContext();
  return cart;
}
