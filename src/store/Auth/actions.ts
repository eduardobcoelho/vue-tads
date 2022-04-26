import router from '@/router';
import {
  GoogleProvider,
  GithubProvider,
  FacebookProvider,
} from '@/plugins/firebase';
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  UserCredential,
  OAuthCredential,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { ActionContext } from 'vuex';
import { IStateNotification } from '../Notification/types';
import { IStateAuth, ISigninReturn } from './types';
import { INotification } from '@/store/Notification/types';

let authProvider:
  | typeof GoogleAuthProvider
  | typeof GithubAuthProvider
  | typeof FacebookAuthProvider = GoogleAuthProvider;
let authProviderInstance:
  | GoogleAuthProvider
  | GithubAuthProvider
  | typeof FacebookProvider = GoogleProvider;

export default {
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
      case 'facebook':
        authProvider = FacebookAuthProvider;
        authProviderInstance = FacebookProvider;
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
    const { displayName, email, photoURL } = result.user;
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
