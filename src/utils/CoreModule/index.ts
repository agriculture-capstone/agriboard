import * as uuid4 from 'uuid/v4';
import * as R from 'ramda';

import { CoreModuleState, StoreRow, MutationHandlers, ActionHandlers, CreationMutateRow, UpdateMutateRow } from '@/store/types';
import { updateElementByProp } from '@/utils/list/updateElement';
import { hasUUID } from './utils';
import api from '@/utils/api';

type CreatePayload<T> = { row: CreationMutateRow<T> };
type UpdatePayload<T> = { row: UpdateMutateRow<T> };

function createMutations<T>(): MutationHandlers<CoreModuleState<T>> {
  return {
    createRow (state: CoreModuleState<T>, { row }: CreatePayload<T>) {
      state.rows.push(row);
    },

    updateRow (state: CoreModuleState<T>, { row }: UpdatePayload<T>) {
      state.rows = updateElementByProp('uuid', row, state.rows);
    },
  };
}

function createActions<Row>(): ActionHandlers<CoreModuleState<Row>> {
  return {
    async createRow ({ commit }, { row }: CreatePayload<Row>) {
      let creationRow: CreationMutateRow<Row>;

      if (hasUUID(row)) {
        // Already been created locally
        creationRow = row;
      } else {
        creationRow = StoreUtils.convertCreationRow(newRow);

        // Store the local copy
        dispatch(createRowLocal(creationRow));
      }

      const { uuid } = creationRow;


      // Send the new row to the core
      const api = new CoreAPI(path);

      // Create new block for block scoped variables (let) to avoid errors
      { let lastModified: string;

        // Attempt to create resource on core
        try {
          ({ lastModified } = await api.create(creationRow));
        } catch (err) {
          // Failed to create resource on Core
          if (isResponse(err)) {
            const response = err;
            // tslint:disable-next-line:no-console
            console.log(response.status);

            return uuid;
          } else if (isNetworkError(err)) {
            // Currently no network, let request fail and allow sync service to resolve
            return uuid;
          } else {
            // Not a response error, should be logged
            // tslint:disable-next-line:no-console
            console.log(err.message || err);
            return uuid;
          }
        }

        // Create updated model and update store
        dispatch(createRowRemote(uuid, lastModified));
        return uuid;
      }
    },

    async updateRow ({ commit }, { row }: UpdatePayload<T>) {

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
