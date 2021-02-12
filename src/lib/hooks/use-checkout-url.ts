import { useShopifyContext } from '@lib/shopify-context';

export function useCheckoutUrl(): string | null {
  const { cart } = useShopifyContext();
  if (cart == null) {
    return null;
  }

  return cart.webUrl;
}
