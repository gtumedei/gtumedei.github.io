import { createStore } from "solid-js/store"

// TODO: add more colors, additional setting for color mode (HSL)

export type Difficulty = { label: string, grid: number }

export type GameCtx = {
  mode?: ColorMode
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

export type ColorMode = typeof modes[number]

export const modes = ["HEX", "RGB", "HSL"] as const

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

/** Generate a random number between min and max (both included) */
const random = (min: number, max: number) => {
  let s: number, e: number
  if (min < 0) {
    s = 0, e = max - min
    return Math.floor(Math.random() * (e - s + 1) + s) + min
  } else {
    s = min, e = max
    return Math.floor(Math.random() * (e - s + 1) + s)
  }
}

/** Pick a random element from an array */
const pickRandom = <T>(arr: T[]) => arr[arr.length * Math.random() | 0]

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

const hexToHsl = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const l = Math.max(r, g, b)
  const s = l - Math.min(r, g, b)
  const h = s
    ? l == r
      ? (g - b) / s
      : l == g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
    : 0
  const hv = Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h)
  const sv = Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0))
  const lv = Math.round((100 * (2 * l - s)) / 2)
  return `hsl(${hv}, ${sv}%, ${lv}%)`
}

const scrambleHex = (hex: string) => {
  const [r, g, b] = [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]
    .map(v => Math.min(Math.max(v + random(-25, 25), 0), 255).toString(16).padStart(2, "0"))
  return `#${r}${g}${b}`
}

const createColorGrid = (size: number, mode: ColorMode) => {
  let grid = new Array(size * size).fill(0).map(() => pickRandom(colors))
  // Randomize colors, but apply the same randomization to the same colors
  const rndSet = new Set(grid)
  rndSet.forEach(setColor => {
    const scrambledColor = scrambleHex(setColor)
    grid = grid.map(gridColor => gridColor == setColor ? scrambledColor : gridColor)
  })
  if (mode == "RGB") return grid.map(c => hexToRgb(c))
  if (mode == "HSL") return grid.map(c => hexToHsl(c))
  return grid
}

const [gameCtx, setGameCtx] = createStore<GameCtx>({
  colorGrid: []
})
export { gameCtx }

export const startGame = (difficulty: Difficulty, mode: ColorMode) => {
  setGameCtx("difficulty", { ...difficulty })
  setGameCtx("mode", mode)
  nextColor()
  console.log(gameCtx.colorGrid)
}

export const nextColor = () => {
  setGameCtx("colorGrid", createColorGrid(gameCtx.difficulty?.grid ?? 2, gameCtx.mode ?? "HEX"))
  setGameCtx("color", pickRandom(gameCtx.colorGrid ?? []))
}
