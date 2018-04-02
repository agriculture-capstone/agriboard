import { Module } from 'vuex';

import createCoreModule from '@/utils/createCoreModule';
import { Admin } from './types';
import getters from './getters';

export default createCoreModule('admin', getters);
