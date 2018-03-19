import * as R from 'ramda';

type ObjectWithUUID<T extends object> = T & { uuid: string };

export function hasUUID<T extends object>(obj: T): obj is ObjectWithUUID<T> {
  return R.has('uuid', obj);
}
