import { MutationType, AddRightButtonPayload, ToolbarState, SetRightButtonsPayload, ClearRightButtonsPayload } from '@/store/modules/toolbar/types';
import { MutationHandlers } from '@/store/types';
import logger from '@/utils/logger';

const mutations: MutationHandlers<ToolbarState> = {

  [MutationType.ADD_RIGHT_BUTTON] (state: ToolbarState, { button, position }: AddRightButtonPayload) {
    if (position < 0 || position > state.rightButtons.length) {
      throw new Error(`Attempted to add button at position ${position}, exceeded length of existing toolbar buttons: %{state.rightButtons.length}`);
    } else {
      const newRightButtons = [...state.rightButtons];
      newRightButtons.splice(position, 0, button);

      state.rightButtons = newRightButtons;
    }
  },

  [MutationType.SET_RIGHT_BUTTONS] (state: ToolbarState, { buttons }: SetRightButtonsPayload) {
    state.rightButtons = buttons;
  },

  [MutationType.CLEAR_RIGHT_BUTTONS] (state: ToolbarState, {}: ClearRightButtonsPayload) {
    state.rightButtons = [];
  },

};

export default mutations;
