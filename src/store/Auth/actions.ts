import router from '@/router';
import { GoogleProvider, GithubProvider } from '@/plugins/firebase';
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential,
  OAuthCredential,
} from 'firebase/auth';
import { ActionContext } from 'vuex';
import { IStateNotification } from '../Notification/types';
import { IStateAuth, ISigninReturn } from './types';

export default {
  signInGoogle({
    dispatch,
  }: ActionContext<IStateAuth, any>): Promise<ISigninReturn | string> {
    return new Promise((resolve, reject) => {
      signInWithPopup(getAuth(), GoogleProvider)
        .then((result: UserCredential) => {
          const credential: OAuthCredential | null =
            GoogleAuthProvider.credentialFromResult(result);
          const userData = {
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
  signInGithub({
    dispatch,
  }: ActionContext<IStateAuth, any>): Promise<ISigninReturn | string> {
    return new Promise((resolve, reject) => {
      signInWithPopup(getAuth(), GithubProvider)
        .then((result: UserCredential) => {
          const credential: OAuthCredential | null =
            GithubAuthProvider.credentialFromResult(result);
          const userData = {
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
    {
      result,
      credential,
    }: { result: UserCredential; credential: OAuthCredential },
  ): void {
    const { displayName, email, photoURL } = result.user;
    commit('setUser', {
      name: displayName,
      email,
      photoURL,
    });
    const accessToken: string | undefined = credential.accessToken;
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
      const feedbackMessage = isForce
        ? 'Tempo de sessão esgotado!'
        : 'Usuário deslogado com sucesso!';
      signOut(getAuth()).then(() => {
        localStorage.clear();
        commit('setNotification', {
          type: isForce ? 'error' : 'success',
          message: feedbackMessage,
        });
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
