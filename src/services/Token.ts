import * as R from 'ramda';
import Vue, { ComponentOptions, VueConstructor } from 'vue';
import { removeListener } from 'cluster';

type Listener = (token: string) => void;
type Listeners = Listener[];

// DO NOT EXPORT
const TOKEN = Symbol('jwt token');
const LISTENERS = Symbol('token listeners');
const LISTENER = Symbol('Vue instance listener for token service');
// TODO: In future retrieve this from the server? Still not super secure...
const TOKEN_KEY = 'my_abstract_token_name';

// interface TokenServiceMixin {
//   data: () => { $token: string };
//   created: () => void;
// }
export type TokenMixin = (VueConstructor | ComponentOptions<Vue>) & {
  $token: string;
};

interface TokenService {
  /** The jwt */
  token: string;
  mixin(): TokenMixin;
  addListener(fn: Listener): void;
  removeListener(fn: Listener): void;
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
    // Update listeners
    R.map(
      (fn: Listener) => fn(value),
    )((TokenService as any)[LISTENERS]);
  },
  addListener (fn) {
    (TokenService as any)[LISTENERS].push(fn);
  },
  removeListener (fn) {
    (TokenService as any)[LISTENERS] = R.without([fn], (TokenService as any)[LISTENERS]);
  },
  mixin () {
    return {
      data () {
        // HEY STUPID YOU DON"T HAVE ANYTHING TO WRITE BACK
        return {
          $token: TokenService.token,
        };
      },
      created () {
        // Hide the listener on vue instance via symbol
        (this as any)[LISTENER] = (t: string) => this.$token = TokenService.token;
        // Add the listener to update the token data
        TokenService.addListener(t => this.$token = TokenService.token);
      },
      beforeDestroy () {
        // Clean up the listener
        TokenService.removeListener((this as any)[LISTENER]);
      },
      // typescript complains about missing $token, but we have to let vue's
      // reactivity system handle this property
    } as any as TokenMixin;
  },
};

(TokenService as any)[LISTENERS] = [];

export default TokenService;
