import { storage } from '@/plugins/firebase';
import { IProfileUploadImage } from './types';
import { ActionContext } from 'vuex';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default {
  uploaderUserProfileImage(
    { commit }: ActionContext<void, void>,
    { uid, file }: IProfileUploadImage,
  ): Promise<boolean> {
    const userStorage = ref(storage, `users/${uid}/profile.jpg`);
    return new Promise((resolve, reject) => {
      uploadBytes(userStorage, file)
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
  getUserProfileImage(
    _: ActionContext<void, void>,
    userUid: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      getDownloadURL(ref(storage, `users/${userUid}/profile.jpg`))
        .then((url: string) => resolve(url))
        .catch((error) => reject(error));
    });
  },
};
