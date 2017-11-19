import { AppState, MutationType, SetDrawerShownPayload, ToggleDrawerPayload, SetDrawerLockedPayload, SetTitlePayload } from './types';
import { MutationsComposed, State } from '@/store/types';

const mutations: MutationsComposed<AppState> = {
  /**
   * Set the state of the drawer to open or closed.
   * Will have no effect if the drawer is locked.
   *
   * @param state Previous app state
   * @param payload - Payload to mutation
   * @param payload.open - whether to open or close the drawer
   */
  [MutationType.SET_DRAWER_SHOWN](state: AppState, { open }: SetDrawerShownPayload) {
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
  [MutationType.TOGGLE_DRAWER](state: AppState, { }: ToggleDrawerPayload) {
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
  [MutationType.SET_DRAWER_LOCKED](state: AppState, { locked }: SetDrawerLockedPayload) {
    state.drawerLocked = locked;
    if (state.drawerLocked) {
      state.drawerShown = false;
    }
  },

  /**
   * Set the application title
   *
   * @param state - Previous app state
   * @param payload - Payload to mutation
   * @param payload.title - New title for application
   */
  [MutationType.SET_TITLE] (state: AppState, { title }: SetTitlePayload) {
    state.title = title;
  },
};

export default mutations;
