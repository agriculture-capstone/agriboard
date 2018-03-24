import { AppState, MutationType, SetTitlePayload, SetToolbarShownPayload } from './types';
import { MutationHandlers, RootState } from '@/store/types';

const mutations: MutationHandlers<AppState> = {

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

  /**
   * Set the visibility of the toolbar
   */
  [MutationType.SET_TOOLBAR_SHOWN] (state: AppState, { shown }: SetToolbarShownPayload) {
    state.toolbarShown = shown;
  },
};

export default mutations;
