import * as uuid4 from 'uuid/v4';
import * as R from 'ramda';

import {
  CoreModuleState,
  StoreRow,
  MutationHandlers,
  ActionHandlers,
  CreationMutateRow,
  UpdateMutateRow,
  CoreRow,
  GetterHandlers,
  RootState,
} from '@/store/types';
import { updateElementByProp } from '@/utils/list/updateElement';
import { hasUUID, isResponse, getModulePath } from './utils';
import CoreAPI, { CorePath } from '@/utils/CoreAPI';
import { Module } from 'vuex';

/** payload for create */
type CreatePayload<T> = { row: CreationMutateRow<T> };
/** payload for update */
type UpdatePayload<T> = { row: UpdateMutateRow<T> };
/** payload for set */
type SetPayload<T> = { rows: CreationMutateRow<T>[] };

/*--------------------------------- Types ---------------------------------*/

/** Different types of modules */
export type CoreModuleName
  = 'farmer'
  | 'milk'
  | 'delivery'
  | 'memo'
  | 'loan'
  | 'trader'
  | 'admin'
  | 'monitor'
  | 'payment'
  ;

/*--------------------------------- Functions ---------------------------------*/

function createMutations<Row>(): MutationHandlers<CoreModuleState<Row>> {
  return {
    /** set rows mutation */
    setRows (state: CoreModuleState<Row>, { rows }: SetPayload<Row>) {
      state.rows = rows;
    },

    /** create row mutations */
    createRow (state: CoreModuleState<Row>, { row }: CreatePayload<Row>) {
      state.rows.push(row);
    },

    /** update row mutations */
    updateRow (state: CoreModuleState<Row>, { row }: UpdatePayload<Row>) {
      state.rows = updateElementByProp('uuid', row, state.rows);
    },
  };
}

function createActions<Row>(path: CorePath): ActionHandlers<CoreModuleState<Row>> {
  return {

    /** create row action */
    async createRow ({ commit }, { row }: CreatePayload<Row>) {

      let payload: CreationMutateRow<Row>;
      if (row.uuid && row.status && row.lastModified) {
        payload = row;
      } else {
        payload = {
          ...(row as any),
          lastModified: new Date().toUTCString(),
          uuid: uuid4(),
          status: 'local',
        };
        commit('createRow', { row: payload });
      }

      const { uuid } = payload;

      // Send the new row to the core
      const api = new CoreAPI(path);

      // Create new block for block scoped variables (let) to avoid errors
      { let lastModified: string;

        // Attempt to create resource on core
        try {
          ({ lastModified } = await api.create(payload));
        } catch (err) {
          // Failed to create resource on Core
          if (isResponse(err)) {
            const response = err;
            // tslint:disable-next-line:no-console
            console.log(response.status);

            return uuid;
          } else {
            // Not a response error, should be logged
            // tslint:disable-next-line:no-console
            console.log(err.message || err);
            return uuid;
          }
        }

        // Create updated model and update store
        commit('updateRow', {
          row: {
            uuid,
            lastModified,
            status: 'clean',
          },
        });
        return uuid;
      }
    },

    /** update row action */
    async updateRow ({ commit, state }, { row }: UpdatePayload<Row>) {
      if (!hasUUID(row)) {
        throw new Error('Update must contain UUID');
      }
      const { uuid } = row;
      const payload = {
        ...(row as any),
        lastModified: new Date().toUTCString(),
        status: 'modified',
      } as UpdateMutateRow<Row>;

      // Update the row in store
      commit('updateRow', { row: payload });

      // Send update to the core
      const api = new CoreAPI(path);

      { let coreRow: CoreRow<Row>;

        try {
          ({ row: coreRow } = await api.update<any>(payload));
        } catch (err) {
          // Failed to create resource on Core
          if (isResponse(err)) {
            // TODO: Deal with different core errors
            const response = err;
            // tslint:disable-next-line:no-console
            console.log(response.status);
            return uuid;
          } else {
            // Not a response error, should be logged
            // TODO: Log me
            // tslint:disable-next-line:no-console
            console.log(err.message || err);
            return uuid;
          }
        }

        // TODO: Should be getting the response from core w/ the value of the updated row

        // Create updated model and update store
        commit('updateRow', {
          row: {
            ...(coreRow as any),
            status: 'clean',
          },
        });
        return uuid;
      }
    },
  };
}

function createState<Row>(): CoreModuleState<Row> {
  return {
    rows: [] as StoreRow<Row>[],
    isDirty: false,
    lastSynced: new Date(0).toUTCString(), // Not being used
  };
}

/** Create a core store module */
function createCoreModule<Row>(name: CoreModuleName, getters: GetterHandlers<CoreModuleState<Row>>): Module<CoreModuleState<Row>, RootState> {
  return {
    getters,
    namespaced: true,
    actions: createActions<Row>(getModulePath(name)),
    mutations: createMutations<Row>(),
    state: createState<Row>(),
  };
}

export default createCoreModule;
