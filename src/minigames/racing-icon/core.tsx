import { createSignal } from "solid-js"
import { createStore } from "solid-js/store"
import { create } from "~/lib/context"

export type Game = {
  state: "IDLE" | "PLAYING"
}

export const [RacingIconGameProvider, useRacingIconGame] = create(() => {
  const [game, _setGame] = createStore<Game>({
    state: "IDLE",
  })

  /* const initialStats = {
    streak: 0,
    streakDifficulty: "",
    rightGuesses: 0,
    wrongGuesses: 0,
  }
  const [stats, setStats] = makePersisted(createStore({ ...initialStats }), {
    name: "gtumedei-io-color-guesser",
    storage: isServer ? undefined : localStorage,
  })
  const resetStats = () => setStats({ ...initialStats }) */

  const [dialogState, setDialogState] = createSignal<"menu" | "stats" | null>(null)

  return {
    game,
    ui: {
      dialogState,
      setDialogState,
    },
  }
})
