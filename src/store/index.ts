import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';
// Módulos
import AuthModule from './Auth';
import StorageModule from './Storage';
import ValidationModule from './Validation';
import NotificationModule from './Notification';
import TADModule from './TAD';

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
});

export default createStore({
  modules: {
    Auth: AuthModule,
    Storage: StorageModule,
    Validation: ValidationModule,
    Notification: NotificationModule,
    TAD: TADModule,
  },
  plugins: [vuexLocalStorage.plugin],
});
