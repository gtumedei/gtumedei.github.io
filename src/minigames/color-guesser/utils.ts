/** Generate a random number between min and max (both included) */
export const random = (min: number, max: number) => {
  let s: number, e: number
  if (min < 0) {
    ;(s = 0), (e = max - min)
    return Math.floor(Math.random() * (e - s + 1) + s) + min
  } else {
    ;(s = min), (e = max)
    return Math.floor(Math.random() * (e - s + 1) + s)
  }
}

/** Pick a random element from an array */
export const pickRandom = <T>(arr: T[]) => arr[(arr.length * Math.random()) | 0]!

export const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

export const hexToHsl = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const l = Math.max(r, g, b)
  const s = l - Math.min(r, g, b)
  const h = s ? (l == r ? (g - b) / s : l == g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0
  const hv = Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h)
  const sv = Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0))
  const lv = Math.round((100 * (2 * l - s)) / 2)
  return `hsl(${hv}, ${sv}%, ${lv}%)`
}

export const scrambleHex = (hex: string) => {
  const [r, g, b] = [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ].map((v) =>
    Math.min(Math.max(v + random(-25, 25), 0), 255)
      .toString(16)
      .padStart(2, "0")
  )
  return `#${r}${g}${b}`
}
