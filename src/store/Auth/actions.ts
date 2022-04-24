import { getAuth, signOut } from 'firebase/auth';
import router from '@/router';
import { ActionContext } from 'vuex';
import { IStateNotification } from '../Notification/types';

export default {
  logout({ commit }: ActionContext<IStateNotification, any>): Promise<string> {
    try {
      const successMessage = 'Usuário deslogado com sucesso!';
      signOut(getAuth()).then(() => {
        localStorage.clear();
        commit('setNotification', { type: 'success', message: successMessage });
        router.push({ name: 'Login' });
      });
      return Promise.resolve(successMessage);
    } catch (error) {
      commit('setNotification', {
        type: 'error',
        message: 'Não foi possível deslogar o usuário!',
      });
      return Promise.reject(error);
    }
  },
};
