import AppState from './state';

/*--------------------- Mutations ---------------------*/

/** Mutation types for app module */
export enum MutationType {
  SET_TITLE = 'set_title',
  SET_TOOLBAR_SHOWN = 'set_toolbar_shown',
}

/** Payload for setTitle */
export interface SetTitlePayload {
  title: string;
}

/** Payload for setting toolbar visibility */
export interface SetToolbarShownPayload {
  shown: boolean;
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
export type AppState = typeof AppState;
