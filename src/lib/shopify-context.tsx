import { LocalStorage, LocalStorageKeys } from '@lib/local-storage';
import * as React from 'react';
import ShopifyBuy from 'shopify-buy';

// Create new React Context
interface ShopifyContextShape {
  client: ShopifyBuy.Client | null;
  cart: ShopifyBuy.Cart | null;
  setCart: React.Dispatch<React.SetStateAction<ShopifyBuy.Cart | null>>;
}

const ShopifyContext = React.createContext<ShopifyContextShape>({
  client: null,
  cart: null,
  setCart: () => {
    throw new Error('You forgot to wrap this in a Provider object');
  },
});

// Create React Provider for Shopify cart
interface IShopifyContextProvider {
  shopName: string;
  accessToken: string;
  children: React.ReactNode;
}

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

  const refreshExistingCart = React.useCallback(
    // eslint-disable-next-line consistent-return
    async (cartId: string) => {
      try {
        const refreshedCart = await client.checkout.fetch(cartId);

        if (refreshedCart == null) {
          return await getNewCart();
        }

        const cartHasBeenPurchased = refreshedCart.completedAt != null;

        if (cartHasBeenPurchased) {
          getNewCart();
        } else {
          setCart(refreshedCart);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
    [client.checkout, getNewCart]
  );

  const checkCart = React.useCallback(() => {
    if (cart == null) {
      getNewCart();
    } else {
      refreshExistingCart(String(cart.id));
    }
  }, [cart, getNewCart, refreshExistingCart]);

  React.useEffect(() => {
    checkCart();
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
