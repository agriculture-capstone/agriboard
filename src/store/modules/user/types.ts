import UserState from './state';

/*--------------------- Mutations ---------------------*/

/** Mutation types for user module */
export enum MutationType {
  SET_USER_ID = 'set_user_id',
  SET_USER_TYPE = 'set_user_type',
}

/** Payload for setUserId */
export interface SetUserIdPayload {
  userId: string;
}

/** Payload for setUserType */
export interface SetUserTypePayload {
  type: string;
}

/*--------------------- Actions ---------------------*/

/** Action types for user module */
export enum ActionType {

}

/*--------------------- Getters ---------------------*/

/** Getter types for user module */
export enum GetterType {

}

/*---------------------- State ----------------------*/

/** State structure for user module */
export type UserState = typeof UserState;
