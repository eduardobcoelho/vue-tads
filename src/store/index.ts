import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';
// Módulos
import AuthModule from './Auth';
import NotificationModule from './Notification';
import TADModule from './TAD';

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
});

export default createStore({
  modules: {
    Auth: AuthModule,
    Notification: NotificationModule,
    TAD: TADModule,
  },
  plugins: [vuexLocalStorage.plugin],
});
