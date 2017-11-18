import { MutationTypes, AddRightButtonPayload, ToolbarState, SetRightButtonsPayload, ClearRightButtonsPayload } from '@/store/modules/toolbar/types';
import { MutationsComposed } from '@/store/types';

const mutations: MutationsComposed<ToolbarState> = {

  [MutationTypes.ADD_RIGHT_BUTTON] (state: ToolbarState, { button }: AddRightButtonPayload) {
    state.rightButtons.push(button);
  },

  [MutationTypes.SET_RIGHT_BUTTONS] (state: ToolbarState, { buttons }: SetRightButtonsPayload) {
    state.rightButtons = buttons;
  },

  [MutationTypes.CLEAR_RIGHT_BUTTONS] (state: ToolbarState, {}: ClearRightButtonsPayload) {
    state.rightButtons = [];
  },

};

export default mutations;
