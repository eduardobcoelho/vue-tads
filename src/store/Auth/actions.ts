import router from '@/router';
import { GoogleProvider, GithubProvider } from '@/plugins/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  signInWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential,
  OAuthCredential,
  setPersistence,
  browserLocalPersistence,
  AuthError,
  sendPasswordResetEmail,
  updateProfile,
  User,
  Auth,
} from 'firebase/auth';
import { ActionContext } from 'vuex';
import { IStateNotification } from '../Notification/types';
import {
  IStateAuth,
  ISigninReturn,
  ICadasterModel,
  EAuthErrorsMessage,
} from './types';
import { INotification } from '@/store/Notification/types';

let authProvider: typeof GoogleAuthProvider | typeof GithubAuthProvider =
  GoogleAuthProvider;
let authProviderInstance: GoogleAuthProvider | GithubAuthProvider =
  GoogleProvider;

const formatErrorCode = (module: string, errorCode: string): string =>
  errorCode.replace(`${module}/`, '').replaceAll('-', '').toUpperCase();

const getAuthErrorMessage = (errorCode: string): string => {
  switch (formatErrorCode('auth', errorCode)) {
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
};

export default {
  signUp(
    _: ActionContext<any, any>,
    { email, password }: ICadasterModel,
  ): Promise<UserCredential> {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((result: UserCredential) => {
          resolve(result);
        })
        .catch((error: AuthError) => {
          reject(getAuthErrorMessage(error.code));
        });
    });
  },
  signInCommom(
    _: ActionContext<any, any>,
    { email, password }: ICadasterModel,
  ): Promise<UserCredential> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(getAuth(), email, password)
        .then((result: UserCredential) => {
          resolve(result);
        })
        .catch((error: AuthError) => {
          reject(getAuthErrorMessage(error.code));
        });
    });
  },
  signIn(_: ActionContext<IStateAuth, any>, provider = 'google'): void {
    switch (provider) {
      case 'google':
        authProvider = GoogleAuthProvider;
        authProviderInstance = GoogleProvider;
        break;
      case 'github':
        authProvider = GithubAuthProvider;
        authProviderInstance = GithubProvider;
        break;
    }
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithRedirect(auth, authProviderInstance);
    });
  },
  redirectResult({
    dispatch,
  }: ActionContext<IStateAuth, any>): Promise<ISigninReturn | null> {
    return new Promise((resolve, reject) => {
      getRedirectResult(getAuth())
        .then((result: UserCredential | null) => {
          if (result) {
            const credential: OAuthCredential | null =
              authProvider.credentialFromResult(result);
            const userData: ISigninReturn = {
              result,
              credential,
            };
            dispatch('setUserData', userData);
            resolve(userData);
          } else {
            localStorage.clear();
            resolve(null);
          }
        })
        .catch((error: AuthError) => {
          reject(getAuthErrorMessage(error.code));
        });
    });
  },
  setUserData(
    { commit }: ActionContext<IStateAuth, any>,
    { result, credential }: ISigninReturn,
  ): void {
    const accessToken: string | undefined = credential
      ? credential.accessToken
      : undefined;
    const { displayName = null, email, photoURL = null } = result.user;
    commit('setUser', {
      name: displayName,
      email,
      photoURL,
    });
    if (accessToken) {
      localStorage.setItem('token', accessToken);
      setTimeout(() => {
        commit('setNotification', {
          type: 'success',
          message: 'Usuário autenticado com sucesso!',
        });
      }, 500);
    }
    router.push({ name: 'Home' });
  },
  sendEmailToResetPassword(_: any, email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(getAuth(), email)
        .then((resp) => resolve(resp))
        .catch((error) => reject(getAuthErrorMessage(error.code)));
    });
  },
  updateUserProfile(
    { commit }: ActionContext<IStateNotification, IStateAuth>,
    payload: Partial<User>,
  ): Promise<Auth | false | string> {
    return new Promise((resolve, reject) => {
      const auth: Auth = getAuth();
      if (auth.currentUser) {
        updateProfile(auth.currentUser, payload)
          .then(() => {
            commit('setNotification', {
              type: 'success',
              message: 'Usuário atualizado com sucesso!',
            });
            resolve(auth);
          })
          .catch((error) => {
            const errorMessage: string = getAuthErrorMessage(error.code);
            commit('setNotification', {
              type: 'success',
              message: errorMessage,
            });
            reject(getAuthErrorMessage(errorMessage));
          });
      } else {
        commit('setNotification', {
          type: 'error',
          message:
            'Não foi possível atualizar este usuário. Por favor, logue novamente para efetuar a ação!',
        });
        reject(false);
      }
    });
  },
  logout(
    { commit }: ActionContext<IStateNotification, any>,
    isForce: boolean,
  ): Promise<string> {
    try {
      const feedbackMessage: string = isForce
        ? 'Tempo de sessão esgotado!'
        : 'Usuário deslogado com sucesso!';
      const notification: INotification = {
        type: isForce ? 'error' : 'success',
        message: feedbackMessage,
      };
      localStorage.clear();
      commit('setNotification', notification);
      router.push({ name: 'Login' });
      return Promise.resolve(feedbackMessage);
    } catch (error) {
      commit('setNotification', {
        type: 'error',
        message: 'Não foi possível deslogar o usuário!',
      });
      return Promise.reject(error);
    }
  },
};
