import { ShopifyBuy } from 'shopify-buy';

import { useCartItems } from './use-cart-items';

export function useGetLineItem() {
  const cartItems = useCartItems();

  function getLineItem(variantId: string | number): ShopifyBuy.LineItem | null {
    if (cartItems.length === 0) {
      return null;
    }

    const item = cartItems.find(
      (cartItem) => cartItem.variant.id === variantId
    );

    if (item == null) {
      return null;
    }

    return item;
  }

  return getLineItem;
}
