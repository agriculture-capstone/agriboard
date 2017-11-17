import { AppState } from './state';

export enum MutationTypes {
  SET_DRAWER_OPEN = 'setDrawerOpen',
  TOGGLE_DRAWER = 'toggleDrawer',
  SET_DRAWER_LOCKED = 'setDrawerLocked',
}

export interface SetDrawerOpenPayload {
  open: boolean;
}

export interface ToggleDrawerPayload {

}

export interface setDrawerLockedPayload {
  locked: boolean;
}

const mutations = {
  /**
   * Set the state of the drawer to open or closed.
   * Will have no effect if the drawer is locked.
   *
   * @param {Object} state Previous app state
   * @param {Object} payload - Payload to mutation
   * @param {boolean} payload.open - whether to open or close the drawer
   */
  [MutationTypes.SET_DRAWER_OPEN](state: AppState, { open }: SetDrawerOpenPayload) {
    if (!state.drawerLocked) {
      state.drawerShown = open;
    }
  },

  /**
   * Toggle the drawer state (open|closed).
   * Will have no effect if the drawer is locked
   *
   * @param {Object} state - Previous app state
   * @param {Object} payload - Payload to mutation
   */
  [MutationTypes.TOGGLE_DRAWER](state: AppState, { }: ToggleDrawerPayload) {
    if (!state.drawerLocked) {
      state.drawerShown = !state.drawerShown;
    }
  },

  /**
   * Set the drawer state (locked|unlocked).
   * Will also close the drawer if set to locked
   *
   * @param {Object} state - Previous app state
   * @param {Object} payload - Payload to mutation
   * @param {boolean} payload.locked - Where to lock or unlock the drawer
   */
  [MutationTypes.SET_DRAWER_LOCKED](state: AppState, { locked }: setDrawerLockedPayload) {
    state.drawerLocked = locked;
    if (state.drawerLocked) {
      state.drawerShown = false;
    }
  },
};
