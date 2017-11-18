import Vuex from 'vuex';
import Vue from 'vue';

import app from './modules/app';
import { State } from '@/store/types';

Vue.use(Vuex);

const store = new Vuex.Store<State>({
  modules: {
    app,
  },
});

if (module.hot) {
  // accept actions and mutations as hot modules
  module.hot.accept(['./modules/app'], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output
    const appModule = require('./modules/app').default;
    // swap in the new actions and mutations
    store.hotUpdate({
      modules: {
        app: appModule,
      },
    });
  });
}

export default store;
