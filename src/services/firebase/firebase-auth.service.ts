import {
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  AuthError,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseAppService } from './firebase-app.service';
import { ICadasterModel, ISignInProviderResolve } from '@/types';

export class FirebaseAuthService extends FirebaseAppService {
  public GoogleProvider: GoogleAuthProvider;
  public GithubProvider: GithubAuthProvider;

  constructor() {
    super();
    this.GoogleProvider = new GoogleAuthProvider();
    this.GithubProvider = new GithubAuthProvider();
    this.setAuthPersistence();
  }

  private setAuthPersistence(): void {
    setPersistence(getAuth(), browserLocalPersistence);
  }
  signUp({ email, password }: ICadasterModel): Promise<UserCredential> {
    return new Promise((resolve, reject) =>
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((result: UserCredential) => resolve(result))
        .catch(({ code }: AuthError) => reject(code)),
    );
  }
  signInCommon({ email, password }: ICadasterModel): Promise<UserCredential> {
    return new Promise((resolve, reject) =>
      signInWithEmailAndPassword(getAuth(), email, password)
        .then((result: UserCredential) => resolve(result))
        .catch(({ code }) => reject(code)),
    );
  }
  signInProvider(provider: string): Promise<ISignInProviderResolve> {
    const authProvider =
      provider === 'google' ? GoogleAuthProvider : GithubAuthProvider;
    const authProviderInstance =
      provider === 'google' ? this.GoogleProvider : this.GithubProvider;
    return new Promise((resolve, reject) => {
      signInWithPopup(getAuth(), authProviderInstance)
        .then((result) => {
          const credential = authProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;
          resolve({
            credential,
            token,
            user,
          });
        })
        .catch(({ code }: AuthError) => reject(code));
    });
  }
}

export default new FirebaseAuthService();
