import { Module } from 'vuex';

import { RootState } from '@/store/types';
import state from './state';
import mutations from './mutations';
import { UserState } from './types';

const userModule: Module<UserState, RootState> = {
  state,
  mutations,
};

export default userModule;
