import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

interface IFirebaseConfig {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId: string | undefined;
}

const firebaseConfig: IFirebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const GoogleProvider: GoogleAuthProvider = new GoogleAuthProvider();
const GithubProvider: GithubAuthProvider = new GithubAuthProvider();

const storage = getStorage(app);

export { app, GoogleProvider, GithubProvider, storage };
