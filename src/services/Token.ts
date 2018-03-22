import * as R from 'ramda';
import Vue, { ComponentOptions, VueConstructor } from 'vue';
import { removeListener } from 'cluster';


// Give abstract name (still not secure)
const TOKEN_KEY = 'c7eda379-e34e-4700-b1f3-6aacd2630a78';

/**
 * Definition for mixin created by TokenService
 */
export type TokenMixin = (VueConstructor | ComponentOptions<Vue>) & {
  $token: string;
};

interface TokenService {
  /** The jwt */
  token: string;
  mixin(): TokenMixin;
}

// tslint:disable-next-line:variable-name
const TokenService: TokenService = {
  // Getter for token
  get token () {
    // -- OVERRIDE -- //
    // Override to change method of storage
    return window.localStorage.getItem(TOKEN_KEY);
    // -- END OVERRIDE --//
  },
  // Setter for token
  set token (value: string) {
    // -- OVERRRIDE -- //
    // Override to change method of storage
    window.localStorage.setItem(TOKEN_KEY, value);
    // -- END OVERRIDE -- //
  },
  /** Create Vue mixin adding computed property for $token */
  mixin () {
    return {
      computed: {
        $token: {
          /** Getter for $token */
          get () {
            return TokenService.token;
          },
          /** Setter for $token */
          set (value: string) {
            TokenService.token = value;
          },
        },
      },
      // typescript complains about missing $token, but we have to let vue's
      // reactivity system handle this property
    } as any as TokenMixin;
  },
};

export default TokenService;
