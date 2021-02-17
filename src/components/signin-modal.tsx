import 'firebase/auth';

import { DialogContent, DialogOverlay } from '@reach/dialog';
import firebase from 'firebase/app';
import { AnimatePresence, motion } from 'framer-motion';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const AnimatedDialogOverlay = motion.custom(DialogOverlay);
const AnimatedDialogContent = motion.custom(DialogContent);

const transition = { min: 0, max: 100, bounceDamping: 9 };

interface ISignInModal {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  signInSuccessUrl?: string;
}

function SignInModal({
  showDialog,
  setShowDialog,
  signInSuccessUrl = '/',
}: ISignInModal): React.ReactElement {
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
    signInSuccessUrl,
    credentialHelper: 'none',
    callbacks: {
      // https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
      signInSuccessWithAuthResult: () =>
        // Don't automatically redirect. We handle redirecting based on
        // auth state in withAuthComponent.js.
        false,
    },
  };

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

export { SignInModal };
