/* eslint-disable consistent-return */
import { HorizontalPadding } from '@components/index';
import { SignInIcon } from '@components/vectors';
import { PenIcon } from '@components/vectors/pen';
import { getSiteNavigation, getSiteSettings } from '@lib/index';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { NextSeo } from 'next-seo';
import * as React from 'react';

function AccountPage() {
  const authUser = useAuthUser();
  return (
    <HorizontalPadding>
      <NextSeo title="Account" />
      <div className="py-24">
        <div className="flex items-center justify-center space-x-6">
          <SignInIcon className="w-16" />
          <div>
            <h1 className="text-2xl font-bold">My Account</h1>
          </div>
        </div>
        <div className="mt-4 space-y-8 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="p-4 border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Personal Details</h2>
              {/* // TODO: Make this button work */}
              <button
                type="button"
                className="flex items-center space-x-2 text-sm font-bold"
              >
                <PenIcon className="w-5 h-5 fill-current" />
                <span>Edit details</span>
              </button>
            </div>
            <dl className="mt-2 space-y-2">
              {authUser?.firebaseUser?.displayName && (
                <div>
                  <dt className="inline font-bold">Name: </dt>
                  <dd className="inline">
                    {authUser.firebaseUser.displayName}
                  </dd>
                </div>
              )}
              <div>
                <dt className="inline font-bold">Email: </dt>
                <dd className="inline">{authUser.email}</dd>
              </div>
              <div>
                <dt className="inline font-bold">Phone number: </dt>
                <dd className="inline">0400 000 000</dd>
              </div>
            </dl>
          </div>
          <div className="p-4 border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Delivery Preferences</h2>
              {/* // TODO: Make this button work */}
              <button
                type="button"
                className="flex items-center space-x-2 text-sm font-bold"
              >
                <PenIcon className="w-5 h-5 fill-current" />
                <span>Edit details</span>
              </button>
            </div>
            <dl className="mt-2 space-y-2">
              <div>
                <dt className="inline font-bold">Deliver to this address: </dt>
                <dd className="inline">
                  1 Horton Street, Port Macquarie, NSW, 2444
                </dd>
              </div>
            </dl>
          </div>
          <div className="space-y-4 text-right">
            {!!authUser.email && (
              <button type="button" onClick={authUser.signOut} className="cta">
                Sign out
              </button>
            )}
          </div>
        </div>
      </div>
    </HorizontalPadding>
  );
}

const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
})(async ({ AuthUser }) => {
  const siteNavigation = await getSiteNavigation();
  const siteSettings = await getSiteSettings();

  return {
    props: {
      siteNavigation,
      siteSettings,
    },
  };
});

export { getServerSideProps };
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AccountPage);
