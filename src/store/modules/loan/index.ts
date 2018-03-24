import { Module } from 'vuex';

import createCoreModule from '@/utils/createCoreModule';
import { Loan } from './types';
import getters from './getters';

export default createCoreModule('loan', getters);
