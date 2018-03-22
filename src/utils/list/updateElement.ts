import * as R from 'ramda';

export const updateElementByProp = R.curry(function <T extends object> (prop: string, el: T, list: T[]): T[] {
  const elIdentifier = R.prop(prop, el);

  return R.converge(
    R.adjust(R.mergeDeepLeft(el)),
    [
      R.findIndex(R.propEq(prop, elIdentifier)),
      R.identity,
    ],
  )(list) as T[];
});
