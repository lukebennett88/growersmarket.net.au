/* eslint-disable consistent-return */
import { HorizontalPadding } from '@components/index';
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
        <h1>Account Page</h1>
        {!!authUser.email && (
          <button type="button" onClick={authUser.signOut}>
            Sign out
          </button>
        )}
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
