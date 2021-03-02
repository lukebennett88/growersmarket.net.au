import { LocalStorage, LocalStorageKeys } from '@lib/local-storage';
import dotenv from 'dotenv';
import fetch from 'isomorphic-fetch';
import * as React from 'react';
import ShopifyBuy from 'shopify-buy';

dotenv.config({
  path: '.env.local',
});

// Destructure shop name and access token
const {
  NEXT_PUBLIC_SHOPIFY_SHOP_NAME,
  NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
} = process.env;

const isCustomDomain = NEXT_PUBLIC_SHOPIFY_SHOP_NAME.includes('.');

// Build Shopify client
const client = ShopifyBuy.buildClient(
  {
    domain: isCustomDomain
      ? NEXT_PUBLIC_SHOPIFY_SHOP_NAME
      : `${NEXT_PUBLIC_SHOPIFY_SHOP_NAME}.myshopify.com`,
    storefrontAccessToken: NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
  },
  fetch
);

interface IShopifyContext {
  client: ShopifyBuy.Client | null;
  cart: ShopifyBuy.Cart | null;
  setCart: React.Dispatch<React.SetStateAction<ShopifyBuy.Cart | null>>;
}

const defaultValues: IShopifyContext = {
  client,
  cart: null,
  setCart: () => {
    throw new Error('You forgot to wrap this in a Provider object');
  },
};

// Create new React Context
const ShopifyContext = React.createContext<IShopifyContext>(defaultValues);

const isBrowser = typeof window !== 'undefined';

const initialCart = LocalStorage.getInitialCart();

function ShopifyContextProvider({ children }): React.ReactElement {
  const [cart, setCart] = React.useState<ShopifyBuy.Cart | null>(initialCart);

  const setCartItem = React.useCallback(
    (checkout) => {
      if (isBrowser) {
        LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(cart));
      }
      setCart(checkout);
    },
    [cart]
  );

  const cartHasInvalidLineItems = cart?.lineItems.some(
    ({ variant }) => variant === null
  );

  React.useEffect(() => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(LocalStorageKeys.CART)
        : null;

      if (existingCheckoutID && existingCheckoutID !== 'null') {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          );
          if (!existingCheckout.completedAt || cartHasInvalidLineItems) {
            setCartItem(existingCheckout);
            return;
          }
        } catch (error) {
          localStorage.setItem(LocalStorageKeys.CART, null);
        }
      }

      const newCheckout = await client.checkout.create();
      setCartItem(newCheckout);
    };
    initializeCheckout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(cart));
  }, [cart]);

  return (
    <ShopifyContext.Provider
      value={{
        ...defaultValues,
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
