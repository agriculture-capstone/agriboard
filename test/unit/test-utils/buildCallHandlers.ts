import { ActionContext } from 'vuex';
import * as deepFreeze from 'deep-freeze';

import { MutationHandlers, RootState, ActionHandlers } from '@/store/types';

/**
 * Create a function to call a mutation
 *
 * @param mutationHandlers - Mutation handlers for module under test
 *
 * @template M - Module state for module under test
 * @template H - Enum containing possible mutation types for module under test
 *
 * @returns callMutationHandler function to call mutations
 */
export function buildCallMutationHandler<M, H>(mutationHandlers: MutationHandlers<M>) {

  /**
   * Call the mutation handler
   *
   * @param prevState - The state received by mutation handler, will not be mutated
   * @param payload - The payload for the mutation handler
   * @param mutationType - The type of mutation to call
   *
   * @throws TypeError - If payload is mutated by action handler
   * @throws TypeError - If any properties of state are mutated
   *
   * @returns New state from mutation handler
   */
  return function callMutationHandler<S extends Partial<M>, P>(prevState: S, payload: P, mutationType: string): S {
    // Create a deep clone of the prevState
    // Cast nextState to any as it is only partial state, and handler requires R (not type safe!)
    const nextState = freezeProps(JSON.parse(JSON.stringify(prevState))) as any;

    // Call mutation handler with frozen payload
    mutationHandlers[mutationType](nextState, Object.freeze(payload));

    return nextState;
  };
}

/**
 * Create a builder to generate action callers
 *
 * @param actionHandlers - The action handlers for the module
 *
 * @template H - Enum containing possible mutation handler types for the module
 *
 * @returns function used to build `callHandler` functions
 */
export function createCallActionBuilder<S extends object, H>(actionHandlers: ActionHandlers<S>) {

  /**
   * Build a function to call the specific action type
   *
   * @param actionType - The type of action to call
   *
   * @template P - The expected structure for payload (payload interface)
   */
  return function buildCaller<P>(actionType: string) {

    /**
     * Call the action handler using the injected context and a payload
     */
    return function callActionHandler(injectee: Partial<ActionContext<RootState, S>>, payload: P) {
      return (actionHandlers as any)[actionType](injectee, Object.freeze(payload));
    };
  };
}

/*------------------------------- Helper Methods -------------------------------*/

/**
 * Recursively freeze the props of `o`
 *
 * Does not freeze the core object, as the root module state can be mutated.
 * Prevents the properties from being mutated.
 *
 * @param o - Object to freeze properties
 */
function freezeProps(o: { [key: string]: any }) {
  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
    && o[prop] !== null
    && (typeof o[prop] === 'object' || typeof o[prop] === 'function')
    && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
}
