/* eslint-disable no-console */
import { LocalStorage, LocalStorageKeys } from '@lib/local-storage';
import * as React from 'react';
import ShopifyBuy from 'shopify-buy';

interface IShopifyContext {
  client: ShopifyBuy.Client | null;
  cart: ShopifyBuy.Cart | null;
  setCart: React.Dispatch<React.SetStateAction<ShopifyBuy.Cart | null>>;
}

// Create new React Context
const ShopifyContext = React.createContext<IShopifyContext>({
  client: null,
  cart: null,
  setCart: () => {
    throw new Error('You forgot to wrap this in a Provider object');
  },
});

const initialCart = LocalStorage.getInitialCart();

interface IShopifyContextProvider {
  accessToken: string;
  children: React.ReactNode;
  shopName: string;
}

// Create React Provider for Shopify cart
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

  const isCustomDomain = shopName.includes('.');

  const client = ShopifyBuy.buildClient({
    storefrontAccessToken: accessToken,
    domain: isCustomDomain ? shopName : `${shopName}.myshopify.com`,
  });

  const [cart, setCart] = React.useState<ShopifyBuy.Cart | null>(initialCart);

  React.useEffect(() => {
    async function getNewCart() {
      const newCart = await client.checkout.create();
      setCart(newCart);
    }

    // eslint-disable-next-line consistent-return
    async function refreshExistingCart(cartId: string) {
      try {
        const refreshedCart = await client.checkout.fetch(cartId);

        if (refreshedCart == null) {
          return await getNewCart();
        }

        const cartHasBeenPurchased = refreshedCart.completedAt != null;
        const cartHasInvalidLineItems = cart.lineItems.find(
          ({ variant }) => variant == null
        );

        if (cartHasBeenPurchased || cartHasInvalidLineItems) {
          getNewCart();
        } else {
          setCart(refreshedCart);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (cart == null) {
      getNewCart();
    } else {
      refreshExistingCart(String(cart.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
