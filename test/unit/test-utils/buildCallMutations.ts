import { MutationsComposed, Mutation } from '@/store/types';

/**
 * Create a function that composes mutation callers
 *
 * @param mutations - The mutations available to the builder
 */
export function createCallMutationsBuilder<T extends Partial<Mutation>, M>(mutations: MutationsComposed<M>) {

  /**
   * Build a function that calls specific mutation handlers
   *
   * @param type - The type of mutation handler to call
   */
  return function buildCallMutation<S extends Partial<M>, P>(type: T) {

    /**
     * Call a mutation handler
     *
     * @param prevState - Input state that will not be mutated
     * @param payload - The payload
     *
     * @throws TypeError - if payload is mutated
     *
     * @returns resulting state
     */
    return (prevState: S, payload: P): S => {
      // Create a deep clone of the prevState
      const nextState = JSON.parse(JSON.stringify(prevState));

      // Call mutation handler with frozen payload
      mutations[type](nextState, Object.freeze(payload));

      return nextState;
    };
  };
}
