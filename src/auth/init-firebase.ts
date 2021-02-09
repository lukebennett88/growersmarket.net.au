import 'firebase/auth';

import firebase from 'firebase/app';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

function initFirebase() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }
}

export { initFirebase };
