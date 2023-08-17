/** Typesafely pick keys from an object */
export const pick = <T, K extends keyof T>(obj: T, keys: (K | undefined)[]): Pick<T, K> =>
  keys.reduce((acc, key) => {
    if (key != undefined) acc[key] = obj[key]
    return acc
  }, {} as T)

/** Typesafely omit keys from an object */
export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: (K | undefined)[]
): Omit<T, K> =>
  (Object.keys(obj) as (K | undefined)[]).reduce((acc, key) => {
    if (key != undefined && !keys.includes(key)) acc[key] = obj[key]
    return acc
  }, {} as T)

export type AnyFunction = (...args: any[]) => any
export type inferArgs<TFn> = TFn extends (...args: [...infer Arg]) => any ? Arg : never
export type inferReturn<TFn> = TFn extends (...args: any[]) => infer Res ? Res : never

export type KeysMatching<TObj, TValue> = {
  [Key in keyof TObj]: TObj[Key] extends TValue ? Key : never
}[keyof TObj]
