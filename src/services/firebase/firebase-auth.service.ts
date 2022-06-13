import {
  User,
  UserCredential,
  GithubAuthProvider,
  GoogleAuthProvider,
  AuthError,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  signOut,
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
  sendEmailResetPassword(email: string): Promise<void> {
    return new Promise((resolve, reject) =>
      sendPasswordResetEmail(getAuth(), email)
        .then((resp) => resolve(resp))
        .catch(({ code }: AuthError) => reject(code)),
    );
  }
  updateUserPassword(password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const { currentUser } = getAuth();
      if (currentUser)
        updatePassword(currentUser, password)
          .then((resp) => resolve(resp))
          .catch(({ code }: AuthError) => reject(code));
    });
  }
  updateUserProfile(userData: Partial<User>): Promise<void> {
    return new Promise((resolve, reject) => {
      const { currentUser } = getAuth();
      if (currentUser) {
        updateProfile(currentUser, userData)
          .then((resp) => resolve(resp))
          .catch(({ code }) => reject(code));
      } else {
        return Promise.reject('Usuário não-autorizado!');
      }
    });
  }
  logout(): Promise<boolean> {
    return new Promise((resolve, reject) =>
      signOut(getAuth())
        .then(() => {
          localStorage.clear();
          resolve(true);
        })
        .catch(() => reject(false)),
    );
  }
}

export default new FirebaseAuthService();
