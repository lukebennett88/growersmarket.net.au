import 'firebase/auth';

import { HorizontalPadding } from '@components/index';
import { SignInIcon } from '@components/vectors';
import { getSiteNavigation, getSiteSettings } from '@lib/index';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import firebase from 'firebase/app';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthAction, withAuthUser } from 'next-firebase-auth';
import { NextSeo } from 'next-seo';
import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function AuthPage() {
  const [showDialog, setShowDialog] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowDialog(true);
    }
  }, []);

  return (
    <HorizontalPadding>
      <NextSeo title="Sign in" />
      <div className="py-24">
        <div className="flex items-center justify-center space-x-6">
          <SignInIcon className="w-16" />
          <h1 className="text-2xl font-bold">Log into your account</h1>
        </div>
        <div className="mt-4 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setShowDialog(true)}
              className="w-full bg-white border cta border-green-dark text-green-dark"
            >
              Sign in
            </button>
          </div>
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
      requireDisplayName: false,
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
              className="w-full max-w-sm pointer-events-auto ring-opacity-5"
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

async function getServerSideProps() {
  const siteNavigation = await getSiteNavigation();
  const siteSettings = await getSiteSettings();

  return {
    props: {
      siteNavigation,
      siteSettings,
    },
  };
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(AuthPage);
export { getServerSideProps };
