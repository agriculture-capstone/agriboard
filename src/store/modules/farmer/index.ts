import { Module } from 'vuex';

import createCoreModule from '@/utils/createCoreModule';
import { Farmer } from './types';
import getters from './getters';

export default createCoreModule('farmer', getters);
