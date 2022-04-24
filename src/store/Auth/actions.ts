import { getAuth, signOut } from 'firebase/auth';
import router from '@/router';

export default {
  logout(): Promise<string> {
    try {
      const successMessage = 'Usuário deslogado com sucesso!';
      signOut(getAuth()).then(() => {
        localStorage.clear();
        router.push({ name: 'Login' });
      });
      return Promise.resolve(successMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
