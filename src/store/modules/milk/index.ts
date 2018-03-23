import { Module } from 'vuex';

import createCoreModule from '@/utils/createCoreModule';
import { Milk } from './types';
import getters from './getters';

export default createCoreModule('milk', getters);
