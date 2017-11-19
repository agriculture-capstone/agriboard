import * as AppTypes from './modules/app/types';
import * as ToolbarTypes from './modules/toolbar/types';
import { Getter, Mutation, Action } from 'vuex';

export interface State {
  app: AppTypes.AppState;
  toolbar: ToolbarTypes.ToolbarState;
}

export type Mutation
  = AppTypes.MutationType
  | ToolbarTypes.MutationTypes;

export type Action
  = (AppTypes.ActionTypes
  | ToolbarTypes.ActionTypes
  /* Due to not every module having an action, this is necessary to
  *  ensure it has a string type so we can use in dispatch.
  *  This is a limitation of string enums (can't intersect) */
  ) & 'DO_NOT_USE';

export type Getter
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
