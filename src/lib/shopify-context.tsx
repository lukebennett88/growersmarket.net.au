/* eslint-disable no-console */
/* eslint-disable no-alert */
import { LocalStorage, LocalStorageKeys } from '@lib/local-storage';
import * as React from 'react';
import ShopifyBuy from 'shopify-buy';

interface ShopifyContextShape {
  client: ShopifyBuy.Client | null;
  cart: ShopifyBuy.Cart | null;
  setCart: React.Dispatch<React.SetStateAction<ShopifyBuy.Cart | null>>;
}

// Create new React Context
const ShopifyContext = React.createContext<ShopifyContextShape>({
  client: null,
  cart: null,
  setCart: () => {
    throw new Error('You forgot to wrap this in a Provider object');
  },
});

interface IShopifyContextProvider {
  shopName: string;
  accessToken: string;
  children: React.ReactNode;
}

// Create React Provider for Shopify cart
// eslint-disable-next-line sonarjs/cognitive-complexity
function ShopifyContextProvider({
  shopName,
  accessToken,
  children,
}: IShopifyContextProvider) {
  if (shopName == null || accessToken == null) {
    throw new Error(
      'Unable to build shopify-buy client object. Please make sure that your access token and domain are correct.'
    );
  }

  const initialCart = LocalStorage.getInitialCart();
  const [cart, setCart] = React.useState<ShopifyBuy.Cart | null>(initialCart);

  const isCustomDomain = shopName.includes('.');

  const client = ShopifyBuy.buildClient({
    storefrontAccessToken: accessToken,
    domain: isCustomDomain ? shopName : `${shopName}.myshopify.com`,
  });

  const getNewCart = React.useCallback(async () => {
    const newCart = await client.checkout.create();
    setCart(newCart);
  }, [client.checkout]);

  const removeInvalidLineItems = React.useCallback(async () => {
    console.log('cartHasInvalidLineItems');
    // We don't have the id of the invalid products (since the variant property is null)
    // So we can't use the removeLineItem method on `client.checkout`
    // Instead, we get an array of all the valid line item ids, empty the cart,
    // and add the valid line items back.
    const validLineItems = JSON.stringify(
      cart.lineItems
        .filter(({ variant }) => variant !== null)
        .map(({ variant, quantity }) => ({
          variantId: variant.id,
          quantity,
        }))
    );
    console.log({ validLineItems });
    console.log('getNewCart()');
    return await getNewCart()
      .catch((error) => console.error(error))
      .then(async () => {
        console.log({ 'adding line items': JSON.parse(validLineItems) });
        return client.checkout.addLineItems(
          cart.id,
          JSON.parse(validLineItems)
        );
      })
      .catch((error) => console.error(error))
      .finally(() =>
        alert(
          '1 or more items are no longer available for sale and have been removed from your cart'
        )
      );
  }, [cart?.id, cart?.lineItems, client.checkout, getNewCart]);

  const refreshExistingCart = React.useCallback(
    // eslint-disable-next-line consistent-return
    async (cartId: string) => {
      try {
        const refreshedCart = await client.checkout.fetch(cartId);

        if (refreshedCart == null) {
          console.log('refreshedCart == null');
          return await getNewCart();
        }

        const cartHasBeenPurchased = refreshedCart.completedAt != null;

        if (cartHasBeenPurchased) {
          return await getNewCart();
        }

        const cartHasInvalidLineItems = cart.lineItems.some(
          ({ variant }) => variant === null
        );

        if (cartHasInvalidLineItems) {
          return await removeInvalidLineItems();
        }

        console.log('setCart(refreshedCart)');
        setCart(refreshedCart);
      } catch (error) {
        console.error(error);
      }
    },
    [cart?.lineItems, client?.checkout, getNewCart, removeInvalidLineItems]
  );

  const checkCart = React.useCallback(() => {
    if (cart === null) {
      console.log('cart === null');
      getNewCart();
    } else {
      console.log('running refreshExistingCart');
      refreshExistingCart(String(cart.id));
    }
    // }, [cart, getNewCart, refreshExistingCart]);
  }, []);

  React.useEffect(() => {
    checkCart();
  }, [checkCart]);

  React.useEffect(() => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(cart));
  }, [cart]);

  return (
    <ShopifyContext.Provider
      value={{
        client,
        cart,
        setCart,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  );
}

// Create useShopifyContext to make using values from Context easier
function useShopifyContext() {
  return React.useContext(ShopifyContext);
}

// Export everything
export { ShopifyContext, ShopifyContextProvider, useShopifyContext };
