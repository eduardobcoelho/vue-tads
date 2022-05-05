import { storage } from '@/plugins/firebase';
import { IProfileUploadImage } from './types';
import { ActionContext } from 'vuex';
import { ref, uploadBytes } from 'firebase/storage';

export default {
  uploaderUserProfileImage(
    { commit }: ActionContext<void, void>,
    payload: IProfileUploadImage,
  ): Promise<boolean> {
    const userStorage = ref(storage, `users/${payload.uid}/profile.jpg`);
    return new Promise((resolve, reject) => {
      uploadBytes(userStorage, payload.file)
        .then(() => resolve(true))
        .catch((error) => {
          commit('setNotification', {
            type: 'error',
            message: 'Não foi possível alterar a foto do usuário',
          });
          reject(error);
        });
    });
  },
};
