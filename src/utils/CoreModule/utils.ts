import * as R from 'ramda';
import { CoreModuleName } from '@/utils/CoreModule';
import { CorePath } from '@/utils/CoreAPI';

type ObjectWithUUID<T extends object> = T & { uuid: string };

export function hasUUID<T extends object>(obj: T): obj is ObjectWithUUID<T> {
  return R.has('uuid', obj);
}


/** Map for modules */
// tslint:disable-next-line:variable-name
export const CoreModuleNames: CoreModuleName[] = [
  // FARMER MUST COME FIRST IN THE LIST, THIS ORDER SPECIFIES THE ORDER OF THE SYNC
  'farmer',
  'milk',
  'export',
  'loan',
];

/**
 * Get the module path for the specified module
 *
 * @param module Module to retrieve path for
 */
export function getModulePath(module: CoreModuleName): CorePath {
  switch (module) {
    case 'farmer': return '/people/farmers';

    case 'milk': return '/transactions/products/milk';

    case 'export': return '/transactions/products/export';

    case 'loan': return '/transactions/money/loan';

    default: throw new Error(`No such module/path mapping for module ${module}`);
  }
}
