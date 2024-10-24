import { createEffect, on } from "solid-js"
import { createStore } from "solid-js/store"
import { isServer } from "solid-js/web"
import { useTheme } from "~/lib/theme"

export type ThemeColors = {
  base100: string
  base200: string
  base300: string
  onBase: string
  neutral: string
  onNeutral: string
  accent: string
  blueAccent: string
  orangeAccent: string
  tealAccent: string
  pinkAccent: string
  onAccent: string
}

const computeThemeColors = () => {
  const getColor = (() => {
    if (isServer) return (_: string) => ""
    const style = getComputedStyle(document.documentElement)
    return (property: string) => {
      const value = style.getPropertyValue(property).trim()
      return value == "" ? "" : `rgb(${value} / 100)`
    }
  })()

  const colors = {
    base100: getColor("--color-base-100"),
    base200: getColor("--color-base-200"),
    base300: getColor("--color-base-300"),
    onBase: getColor("--color-on-base"),
    neutral: getColor("--color-neutral"),
    onNeutral: getColor("--color-on-neutral"),
    accent: getColor("--color-accent"),
    blueAccent: getColor("--color-accent-blue"),
    orangeAccent: getColor("--color-accent-orange"),
    tealAccent: getColor("--color-accent-teal"),
    pinkAccent: getColor("--color-accent-pink"),
    onAccent: getColor("--color-on-accent"),
  } satisfies ThemeColors
  return colors
}

export const useThemeColors = () => {
  const { actualTheme, accent } = useTheme()

  const [colors, setColors] = createStore(computeThemeColors())

  createEffect(
    on(
      () => [actualTheme(), accent()],
      async () => {
        await new Promise((r) => setTimeout(r, 100)) // Wait for the html tag to be updated
        setColors(computeThemeColors())
      }
    )
  )

  return colors
}
