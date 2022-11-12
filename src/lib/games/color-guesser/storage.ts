import { createLocalStorage } from "@solid-primitives/storage"

type ColorGuesserStorage = {
  streak?: number
  rightGuesses?: number
  wrongGuesses?: number
}

export const createColorGuesserStorage = () => {
  const [gameStorage, setGameStorage] = createLocalStorage({
    prefix: "gtumedei.color-guesser",
    serializer: (value) => JSON.stringify(value),
    deserializer: (value) => JSON.parse(value)
  })

  return [
    gameStorage as unknown as ColorGuesserStorage,
    setGameStorage as unknown as (key: keyof ColorGuesserStorage, value: ColorGuesserStorage[typeof key]) => void
  ] as const
}
