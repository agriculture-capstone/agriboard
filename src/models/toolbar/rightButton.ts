import Icon from '@/models/icons';
import { ActionType, MutationType } from '@/store/types';

/**
 * Information needed by toolbar to generate a button on the right side
 */
export type RightButton = RightButtonAction | RightButtonMutation;

/** The type of right buttons */
export enum RightButtonType {
  MUTATION = 'mutation',
  ACTION = 'action',
}

/**
 * RightButton that fires action on click
 */
interface RightButtonAction extends RightButtonRoot {
  /**
   * The action that will be fired when the button is clicked
   */
  action: ActionType;

  type: RightButtonType.ACTION;
}

/**
 * RightButton that fires mutation on click
 */
interface RightButtonMutation extends RightButtonRoot {
  /**
   * The mutation that will be fired when button is clicked
   */
  mutation: MutationType;

  type: RightButtonType.MUTATION;
}

/**
 * Root interface for RightButton
 */
interface RightButtonRoot {
  /**
   * Name of the button
   *
   * If there is no icon, this will be displayed
   */
  name: string;

  /**
   * Icon to display as the button
   */
  icon?: Icon;

  /**
   * Type of button
   */
  type: RightButtonType;
}
