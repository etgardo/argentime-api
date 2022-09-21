/**
 * Convert an enum into a String
 * @param _enum Enum
 * @returns string types
 * @gist http://gist.github.com/ruslanguns/d5..
 */
export const EnumToString = (_enum: object) =>
  Object.keys(_enum)
    .map((key) => _enum[key])
    .filter((value) => typeof value === 'string') as string[];

export const ArrayObjectToString = (items: object[]) =>
  items
    .map((item: object) => {
      return item['role'];
    })
    .filter((value) => typeof value === 'string') as string[];
