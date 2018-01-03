import AppState from './state';

/*--------------------- Mutations ---------------------*/

/** Mutation types for app module */
export enum MutationType {
  SET_TITLE = 'setTitle',
}

/** Payload for setTitle */
export interface SetTitlePayload {
  title: string;
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
