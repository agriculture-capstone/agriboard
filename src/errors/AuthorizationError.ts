import { BaseError } from './BaseError';

const DEFAULT_MSG = 'Unauthorized user';

/**
 * Error thrown when current user is not authorized.
 */
export class AuthorizationError extends BaseError {

  /** Unique identifier for error */
  public static id = 'AuthorizationError';

  constructor(msg = DEFAULT_MSG) {
    super(AuthorizationError, msg);
  }
}
