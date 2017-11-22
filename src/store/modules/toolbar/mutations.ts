import { MutationType, AddRightButtonPayload, ToolbarState, SetRightButtonsPayload, ClearRightButtonsPayload } from '@/store/modules/toolbar/types';
import { MutationHandlers } from '@/store/types';

const mutations: MutationHandlers<ToolbarState> = {

  [MutationType.ADD_RIGHT_BUTTON] (state: ToolbarState, { button }: AddRightButtonPayload) {
    state.rightButtons.push(button);
  },

  [MutationType.SET_RIGHT_BUTTONS] (state: ToolbarState, { buttons }: SetRightButtonsPayload) {
    state.rightButtons = buttons;
  },

  [MutationType.CLEAR_RIGHT_BUTTONS] (state: ToolbarState, {}: ClearRightButtonsPayload) {
    state.rightButtons = [];
  },

};

export default mutations;
