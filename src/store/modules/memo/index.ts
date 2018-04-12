import { Module } from 'vuex';

import createCoreModule from '@/utils/createCoreModule';
import { Memo } from './types';
import getters from './getters';

export default createCoreModule('memo', getters);
