import { ToolbarState } from '@/store/modules/toolbar/types';
import Icon from '@/models/icons';
import { MutationTypes } from '@/store/modules/app/types';

const toolbarState: ToolbarState = {
  rightButtons: [{
    name: 'Testing!',
    mutation: MutationTypes.SET_DRAWER_SHOWN,
    icon: Icon.MENU,
    type: 'mutation',
  }],
};

export default toolbarState;
