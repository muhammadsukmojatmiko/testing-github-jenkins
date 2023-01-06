export function toEnumObj<T extends string>(arr: Array<T>): { [K in T]: K } {
  return arr.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
