import Vuex from 'vuex';
import Vue from 'vue';

import app from './modules/app';
import toolbar from './modules/toolbar';
import drawer from './modules/drawer';
import { RootState } from '@/store/types';

Vue.use(Vuex);

/**
 * The Vuex store
 */
const store = new Vuex.Store<RootState>({
  modules: {
    app,
    toolbar,
    drawer,
  },
});

if (module.hot) {
  // accept actions and mutations as hot modules
  module.hot.accept(['./modules/app'], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output
    const appModule = require('./modules/app').default;
    const toolbarModule = require('./modules/toolbar').default;
    const drawerModule = require('./modules/drawer').default;
    // swap in the new actions and mutations
    store.hotUpdate({
      modules: {
        app: appModule,
        toolbar: toolbarModule,
        drawer: drawerModule,
      },
    });
  });
}

export default store;
