import { useCart } from '@lib/hooks/use-cart';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import Link from 'next/link';
import * as React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';
import { Searchbar } from './search-bar';
import { CartIcon } from './vectors/cart';
import { Logo } from './vectors/logo';
import { SignInIcon } from './vectors/sign-in';

function Shopbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  const close = () => setIsOpen(false);

  const cart = useCart();

  const [total, setTotal] = React.useState('0.00');

  React.useEffect(() => {
    if (cart?.totalPrice) {
      setTotal(cart.totalPrice);
    }
  }, [cart?.totalPrice]);

  return (
    <div className="relative z-20 font-bold bg-white">
      <Container>
        <HorizontalPadding>
          <div className="flex items-center justify-between">
            <div className="relative z-10 mr-4 transform -translate-y-3 sm:-translate-y-6 sm:py-0">
              <Link href="/">
                <a className="block h-20 sm:h-24">
                  <span className="sr-only">Growers Market</span>
                  <Logo className="h-full drop-shadow" />
                </a>
              </Link>
            </div>
            <div className="flex items-center space-x-5">
              <button
                type="button"
                onClick={toggle}
                aria-controls="mobile-search"
                aria-expanded={isOpen}
                className="flex items-center justify-center h-7 w-7 sm:hidden"
              >
                <span className="sr-only">Open search</span>
                <HiOutlineSearch className="w-6 h-6" />
              </button>
              <div className="hidden sm:block">
                <Searchbar />
              </div>
              <Link href="/account">
                <a className="relative flex flex-col items-center text-xs leading-none text-center sm:flex-row sm:space-x-2">
                  <SignInIcon className="w-7 h-7" />
                  <span className="mt-1 sr-only sm:not-sr-only">Account</span>
                </a>
              </Link>
              <Link href="/cart">
                <a className="relative flex flex-col items-center text-xs leading-none text-center sm:flex-row sm:space-x-2">
                  <CartIcon className="w-7 h-7" />
                  <span className="mt-1 sr-only sm:not-sr-only">${total}</span>
                </a>
              </Link>
            </div>
          </div>
        </HorizontalPadding>
      </Container>
      <DialogOverlay
        isOpen={isOpen}
        onDismiss={close}
        id="mobile-search"
        className="absolute inset-0 z-40 flex items-start justify-center mt-32 bg-black bg-opacity-50"
      >
        <DialogContent
          aria-label="Search for products"
          className="w-full max-w-sm bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="p-4">
            <Searchbar />
          </div>
        </DialogContent>
      </DialogOverlay>
    </div>
  );
}

export { Shopbar };
