import { Module } from 'vuex';

import { RootState } from '@/store/types';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { AppState } from './types';

const appModule: Module<AppState, RootState> = {
  state,
  mutations,
  actions,
  getters,
};

export default appModule;
