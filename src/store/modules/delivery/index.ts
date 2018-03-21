import { Module } from 'vuex';

import createCoreModule from '@/utils/createCoreModule';
import { Delivery } from './types';
import getters from './getters';

export default createCoreModule('delivery', getters);
