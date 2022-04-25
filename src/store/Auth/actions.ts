import router from '@/router';
import {
  GoogleProvider,
  GithubProvider,
  FacebookProvider,
} from '@/plugins/firebase';
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  UserCredential,
  OAuthCredential,
} from 'firebase/auth';
import { ActionContext } from 'vuex';
import { IStateNotification } from '../Notification/types';
import { IStateAuth, ISigninReturn } from './types';
import { INotification } from '@/store/Notification/types';

export default {
  signIn(
    { dispatch }: ActionContext<IStateAuth, any>,
    provider = 'google',
  ): Promise<ISigninReturn | string> {
    let authProvider:
      | typeof GoogleAuthProvider
      | typeof GithubAuthProvider
      | typeof FacebookAuthProvider;
    let authProviderInstance:
      | GoogleAuthProvider
      | GithubAuthProvider
      | typeof FacebookProvider;
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
    return new Promise((resolve, reject) => {
      signInWithPopup(getAuth(), authProviderInstance)
        .then((result: UserCredential) => {
          const credential: OAuthCredential | null =
            authProvider.credentialFromResult(result);
          const userData: ISigninReturn = {
            result,
            credential,
          };
          dispatch('setUserData', userData);
          resolve(userData);
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
      signOut(getAuth()).then(() => {
        localStorage.clear();
        commit('setNotification', notification);
        router.push({ name: 'Login' });
      });
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
