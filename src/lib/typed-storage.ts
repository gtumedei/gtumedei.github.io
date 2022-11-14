import { createLocalStorage } from "@solid-primitives/storage"

export const createTypedStorage = <TData = any>(prefix: string) => {
  type Data = Partial<TData>

  const [storage, setStorage] = createLocalStorage({
    prefix,
    serializer: (value) => JSON.stringify(value),
    deserializer: (value) => JSON.parse(value)
  })

  return [
    storage as unknown as Data,
    setStorage as unknown as (key: keyof Data, value: Data[typeof key]) => void
  ] as const
}
