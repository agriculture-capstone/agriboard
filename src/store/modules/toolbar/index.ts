import { Module } from 'vuex';
import { ToolbarState } from '@/store/modules/toolbar/types';
import { RootState } from '@/store/types';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import state from './state';

const toolbarModule: Module<ToolbarState, RootState> = {
  state,
  mutations,
  actions,
  getters,
};

export default toolbarModule;
