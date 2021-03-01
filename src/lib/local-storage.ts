/** I ripped this off from:
 * https://github.com/thetrevorharmon/gatsby-theme-shopify-manager/
 */
import ShopifyBuy from 'shopify-buy';

// Local storage keys so we can set and retrieve data
const LocalStorageKeys = {
  CART: 'shopify_local_store__cart',
  CHECKOUT_ID: 'shopify_local_store__checkout_id',
};

// Check if a value is a cart
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCart(potentialCart: any): potentialCart is ShopifyBuy.Cart {
  return (
    potentialCart !== null &&
    potentialCart.id !== null &&
    potentialCart.webUrl !== null &&
    potentialCart.lineItems !== null &&
    potentialCart.type !== null &&
    potentialCart.type.name === 'Checkout' &&
    potentialCart.type.kind === 'OBJECT'
  );
}

// Add value to local storage
function set(key: string, value: string) {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    window.localStorage.setItem(key, value);
  }
}

// Get value from local storage
function get(key: string) {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

//
function getInitialCart(): ShopifyBuy.Cart | null {
  const existingCartString = get(LocalStorageKeys.CART);
  if (existingCartString === null) {
    return null;
  }

  try {
    const existingCart = JSON.parse(existingCartString);
    if (!isCart(existingCart)) {
      return null;
    }

    return existingCart;
  } catch {
    return null;
  }
}

const LocalStorage = {
  get,
  set,
  getInitialCart,
};

export { LocalStorage, LocalStorageKeys };
