import * as AppTypes from './modules/app/types';
import * as ToolbarTypes from './modules/toolbar/types';
import { Getter, Mutation, Action, MutationTree, ActionTree, GetterTree } from 'vuex';

export interface RootState {
  app: AppTypes.AppState;
  toolbar: ToolbarTypes.ToolbarState;
}

/** Composed mutation types */
export type MutationType
  = AppTypes.MutationType
  | ToolbarTypes.MutationType;

type Commit = (type: MutationType, payload: any) => void;

/** Composed action types */
export type ActionType
  = (AppTypes.ActionType
  | ToolbarTypes.ActionType
    /* Due to not every module having an action, this is necessary to
    *  ensure it has a string type so we can use in dispatch.
    *  This is a limitation of string enums used for types */
  ) & 'DO_NOT_USE_A';

/** Composed getter types */
export type GetterType
  = (AppTypes.GetterType
  | ToolbarTypes.GetterType
  /* Refer to comment on {Action} */
  ) & 'DO_NOT_USE_G';

/** Structure of vuex mutation handlers */
export type MutationHandlers<S>  = MutationTree<S>;

/** Structure of vuex action handlers */
export type ActionHandlers<S> = ActionTree<S, RootState>;

/** Structure of vuex getter handlers */
export type GetterHandlers<S> = GetterTree<S, RootState>;
