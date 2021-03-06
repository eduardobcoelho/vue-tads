import router from '@/router';
import { GoogleProvider, GithubProvider } from '@/plugins/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  signInWithEmailAndPassword,
  updatePassword,
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
import { ISigninReturn, ICadasterModel, INotification } from '@/types';
import { getAuthErrorMessage } from '@/composable';

let authProvider: typeof GoogleAuthProvider | typeof GithubAuthProvider =
  GoogleAuthProvider;
let authProviderInstance: GoogleAuthProvider | GithubAuthProvider =
  GoogleProvider;

export default {
  signUp(
    _: ActionContext<void, void>,
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
    _: ActionContext<void, void>,
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
  signIn(_: ActionContext<void, void>, provider = 'google'): void {
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
  }: ActionContext<any, any>): Promise<ISigninReturn | null> {
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
    { commit }: ActionContext<any, any>,
    { result, credential }: ISigninReturn,
  ): void {
    const accessToken: string | undefined = credential
      ? credential.accessToken
      : undefined;
    const { displayName = null, email, photoURL = null } = result.user;
    commit('setUser', {
      uid: result.user.uid,
      name: displayName,
      email,
      photoURL,
    });
    if (accessToken) {
      localStorage.setItem('token', accessToken);
      setTimeout(() => {
        commit('setNotification', {
          type: 'success',
          message: 'Usu??rio autenticado com sucesso!',
        });
      }, 500);
    }
    router.push({ name: 'Home' });
  },
  sendEmailToResetPassword(
    _: ActionContext<void, void>,
    email: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(getAuth(), email)
        .then((resp) => resolve(resp))
        .catch((error) => reject(getAuthErrorMessage(error.code)));
    });
  },
  updateUserPassword(
    { commit }: ActionContext<any, any>,
    payload: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const { currentUser } = getAuth();
      if (currentUser) {
        updatePassword(currentUser, payload)
          .then(() => {
            commit('setNotification', {
              type: 'success',
              message: 'Senha alterada com sucesso!',
            });
            resolve(true);
          })
          .catch((error) => reject(getAuthErrorMessage(error.code)));
      }
    });
  },
  updateUserProfile(
    { commit }: ActionContext<any, any>,
    payload: Partial<User>,
  ): Promise<Auth | false | string> {
    return new Promise((resolve, reject) => {
      const auth: Auth = getAuth();
      if (auth.currentUser) {
        updateProfile(auth.currentUser, payload)
          .then(() => {
            commit('setNotification', {
              type: 'success',
              message: 'Usu??rio atualizado com sucesso!',
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
            'N??o foi poss??vel atualizar este usu??rio. Por favor, logue novamente para efetuar a a????o!',
        });
        reject(false);
      }
    });
  },
  logout(
    { commit }: ActionContext<any, any>,
    isForce: boolean,
  ): Promise<string> {
    try {
      const feedbackMessage: string = isForce
        ? 'Tempo de sess??o esgotado!'
        : 'Usu??rio deslogado com sucesso!';
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
        message: 'N??o foi poss??vel deslogar o usu??rio!',
      });
      return Promise.reject(error);
    }
  },
};
