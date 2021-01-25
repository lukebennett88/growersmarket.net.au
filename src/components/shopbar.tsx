import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';
import { CartIcon, SignInIcon } from './vectors';
import { Searchbar } from './search-bar';
import { useCartCount } from '@lib/index';

function Shopbar() {
  const [session] = useSession();
  const count = useCartCount();
  return (
    <div className="font-bold bg-white">
      <Container>
        <HorizontalPadding>
          <div className="flex items-center justify-between">
            <div className="w-48 transform -translate-y-6">
              <Link href="/">
                <a className="block">
                  <Image
                    src="/logo.png"
                    width={200}
                    height={107}
                    layout="intrinsic"
                    alt="Growers Market"
                    className="drop-shadow"
                  />
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
                  className="flex items-center space-x-2"
                >
                  <SignInIcon className="w-7 h-7" />
                  <span className="text-xs leading-tight">
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
                  className="flex items-center space-x-2"
                >
                  <SignInIcon className="w-7 h-7" />
                  <span className="text-xs leading-tight">
                    Sign <br />
                    In
                  </span>
                </a>
              )}
              <Link href="/cart">
                <a className="relative flex items-center space-x-2">
                  <CartIcon className="w-7 h-7" />
                  <span className="text-xs leading-tight">
                    Your <br />
                    Cart
                  </span>
                  {count > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white transform translate-x-full -translate-y-1/2 rounded-full bg-green-dark">
                      {count}
                    </span>
                  )}
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
