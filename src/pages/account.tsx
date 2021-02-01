import * as React from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';
import { NextSeo } from 'next-seo';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import firebase from 'firebase/app';
// import 'firebase/auth';

import { HorizontalPadding } from '@components/index';
import { SignInIcon } from '@components/vectors';
import { getSiteNavigation, getSiteSettings } from '@lib/index';
// import { loadIdToken } from '@auth/index';

// const firebaseAuthConfig = {
//   signInFlow: 'popup',
//   signInOptions: [
//     {
//       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       requireDisplayName: false,
//     },
//   ],
//   signInSuccessUrl: '/',
// };

function AccountPage() {
  const [renderAuth, setRenderAuth] = React.useState(false);

  React.useEffect(() => {
    setRenderAuth(true);
  }, []);

  return (
    <HorizontalPadding>
      <NextSeo title={`Sign in`} />
      <div className="py-24">
        {/* {renderAuth ? (
          <StyledFirebaseAuth
            uiConfig={firebaseAuthConfig}
            firebaseAuth={firebase.auth()}
          />
        ) : (
          <>
            <div className="flex items-center justify-center space-x-6">
              <SignInIcon className="w-16" />
              <h1 className="text-2xl font-bold">Log into your account</h1>
            </div>
            <div className="mt-4 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
              <div className="space-y-4">
                <button
                  type="button"
                  className="w-full bg-white border cta border-green-dark text-green-dark"
                >
                  Sign in
                </button>
              </div>
            </div>
          </>
        )} */}
        <div className="flex items-center justify-center space-x-6">
          <SignInIcon className="w-16" />
          <h1 className="text-2xl font-bold">Log into your account</h1>
        </div>
        <div className="mt-4 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="space-y-4">
            <button
              type="button"
              className="w-full bg-white border cta border-green-dark text-green-dark"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </HorizontalPadding>
  );
}

const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const uid = await loadIdToken(req as NextApiRequest);

  // if (uid) {
  //   res.setHeader('location', '/');
  //   res.statusCode = 302;
  //   res.end();
  // }

  const siteNavigation = await getSiteNavigation();
  const siteSettings = await getSiteSettings();

  return {
    props: {
      siteNavigation,
      siteSettings,
    },
  };
};

export { AccountPage as default, getServerSideProps };
