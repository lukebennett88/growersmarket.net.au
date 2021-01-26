import * as React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';
import { CartIcon, SignInIcon } from './vectors';
import { Searchbar } from './search-bar';
import { useCart } from '@lib/index';
import { Logo } from './vectors/logo';

function Shopbar() {
  const [session] = useSession();
  const cart = useCart();
  return (
    <div className="font-bold bg-white">
      <Container>
        <HorizontalPadding>
          <div className="flex items-center justify-between">
            <div className="relative z-10 py-3 mr-4 transform sm:py-0 sm:-translate-y-6">
              <Link href="/">
                <a className="block h-16 sm:h-24">
                  <span className="sr-only">Growers Market</span>
                  <Logo className="h-full drop-shadow" />
                </a>
              </Link>
            </div>
            <div className="flex items-center space-x-5">
              <Searchbar />
              {session ? (
                <a
                  href="/api/auth/signout"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                  className="relative flex flex-col items-center text-xs leading-none text-center sm:flex-row sm:space-x-2"
                >
                  <SignInIcon className="w-7 h-7" />
                  <span className="mt-1">
                    Sign <br />
                    Out
                  </span>
                </a>
              ) : (
                <a
                  href="/signin"
                  onClick={(e) => {
                    e.preventDefault();
                    signIn(null, { callbackUrl: 'http://localhost:3000/' });
                  }}
                  className="relative flex flex-col items-center text-xs leading-none text-center sm:flex-row sm:space-x-2"
                >
                  <SignInIcon className="w-7 h-7" />
                  <span className="mt-1">Sign In</span>
                </a>
              )}
              <Link href="/cart">
                <a className="relative flex flex-col items-center text-xs leading-none text-center sm:flex-row sm:space-x-2">
                  <CartIcon className="w-7 h-7" />
                  <span className="mt-1">
                    ${cart?.totalPrice ? cart.totalPrice : '0.00'}
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </HorizontalPadding>
      </Container>
    </div>
  );
}

export { Shopbar };
