import { Module } from 'vuex';

import state from './state';
import mutations from './mutations';
import { RootState } from '@/store/types';
import { DrawerState } from './types';

const drawerModule: Module<DrawerState, RootState> = {
  state,
  mutations,
};

export default drawerModule;
