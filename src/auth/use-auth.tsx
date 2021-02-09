import 'firebase/auth';

import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import * as React from 'react';

import { initFirebase } from './init-firebase';
import { removeTokenCookie, setTokenCookie } from './token-cookies';

initFirebase();

interface IAuthContext {
  user: firebase.User | null;
  logout: () => void;
  authenticated: boolean;
}

const AuthContext = React.createContext<IAuthContext>({
  user: null,
  logout: () => null,
  authenticated: false,
});

function AuthProvider({ children }): React.ReactElement {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const router = useRouter();

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => router.push('/'))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  React.useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          setTokenCookie(token);
          setUser(user);
        } else {
          removeTokenCookie();
          setUser(null);
        }
      });

    return () => {
      cancelAuthListener();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, authenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthProvider, useAuth };
