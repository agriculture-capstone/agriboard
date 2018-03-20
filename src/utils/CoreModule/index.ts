import * as uuid4 from 'uuid/v4';
import * as R from 'ramda';

import { CoreModuleState, StoreRow, MutationHandlers, ActionHandlers, CreationMutateRow, UpdateMutateRow, CoreRow } from '@/store/types';
import { updateElementByProp } from '@/utils/list/updateElement';
import { hasUUID, isResponse } from './utils';
import CoreAPI, { CorePath } from '@/utils/CoreAPI';

type CreatePayload<T> = { row: CreationMutateRow<T> };
type UpdatePayload<T> = { row: UpdateMutateRow<T> };
type SetPayload<T> = { row: CreationMutateRow<T> };

/*--------------------------------- Types ---------------------------------*/

/** Different types of modules */
export type CoreModuleName = 'farmer' | 'milk' | 'export' | 'loan';

/*--------------------------------- Functions ---------------------------------*/

function createMutations<Row>(): MutationHandlers<CoreModuleState<Row>> {
  return {
    setRows (state: CoreModuleState<Row>, { row }: SetPayload<Row>) {

    },

    createRow (state: CoreModuleState<Row>, { row }: CreatePayload<Row>) {
      state.rows.push(row);
    },

    updateRow (state: CoreModuleState<Row>, { row }: UpdatePayload<Row>) {
      state.rows = updateElementByProp('uuid', row, state.rows);
    },
  };
}

function createActions<Row>(path: CorePath): ActionHandlers<CoreModuleState<Row>> {
  return {
    async createRow ({ commit }, { row }: CreatePayload<Row>) {

      const payload: CreationMutateRow<Row> = {
        ...(row as any),
        lastModified: new Date().toUTCString(),
        uuid: uuid4(),
        status: 'local',
      };
      commit('createRow', payload);

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
          uuid,
          lastModified,
          status: 'clean',
        });
        return uuid;
      }
    },

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
      commit('updateRow', payload);

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
          ...(coreRow as any),
          status: 'clean',
        });
        return uuid;
      }
    },
  };
}

function createInitialState<T>(): CoreModuleState<T> {
  return {
    rows: [] as StoreRow<T>[],
    isDirty: false,
    lastSynced: new Date(0).toUTCString(),
  };
}
