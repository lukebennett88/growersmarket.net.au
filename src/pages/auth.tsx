import { HorizontalPadding } from '@components/index';
import { SignInModal } from '@components/signin-modal';
import { SignInIcon } from '@components/vectors';
import Link from 'next/link';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { NextSeo } from 'next-seo';
import * as React from 'react';

function AuthPage() {
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <HorizontalPadding>
      <NextSeo title="Sign in" />
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
        signInSuccessUrl="/account"
      />
    </HorizontalPadding>
  );
}

const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthed: AuthAction.RENDER,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
})(async ({ AuthUser }) => ({
  props: {},
}));

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(AuthPage);
export { getServerSideProps };
