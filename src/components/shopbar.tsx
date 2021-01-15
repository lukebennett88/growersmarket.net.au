import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { HiSearch } from 'react-icons/hi';

import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';
import { CartIcon, SignInIcon } from './vectors';

function Shopbar() {
  const [session] = useSession();

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
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search all products"
                  className="pl-5 rounded-full"
                />
                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  <HiSearch className="w-5 h-5" />
                </span>
              </div>
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
              <div className="flex items-center space-x-2">
                <CartIcon className="w-7 h-7" />
                <span className="text-xs leading-tight">
                  Your <br />
                  Cart
                </span>
              </div>
            </div>
          </div>
        </HorizontalPadding>
      </Container>
    </div>
  );
}

export { Shopbar };
