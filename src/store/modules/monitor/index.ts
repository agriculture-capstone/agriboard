import { Module } from 'vuex';

import createCoreModule from '@/utils/createCoreModule';
import { Monitor } from './types';
import getters from './getters';

export default createCoreModule('monitor', getters);
