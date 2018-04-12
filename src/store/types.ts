import * as AppTypes from './modules/app/types';
import { Getter, Mutation, Action, MutationTree, ActionTree, GetterTree } from 'vuex';
import { FarmersState } from '@/store/modules/farmer/types';
import { TraderState } from '@/store/modules/trader/types';
import { MilkState } from '@/store/modules/milk/types';
import { DeliveryState } from '@/store/modules/delivery/types';
import { LoanState } from '@/store/modules/loan/types';
import { AdminState } from '@/store/modules/admin/types';
import { MonitorState } from '@/store/modules/monitor/types';
import { UserState } from '@/store/modules/user/types';

export interface RootState {
  app: AppTypes.AppState;
  farmer: FarmersState;
  milk: MilkState;
  delivery: DeliveryState;
  loan: LoanState;
  trader: TraderState;
  admin: AdminState;
  monitor: MonitorState;
  user: UserState;
}

/** Composed mutation types */
export type MutationType
  = AppTypes.MutationType;

type Commit = (type: MutationType, payload: any) => void;

/** Composed action types */
export type ActionType
  = (AppTypes.ActionType
    /* Due to not every module having an action, this is necessary to
    *  ensure it has a string type so we can use in dispatch.
    *  This is a limitation of string enums used for types */
  ) & 'DO_NOT_USE_A';

/** Composed getter types */
export type GetterType
  = (AppTypes.GetterType
  /* Refer to comment on {Action} */
  ) & 'DO_NOT_USE_G';

/** Structure of vuex mutation handlers */
export type MutationHandlers<S>  = MutationTree<S>;

/** Structure of vuex action handlers */
export type ActionHandlers<S> = ActionTree<S, RootState>;

/** Structure of vuex getter handlers */
export type GetterHandlers<S> = GetterTree<S, RootState>;

export type CoreGetterHandlers<Row> = GetterTree<CoreModuleState<Row>, RootState>;

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
export type UpdateMutateRow<T> = Partial<T> & LastModifiedData & UUIDData & DataStatus;

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

export interface Person {
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  category: string;
  lastModified: string;
}
