import * as React from 'react';
import Link from 'next/link';

import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';
import { CartIcon, SignInIcon } from './vectors';
import { Searchbar } from './search-bar';
import { useCart } from '@lib/index';
import { Logo } from './vectors/logo';
import { HiOutlineSearch } from 'react-icons/hi';
import { DialogContent, DialogOverlay } from '@reach/dialog';

function Shopbar() {
  const cart = useCart();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  return (
    <div className="relative z-10 font-bold bg-white">
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
                className="flex items-center justify-center h-7 w-7 sm:hidden"
              >
                <HiOutlineSearch className="w-6 h-6" />
              </button>
              <div className="hidden sm:block">
                <Searchbar />
              </div>
              <Link href="/signin">
                <a className="relative flex flex-col items-center text-xs leading-none text-center sm:flex-row sm:space-x-2">
                  <SignInIcon className="w-7 h-7" />
                  <span className="mt-1 sr-only sm:not-sr-only">Sign In</span>
                </a>
              </Link>
              <Link href="/cart">
                <a className="relative flex flex-col items-center text-xs leading-none text-center sm:flex-row sm:space-x-2">
                  <CartIcon className="w-7 h-7" />
                  <span className="mt-1 sr-only sm:not-sr-only">
                    ${cart?.totalPrice ? cart.totalPrice : '0.00'}
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </HorizontalPadding>
      </Container>
      <DialogOverlay
        isOpen={isOpen}
        onDismiss={close}
        className="fixed inset-0 z-40 flex items-start justify-center px-4 py-6 bg-opacity-95 bg-green-dark"
      >
        {/*
          Notification panel, show/hide based on alert state.

          Entering: "transform ease-out duration-300 transition"
            From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            To: "translate-y-0 opacity-100 sm:translate-x-0"
          Leaving: "transition ease-in duration-100"
            From: "opacity-100"
            To: "opacity-0"
          */}
        <DialogContent
          aria-label="Search for products"
          className="w-full max-w-sm bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
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
