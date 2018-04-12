import * as R from 'ramda';
import { CoreModuleName } from '@/utils/createCoreModule';
import { CorePath } from '@/utils/CoreAPI';
import { StoreRow } from '@/store/types';
import { AuthorizationError } from '@/errors/AuthorizationError';

/** Type for object with UUID */
type ObjectWithUUID<T extends object> = T & { uuid: string };

/** check if object has uuid */
export function hasUUID<T extends object>(obj: T): obj is ObjectWithUUID<T> {
  return R.has('uuid', obj);
}

/** check if object is undefined */
export function rowNotFound<T>(row?: StoreRow<T>): row is undefined {
  return (row === undefined);
}

/** check if object is instance of response */
export function isResponse(response: any): response is Response {
  return (response instanceof Response);
}

/**
 * Enum for core module names
 */
enum CORE_MODULE_NAMES {
  FARMER = 'farmer',
  MILK = 'milk',
  DELIVERY = 'delivery',
  TRADER = 'trader',
  ADMIN = 'admin',
  MEMO = 'memo',
  MONITOR = 'monitor',
  LOANS = 'loan',
}

/**
 * Gets the core module names for a certain user type
 * @param userType type of user to get core modules for
 */
export function getPermittedCoreModuleNames(userType: string) {
  let permittedCoreModules: CoreModuleName[] = [];
  if (userType === 'admins') {
    permittedCoreModules = [
      CORE_MODULE_NAMES.FARMER,
      CORE_MODULE_NAMES.TRADER,
      CORE_MODULE_NAMES.ADMIN,
      CORE_MODULE_NAMES.MEMO,
      CORE_MODULE_NAMES.MONITOR,
      CORE_MODULE_NAMES.MILK,
      CORE_MODULE_NAMES.DELIVERY,
      // CORE_MODULE_NAMES.LOANS, TODO
    ];
  } else if (userType === 'monitors') {
    permittedCoreModules = [
      CORE_MODULE_NAMES.FARMER,
      CORE_MODULE_NAMES.TRADER,
      CORE_MODULE_NAMES.MEMO,
      CORE_MODULE_NAMES.MILK,
      CORE_MODULE_NAMES.DELIVERY,
      // CORE_MODULE_NAMES.LOANS, TODO
    ];
  } else {
    throw new AuthorizationError(`Invalid user type: ${userType}`);
  }
  return permittedCoreModules;
}

/**
 * Get the module path for the specified module
 *
 * @param module Module to retrieve path for
 */
export function getModulePath(module: CoreModuleName): CorePath {
  switch (module) {
    case 'farmer': return '/people/farmers';

    case 'milk': return '/transactions/products/milk';

    case 'delivery': return '/productExports';

    case 'memo': return '/memos';

    case 'loan': return '/transactions/money/loans';

    case 'trader': return '/people/traders';

    case 'admin': return '/people/admins';

    case 'monitor': return '/people/monitors';

    default: throw new Error(`No such module/path mapping for module ${module}`);
  }
}
