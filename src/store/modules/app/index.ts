import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { Module } from 'vuex';
import { State } from '@/store/types';
import { AppState } from '@/store/modules/app/types';

const appModule: Module<AppState, State> = {
  state,
  mutations,
  actions,
  getters,
};

export default appModule;
