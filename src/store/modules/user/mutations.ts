import { UserState, MutationType, SetUserIdPayload, SetUserTypePayload } from './types';
import { MutationHandlers, RootState } from '@/store/types';

const mutations: MutationHandlers<UserState> = {

  /**
   * Set the user id
   *
   * @param state - Previous app state
   * @param payload - Payload to mutation
   * @param payload.id - New user id
   */
  [MutationType.SET_USER_ID] (state: UserState, { userId }: SetUserIdPayload) {
    state.userId = userId;
  },

  /**
   * Set the type of the current user
   */
  [MutationType.SET_USER_TYPE] (state: UserState, { type }: SetUserTypePayload) {
    state.type = type;
  },
};

export default mutations;
