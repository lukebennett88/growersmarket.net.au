import 'firebase/auth';

import { HorizontalPadding } from '@components/index';
import { SignInIcon } from '@components/vectors';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import firebase from 'firebase/app';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { NextSeo } from 'next-seo';
import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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
      <SignInModal showDialog={showDialog} setShowDialog={setShowDialog} />
    </HorizontalPadding>
  );
}

const firebaseAuthConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
    },
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    // https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
    signInSuccessWithAuthResult: () =>
      // Don't automatically redirect. We handle redirecting based on
      // auth state in withAuthComponent.js.
      false,
  },
};

const AnimatedDialogOverlay = motion.custom(DialogOverlay);
const AnimatedDialogContent = motion.custom(DialogContent);

const transition = { min: 0, max: 100, bounceDamping: 9 };

interface ISignInModal {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignInModal({
  showDialog,
  setShowDialog,
}: ISignInModal): React.ReactElement {
  return (
    <AnimatePresence>
      {showDialog && (
        <AnimatedDialogOverlay
          onDismiss={() => setShowDialog(false)}
          initial="closed"
          animate="open"
          exit="closed"
          variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
          transition={transition}
          className="fixed inset-0 z-10 flex flex-col px-4 py-32 bg-black bg-opacity-25 sm:px-6 backdrop-blur"
        >
          <div className="flex items-start justify-center flex-1 w-full mx-auto pointer-events-none max-w-screen-2xl">
            <AnimatedDialogContent
              aria-label="New item added to cart"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{ open: { y: 0 }, closed: { y: '0.5rem' } }}
              transition={transition}
              className="w-full max-w-sm rounded-md pointer-events-auto ring-opacity-5"
            >
              <StyledFirebaseAuth
                uiConfig={firebaseAuthConfig}
                firebaseAuth={firebase.auth()}
              />
            </AnimatedDialogContent>
          </div>
        </AnimatedDialogOverlay>
      )}
    </AnimatePresence>
  );
}

const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
});

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(AuthPage);
export { getServerSideProps };
