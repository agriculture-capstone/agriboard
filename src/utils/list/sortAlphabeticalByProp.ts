/**
 * Create sorting algorithm for alphabetical sort by prop
 *
 * @param prop Prop to sort by
 */
export default function sortAlphabeticalByProp(prop: string) {
  return function (a: any, b: any) {
    const firstProp = a[prop].toLowerCase();
    const secondProp = b[prop].toLowerCase();
    if (firstProp < secondProp) return -1;
    if (secondProp < firstProp) return 1;
    return 0;
  };
}
