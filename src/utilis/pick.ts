const pick = <T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  keys: K[]
): Partial<T> => {
  const finalObject: Partial<T> = {};
  for (const key of keys) {
    if (object && Object.hasOwnProperty.call(object, key)) {
      finalObject[key] = object[key];
    }
  }
  return finalObject;
};
export default pick;
