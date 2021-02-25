import ShopifyBuy from 'shopify-buy';

import { useShopifyContext } from '../shopify-context';

export interface AttributeInput {
  [key: string]: string;
}

interface LineItemPatch {
  variantId: string | number;
  quantity: number;
  customAttributes?: AttributeInput[];
}

function useAddItemsToCart() {
  const { client, cart, setCart } = useShopifyContext();

  async function addItemsToCart(items: LineItemPatch[]) {
    if (cart == null || client == null) {
      throw new Error('Called addItemsToCart too soon');
    }

    if (items.length === 0) {
      throw new Error(
        'Must include at least one line item, empty line items found'
      );
    }

    items.forEach((item) => {
      if (item.variantId == null) {
        throw new Error(`Missing variantId in item`);
      }

      if (item.quantity == null) {
        throw new Error(
          `Missing quantity in item with variant id: ${item.variantId}`
        );
      } else if (typeof item.quantity !== 'number') {
        throw new TypeError(
          `Quantity is not a number in item with variant id: ${item.variantId}`
        );
      } else if (item.quantity < 1) {
        throw new Error(
          `Quantity must not be less than one in item with variant id: ${item.variantId}`
        );
      }
    });

    const newCart = await client.checkout.addLineItems(
      cart.id,
      items as ShopifyBuy.LineItem[]
    );
    setCart(newCart);
  }

  return addItemsToCart;
}

export { useAddItemsToCart };
