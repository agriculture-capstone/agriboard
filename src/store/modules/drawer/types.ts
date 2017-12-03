import DrawerState from './state';

/*--------------------- Mutations ---------------------*/

/** Mutation types for app module */
export enum MutationType {
  SET_DRAWER_SHOWN = 'setDrawerShown',
  TOGGLE_DRAWER = 'toggleDrawer',
  SET_DRAWER_LOCKED = 'setDrawerLocked',
}

/** Payload for setDrawerOpen */
export interface SetDrawerShownPayload {
  open: boolean;
}

/** Payload for toggleDrawer */
export interface ToggleDrawerPayload {

}

/** Payload for setDrawerLocked */
export interface SetDrawerLockedPayload {
  locked: boolean;
}

/*--------------------- Actions ---------------------*/

/** Action types for app module */
export enum ActionType {

}

/*--------------------- Getters ---------------------*/

/** Getter types for app module */
export enum GetterType {

}

/*---------------------- State ----------------------*/

/** State structure for app module */
export type DrawerState = typeof DrawerState;
