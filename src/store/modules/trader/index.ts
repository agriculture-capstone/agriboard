import { Module } from 'vuex';

import createCoreModule from '@/utils/createCoreModule';
import { Trader } from './types';
import getters from './getters';

export default createCoreModule('trader', getters);
