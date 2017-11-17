import * as AppTypes from '@/vuex/modules/app/types';

export interface State {
  app: AppTypes.AppState;
}

export type Mutations
  = AppTypes.MutationTypes;

export type Actions
  = AppTypes.ActionTypes;

export type Getters
  = AppTypes.GetterTypes;
