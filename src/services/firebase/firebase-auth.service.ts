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
import { EAuthErrorsMessage } from '@/enums';

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
  private formatErrorCode(errorCode: string): string {
    return errorCode.replace('auth/', '').replaceAll('-', '').toUpperCase();
  }
  private getAuthErrorMessage(errorCode: string): string {
    switch (this.formatErrorCode(errorCode)) {
      case 'EMAILALREADYINUSE':
        return EAuthErrorsMessage.EMAILALREADYINUSE;
      case 'INVALIDEMAIL':
        return EAuthErrorsMessage.INVALIDEMAIL;
      case 'USERDISABLED':
        return EAuthErrorsMessage.USERDISABLED;
      case 'USERNOTFOUND':
        return EAuthErrorsMessage.USERNOTFOUND;
      case 'WRONGPASSWORD':
        return EAuthErrorsMessage.WRONGPASSWORD;
      case 'WEAKPASSWORD':
        return EAuthErrorsMessage.WEAKPASSWORD;
      default:
        return 'Tente novamente';
    }
  }
  signUp({ email, password }: ICadasterModel): Promise<UserCredential> {
    return new Promise((resolve, reject) =>
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((result: UserCredential) => resolve(result))
        .catch(({ code }: AuthError) => reject(this.getAuthErrorMessage(code))),
    );
  }
  signInCommon({ email, password }: ICadasterModel): Promise<UserCredential> {
    return new Promise((resolve, reject) =>
      signInWithEmailAndPassword(getAuth(), email, password)
        .then((result: UserCredential) => resolve(result))
        .catch(({ code }) => reject(this.getAuthErrorMessage(code))),
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
        .catch(({ code }: AuthError) => reject(this.getAuthErrorMessage(code)));
    });
  }
  sendEmailResetPassword(email: string): Promise<void> {
    return new Promise((resolve, reject) =>
      sendPasswordResetEmail(getAuth(), email)
        .then((resp) => resolve(resp))
        .catch(({ code }: AuthError) => reject(this.getAuthErrorMessage(code))),
    );
  }
  updateUserPassword(password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const { currentUser } = getAuth();
      if (currentUser)
        updatePassword(currentUser, password)
          .then((resp) => resolve(resp))
          .catch(({ code }: AuthError) =>
            reject(this.getAuthErrorMessage(code)),
          );
    });
  }
  updateUserProfile(userData: Partial<User>): Promise<void> {
    return new Promise((resolve, reject) => {
      const { currentUser } = getAuth();
      if (currentUser) {
        updateProfile(currentUser, userData)
          .then((resp) => resolve(resp))
          .catch(({ code }) => reject(this.getAuthErrorMessage(code)));
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
