/**
 * Given a list of keys to allow in objects, return a function that takes objects and returns objects with only those keys copied
 * {a: 1, b: 2} === withKeys(["a", "b"])({a: 1, b: 2, c: 3, d: 4})
 */
export const withKeys = (keys = []) => obj => {
  const filteredObj = {};
  keys.forEach(k => filteredObj[k] = obj[k])
  return filteredObj;
}
