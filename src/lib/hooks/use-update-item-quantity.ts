import { useShopifyContext } from '@lib/shopify-context';

import { useGetLineItem } from './use-get-line-item';

export function useUpdateItemQuantity() {
  const { client, cart, setCart } = useShopifyContext();
  const getLineItem = useGetLineItem();

  async function updateItemQuantity(
    variantId: string | number,
    quantity: number
  ) {
    if (variantId == null) {
      throw new Error('Must provide a variant id');
    }

    if (quantity == null || Number(quantity) < 0) {
      throw new Error('Quantity must be greater than 0');
    }

    const lineItem = getLineItem(variantId);
    if (lineItem == null) {
      throw new Error(`Item with variantId ${variantId} not in cart`);
    }

    const newCart = await client.checkout.updateLineItems(cart.id, [
      { id: lineItem.id, quantity },
    ]);
    setCart(newCart);
  }

  return updateItemQuantity;
}
