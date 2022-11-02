import { createStore } from "solid-js/store"

type Difficulty = { label: string, grid: number }

type GameCtx = {
  difficulty?: Difficulty
  color?: string
  colorGrid?: string[]
}

export const difficulties: Difficulty[] = [
  { label: "Easy", grid: 2 },
  { label: "Normal", grid: 3 },
  { label: "Hard", grid: 4 },
  { label: "Harder", grid: 5 },
  { label: "Hardest", grid: 6 }
]

const colors = [
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
  "#607D8B"
]

const [gameCtx, setGameCtx] = createStore<GameCtx>({})
export { gameCtx }

const pickRandom = <T>(arr: T[]) => arr[arr.length * Math.random() | 0]

const createColorGrid = (size: number) => new Array(size * size).fill(0).map(() => pickRandom(colors))

export const startGame = (difficulty: Difficulty) => {
  setGameCtx("difficulty", { ...difficulty })
  nextColor()
}

export const nextColor = () => {
  setGameCtx("colorGrid", createColorGrid(gameCtx.difficulty?.grid ?? 2))
  setGameCtx("color", pickRandom(gameCtx.colorGrid ?? []))
}
