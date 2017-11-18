import * as AppTypes from './modules/app/types';
import * as ToolbarTypes from './modules/toolbar/types';
import { Getter, Mutation, Action } from 'vuex';

export interface State {
  app: AppTypes.AppState;
  toolbar: ToolbarTypes.ToolbarState;
}

export type Mutations
  = AppTypes.MutationTypes
  | ToolbarTypes.MutationTypes;

export type Actions
  = AppTypes.ActionTypes
  | ToolbarTypes.ActionTypes;

export type Getters
  = AppTypes.GetterTypes
  | ToolbarTypes.GetterTypes;

export interface GettersComposed<T> {
  [key: string]: Getter<T, State>;
}

export interface MutationsComposed<T> {
  [key: string]: Mutation<T>;
}

export interface ActionsComposed<T> {
  [key: string]: Action<T, State>;
}
