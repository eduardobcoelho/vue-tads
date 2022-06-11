import { FirebaseApp, initializeApp } from 'firebase/app';

interface IFirebaseConfig {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId: string | undefined;
}

export class FirebaseAppService {
  protected app: FirebaseApp;
  private firebaseConfig: IFirebaseConfig;

  constructor() {
    this.firebaseConfig = {
      apiKey: process.env.VUE_APP_API_KEY,
      authDomain: process.env.VUE_APP_AUTH_DOMAIN,
      projectId: process.env.VUE_APP_PROJECT_ID,
      storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_APP_ID,
      measurementId: process.env.VUE_APP_MEASUREMENT_ID,
    };
    this.app = initializeApp(this.firebaseConfig);
  }
}

export default new FirebaseAppService();
