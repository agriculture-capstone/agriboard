import { ActionContext } from 'vuex';

import { MutationHandlers, RootState, ActionHandlers } from '@/store/types';

/**
 * Create a builder to create mutation callers
 *
 * @param mutationHandlers - Handlers for committed mutations
 *
 * @template M - Root state for module
 * @template H - Enum containing possible mutation types for module
 *
 * @returns function used to build `callHandler` functions
 */
export function createCallMutationBuilder<M, H>(mutationHandlers: MutationHandlers<M>) {

  /**
   * @param mutationType - The type of handler {callMutationHandler} function will call
   *
   * @template S - The specific state this handler alters
   * @template P - The expected structure for mutation payload
   */
  return function buildMutationCaller<S extends Partial<M>, P>(mutationType: string) {

    /**
     * Call the mutation handler
     *
     * @param prevState - The state received by mutation handler, will not be mutated
     * @param payload - The payload for the mutation handler
     *
     * @throws TypeError - If payload is mutated by action handler
     *
     * @returns Mutated state from mutation handler
     */
    return function callMutationHandler(prevState: S, payload: P) {
      // Create a deep clone of the prevState
      // Cast nextState to any as it is only partial state, and handler requires R (not type safe!)
      const nextState = JSON.parse(JSON.stringify(prevState)) as any;

      // Call mutation handler with frozen payload
      mutationHandlers[mutationType](nextState, Object.freeze(payload));

      return nextState;
    };
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
