import router from '@/router';
import { GoogleProvider, GithubProvider } from '@/plugins/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential,
  OAuthCredential,
  setPersistence,
  browserLocalPersistence,
  AuthError,
} from 'firebase/auth';
import { ActionContext } from 'vuex';
import { IStateNotification } from '../Notification/types';
import { IStateAuth, ISigninReturn } from './types';
import { INotification } from '@/store/Notification/types';
import { ICadasterModel, EAuthErrorsMessage } from '../Validation/types';

let authProvider: typeof GoogleAuthProvider | typeof GithubAuthProvider =
  GoogleAuthProvider;
let authProviderInstance: GoogleAuthProvider | GithubAuthProvider =
  GoogleProvider;

const formatErrorCode = (errorCode: string): string =>
  errorCode.replace('auth/', '').replaceAll('-', '').toUpperCase();

const getAuthErrorMessage = (errorCode: string): string => {
  switch (formatErrorCode(errorCode)) {
    case 'EMAILALREADYINUSE':
      return EAuthErrorsMessage.EMAILALREADYINUSE;
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
        .catch((error) => {
          reject(error);
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
