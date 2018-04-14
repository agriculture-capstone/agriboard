import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';

import app from './modules/app';
import getters from './getters';
import farmer from './modules/farmer';
import milk from './modules/milk';
import loan from './modules/loan';
import payment from './modules/payment';
import delivery from './modules/delivery';
import memo from './modules/memo';
import trader from './modules/trader';
import admin from './modules/admin';
import monitor from './modules/monitor';
import user from './modules/user';
import { RootState } from '@/store/types';

Vue.use(Vuex);

/**
 * The Vuex store
 */
const store = new Vuex.Store<RootState>({
  getters,
  modules: {
    app,
    farmer,
    milk,
    loan,
    delivery,
    memo,
    trader,
    admin,
    monitor,
    payment,
    user,
  },
  plugins: [
    createPersistedState(),
  ],
});

if (module.hot) {
  // accept actions and mutations as hot modules
  module.hot.accept(['./modules/app'], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output
    const appModule = require('./modules/app').default;
    const farmerModule = require('./modules/farmer').default;
    const milkModule = require('./modules/milk').default;
    const loanModule = require('./modules/loan').default;
    const paymentModule = require('./modules/payment').default;
    const deliveryModule = require('./modules/delivery').default;
    const memoModule = require('./modules/memo').default;
    const traderModule = require('./modules/trader').default;
    const adminModule = require('./modules/admin').default;
    const monitorModule = require('./modules/monitor').default;
    const userModule = require('./modules/user').default;
    // swap in the new actions and mutations
    store.hotUpdate({
      modules: {
        app: appModule,
        farmer: farmerModule,
        milk: milkModule,
        loan: loanModule,
        payment: paymentModule,
        delivery: deliveryModule,
        memo: memoModule,
        trader: traderModule,
        admin: adminModule,
        monitor: monitorModule,
        user: userModule,
      },
    });
  });
}

export default store;
