import { makePersisted } from "@solid-primitives/storage"
import { createSignal } from "solid-js"
import { createStore } from "solid-js/store"
import { isServer } from "solid-js/web"
import { hexToHsl, hexToRgb, pickRandom, scrambleHex } from "./utils"

export type Game = {
  state: "IDLE" | "PLAYING"
  difficulty: Difficulty
  mode: ColorMode
  streak: number
  color: string
  colorGrid: string[]
}

export const difficulties: Difficulty[] = [
  { label: "Easy", grid: 2 },
  { label: "Normal", grid: 3 },
  { label: "Hard", grid: 4 },
  { label: "Harder", grid: 5 },
  { label: "Hardest", grid: 6 },
]
export type Difficulty = { label: string; grid: number }

export const modes = ["HEX", "RGB", "HSL"] as const
export type ColorMode = (typeof modes)[number]

export const colors = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#607D8B",
]

export const createColorGuesser = () => {
  const [game, setGame] = createStore<Game>({
    state: "IDLE",
    difficulty: { ...difficulties[0]! },
    mode: "HEX",
    streak: 0,
    color: "---",
    colorGrid: [],
  })

  const initialStats = {
    streak: 0,
    streakDifficulty: "",
    rightGuesses: 0,
    wrongGuesses: 0,
  }
  const [stats, setStats] = makePersisted(createStore({ ...initialStats }), {
    name: "gtumedei.color-guesser",
    storage: isServer ? undefined : localStorage,
  })
  const resetStats = () => setStats({ ...initialStats })

  const createColorGrid = (size: number, mode: ColorMode) => {
    let grid = new Array(size * size).fill(0).map(() => pickRandom(colors))
    // Randomize colors, but apply the same randomization to the same colors
    const rndSet = new Set(grid)
    rndSet.forEach((setColor) => {
      const scrambledColor = scrambleHex(setColor)
      grid = grid.map((gridColor) => (gridColor == setColor ? scrambledColor : gridColor))
    })
    if (mode == "RGB") return grid.map((c) => hexToRgb(c))
    if (mode == "HSL") return grid.map((c) => hexToHsl(c))
    return grid
  }

  const startGame = (difficulty: Difficulty, mode: ColorMode) => {
    setGame("state", "PLAYING")
    setGame("difficulty", { ...difficulty })
    setGame("mode", mode)
    setGame("streak", 0)
    nextColor()
  }

  const registerGuess = (color: string) => {
    const correct = color == game.color
    if (correct) {
      setGame("streak", (v) => v + 1)
      setStats("rightGuesses", (stats.rightGuesses ?? 0) + 1)
      if (game.streak > (stats.streak ?? 0)) {
        setStats("streak", game.streak)
        setStats("streakDifficulty", game.difficulty.label)
      }
    } else {
      setGame("streak", 0)
      setStats("wrongGuesses", (stats.wrongGuesses ?? 0) + 1)
    }
    return correct
  }

  const nextColor = () => {
    setGame("colorGrid", createColorGrid(game.difficulty?.grid ?? 2, game.mode ?? "HEX"))
    setGame("color", pickRandom(game.colorGrid ?? []))
  }

  const [dialogState, setDialogState] = createSignal<"menu" | "stats" | null>(null)

  return {
    difficulties,
    modes,
    game,
    gameActions: { startGame, registerGuess, nextColor },
    stats,
    resetStats,
    ui: {
      dialogState,
      setDialogState,
    },
  }
}
