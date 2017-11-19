import AppState from './state';

/*--------------------- Mutations ---------------------*/

/** Mutation types for app module */
export enum MutationType {
  SET_DRAWER_SHOWN = 'setDrawerShown',
  TOGGLE_DRAWER = 'toggleDrawer',
  SET_DRAWER_LOCKED = 'setDrawerLocked',
  SET_TITLE = 'setTitle',
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

/** Payload for setTitle */
export interface SetTitlePayload {
  title: string;
}

/*--------------------- Actions ---------------------*/

/** Action types for app module */
export enum ActionTypes {

}

/*--------------------- Getters ---------------------*/

/** Getter types for app module */
export enum GetterTypes {

}

/*---------------------- State ----------------------*/

/** State structure for app module */
export type AppState = typeof AppState;
