import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: IFirebaseConfig = {
  apiKey: 'AIzaSyBKCbQ3y13sHOkHUU0IX-dc9OqQEsaujeE',
  authDomain: 'vue-tads.firebaseapp.com',
  projectId: 'vue-tads',
  storageBucket: 'vue-tads.appspot.com',
  messagingSenderId: '37174221228',
  appId: '1:37174221228:web:1c6cddd7bd00f2869dc209',
  measurementId: 'G-FX6Q0XLSMX',
};

const app = initializeApp(firebaseConfig);

const GoogleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

export { app, GoogleProvider, GithubProvider };
