import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';
// Módulos
import TADModule from './TAD';

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
});

export default createStore({
  modules: {
    TAD: TADModule,
  },
  plugins: [vuexLocalStorage.plugin],
});
