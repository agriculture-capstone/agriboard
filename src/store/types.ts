import * as AppTypes from './modules/app/types';
import * as ToolbarTypes from './modules/toolbar/types';
import * as DrawerTypes from './modules/drawer/types';
import { Getter, Mutation, Action, MutationTree, ActionTree, GetterTree } from 'vuex';

export interface RootState {
  app: AppTypes.AppState;
  toolbar: ToolbarTypes.ToolbarState;
  drawer: DrawerTypes.DrawerState;
}

/** Composed mutation types */
export type MutationType
  = AppTypes.MutationType
  | ToolbarTypes.MutationType
  | DrawerTypes.MutationType;

type Commit = (type: MutationType, payload: any) => void;

/** Composed action types */
export type ActionType
  = (AppTypes.ActionType
  | ToolbarTypes.ActionType
  | DrawerTypes.ActionType
    /* Due to not every module having an action, this is necessary to
    *  ensure it has a string type so we can use in dispatch.
    *  This is a limitation of string enums used for types */
  ) & 'DO_NOT_USE_A';

/** Composed getter types */
export type GetterType
  = (AppTypes.GetterType
  | ToolbarTypes.GetterType
  | DrawerTypes.GetterType
  /* Refer to comment on {Action} */
  ) & 'DO_NOT_USE_G';

/** Structure of vuex mutation handlers */
export type MutationHandlers<S>  = MutationTree<S>;

/** Structure of vuex action handlers */
export type ActionHandlers<S> = ActionTree<S, RootState>;

/** Structure of vuex getter handlers */
export type GetterHandlers<S> = GetterTree<S, RootState>;

/** Status of a row in store */
export type Status
  = 'local'
  | 'modified'
  | 'clean'
  ;

/** Base state for modules synced with core  */
export interface CoreModuleState<T> {
  lastSynced: string;
  isDirty: boolean;
  rows: StoreRow<T>[];
}

interface DataStatus {
  status: Status;
}

interface LastModifiedData {
  lastModified: string;
}

interface UUIDData {
  uuid: string;
}

/**
 * Row as returned by core
 */
export type CoreRow<T> = T & LastModifiedData & UUIDData;

/**
 * Data model in store
 *
 * @template T Data model for module
 */
export type StoreRow<T> = T & DataStatus & LastModifiedData & UUIDData;

/**
 * Data model for local creation
 *
 * @template T Data model for module
 */
export type CreationMutateRow<T> = StoreRow<T>;

/**
 * Data model for local update
 *
 * @template T Data model for module
 */
export type UpdateMutateRow<T> = Partial<StoreRow<T>>;

/**
 * Data model for thunk item creation
 *
 * @template T Data model for module
 */
export type CreationActionRow<T> = T & Partial<UUIDData>;

/**
 * Data model for thunk item update
 *
 * @template T Data model for module
 */
export type UpdateActionRow<T> = Partial<T> & UUIDData;

/**
 * Data model for sync update
 *
 * @template T Data model for module
 */
export type CoreSyncUpdateRow<T> = Partial<T> & LastModifiedData & UUIDData;

/**
 * Data model for sending creation request to core
 *
 * @template T Data model for module
 */
export type CoreCreationRequest<T> = T & LastModifiedData & UUIDData;

/**
 * Data model for sending update request to core
 *
 * @template T Data model for module
 */
export type CoreUpdateRequest<T> = Partial<T> & LastModifiedData & UUIDData;
