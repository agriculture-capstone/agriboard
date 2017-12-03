import { DrawerState, MutationType, SetDrawerShownPayload, ToggleDrawerPayload, SetDrawerLockedPayload } from './types';
import { MutationHandlers, RootState } from '@/store/types';

const mutations: MutationHandlers<DrawerState> = {
  /**
   * Set the state of the drawer to open or closed.
   * Will have no effect if the drawer is locked.
   *
   * @param state Previous app state
   * @param payload - Payload to mutation
   * @param payload.open - whether to open or close the drawer
   */
  [MutationType.SET_DRAWER_SHOWN](state: DrawerState, { open }: SetDrawerShownPayload) {
    if (!state.drawerLocked) {
      state.drawerShown = open;
    }
  },

  /**
   * Toggle the drawer state (open|closed).
   * Will have no effect if the drawer is locked
   *
   * @param state - Previous app state
   * @param payload - Payload to mutation
   */
  [MutationType.TOGGLE_DRAWER](state: DrawerState, { }: ToggleDrawerPayload) {
    if (!state.drawerLocked) {
      state.drawerShown = !state.drawerShown;
    }
  },

  /**
   * Set the drawer state (locked|unlocked).
   * Will also close the drawer if set to locked
   *
   * @param state - Previous app state
   * @param payload - Payload to mutation
   * @param payload.locked - Where to lock or unlock the drawer
   */
  [MutationType.SET_DRAWER_LOCKED](state: DrawerState, { locked }: SetDrawerLockedPayload) {
    state.drawerLocked = locked;
    if (state.drawerLocked) {
      state.drawerShown = false;
    }
  },
};

export default mutations;
