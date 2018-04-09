import { Module } from 'vuex';

import createCoreModule from '@/utils/createCoreModule';
import { Payment } from './types';
import getters from './getters';

export default createCoreModule('payment', getters);
