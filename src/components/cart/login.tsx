import { SignInModal } from '@components/signin-modal';
import { SignInIcon } from '@components/vectors';
import { useCartContext } from '@lib/cart-provider';
import { useCart } from '@lib/index';
import Link from 'next/link';
import * as React from 'react';

function Login({ authUser }): React.ReactElement {
  const [showDialog, setShowDialog] = React.useState(false);

  const { setState } = useCartContext();

  const cart = useCart();

  const cartTotal = Number(cart?.totalPrice || 0).toFixed(2);

  if (authUser?.clientInitialized && authUser.email) {
    setState((prevState) => ({ ...prevState, step: 3 }));
  }

  if (Number(cartTotal) < 15) {
    setState((prevState) => ({ ...prevState, step: 1 }));
  }

  return (
    <>
      <div className="py-24">
        <div className="flex items-center justify-center space-x-6">
          <SignInIcon className="w-16" />
          <div>
            <h1 className="text-2xl font-bold">Log into your account</h1>
            <p>Click the button bellow to log in or sign up.</p>
          </div>
        </div>
        <div className="mt-4 text-center sm:mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setShowDialog(true)}
              className="flex-shrink-0 cta"
            >
              Log in / Sign up
            </button>
          </div>
          <p className="mt-24 text-sm">
            By signing up, you agree to the Growers Market{' '}
            <Link href="/pages/terms-of-service">
              <a className="font-bold">Terms and Conditions</a>
            </Link>{' '}
            and{' '}
            <Link href="/pages/privacy-policy">
              <a className="font-bold">Privacy Policy</a>
            </Link>
            .
          </p>
        </div>
      </div>
      <SignInModal
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        signInSuccessUrl="/cart"
      />
    </>
  );
}

export { Login };
