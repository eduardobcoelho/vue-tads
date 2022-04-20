import { createStore } from 'vuex';
import TADModule from './TAD';

export default createStore({
  modules: {
    TAD: TADModule,
  },
});
