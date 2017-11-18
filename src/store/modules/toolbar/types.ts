import { RightButton } from '@/models/toolbar';

/*--------------------- Mutations ---------------------*/

/** Mutation types for toolbar module */
export enum MutationTypes {
  ADD_RIGHT_BUTTON = 'addRightButton',
  SET_RIGHT_BUTTONS = 'setRightButtons',
  CLEAR_RIGHT_BUTTONS = 'clearRightButtons',
}

/** Payload for addButton */
export interface AddRightButtonPayload {
  button: RightButton;
}

/** Payload for setRightButtons */
export interface SetRightButtonsPayload {
  buttons: RightButton[];
}

/** Payload for clearRightButtons */
export interface ClearRightButtonsPayload {

}

/*--------------------- Actions ---------------------*/

/** Action types for toolbar module */
export enum ActionTypes {

}

/*--------------------- Getters ---------------------*/

/** Getter types for toolbar module */
export enum GetterTypes {

}

/*---------------------- State ----------------------*/

/** State structure for toolbar module */
export interface ToolbarState {
  rightButtons: RightButton[];
}
