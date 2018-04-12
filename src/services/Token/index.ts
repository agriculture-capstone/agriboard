import * as R from 'ramda';
import Vue, { ComponentOptions, VueConstructor } from 'vue';
import { removeListener } from 'cluster';

/** Function listening to token changes */
type Listener = (token: string) => void;

/** Array of listeners */
type Listeners = Listener[];

const LISTENERS = Symbol('token listeners');
const LISTENER = Symbol('Vue instance listener for token service');
// Give abstract name (still not secure)
const TOKEN_KEY = 'c7eda379-e34e-4700-b1f3-6aacd2630a78';

/**
 * Definition for mixin adding token as compouted property
 */
export type TokenMixin = (VueConstructor | ComponentOptions<Vue>) & {
  $token: string;
};

/**
 * Definition for mixin to add listener for when token is cleared
 */
export type ClearedTokenListenerMixin = (VueConstructor | ComponentOptions<Vue>) & {
  onEmptyToken?(): void;
};

interface TokenService {
  /** The jwt */
  token: string;
  /** Mixin for adding token to instance */
  tokenMixin(): TokenMixin;
  /** Mixin for adding listener to token being cleared */
  clearedTokenListenerMixin(): ClearedTokenListenerMixin;
  /** Add listener for token changes */
  addListener(fn: Listener): void;
  /** Remove listener for token changes */
  removeListener(fn: Listener): void;
}

// tslint:disable-next-line:variable-name
const TokenService: TokenService = {
  /** Getter for token */
  get token () {
    // -- OVERRIDE -- //
    // Override to change method of storage
    return window.localStorage.getItem(TOKEN_KEY);
    // -- END OVERRIDE --//
  },
  /** Setter for token */
  set token (value: string) {
    // -- OVERRRIDE -- //
    // Override to change method of storage
    window.localStorage.setItem(TOKEN_KEY, value);
    // -- END OVERRIDE -- //
    // Update listeners
    R.map(
      (fn: Listener) => setTimeout(R.partial(fn, [value]), 0),
    )((TokenService as any)[LISTENERS]);
  },
  /** Add listener */
  addListener (fn) {
    (TokenService as any)[LISTENERS].push(fn);
  },
  /** Remove listener */
  removeListener (fn) {
    (TokenService as any)[LISTENERS] = R.without([fn], (TokenService as any)[LISTENERS]);
  },
  /** Create Vue mixin adding computed property for $token */
  tokenMixin () {
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
  /** cleared token mixin */
  clearedTokenListenerMixin () {
    return {
      /** Created hook */
      created () {
        const listener = (value: string) => {
          if (!value) {
            const onEmptyToken = (this as any).$options.onEmptyToken;
            onEmptyToken && onEmptyToken.call(this);
          }
        };
        TokenService.addListener(listener);

        // Hide listener on vue instance w/ symbol
        (this as any)[LISTENER] = listener;
      },
      /** beforeDestroy hook */
      beforeDestroy () {
        const listener = (this as any)[LISTENER];
        TokenService.removeListener(listener);
      },
    };
  },
};

(TokenService as any)[LISTENERS] = [];

export default TokenService;
