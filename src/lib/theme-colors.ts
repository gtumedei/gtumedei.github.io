import { createMutationObserver } from "@solid-primitives/mutation-observer"
import { createStore } from "solid-js/store"

export type ThemeColors = {
  // Base colors
  neutral100: string
  neutral200: string
  neutral700: string
  neutral800: string
  blue200: string
  blue500: string
  orange200: string
  orange500: string
  teal200: string
  teal500: string
  pink200: string
  pink500: string
  // Dynamic colors
  base100: string
  base200: string
  onBase: string
  inverted100: string
  inverted200: string
  onInverted: string
  accent: string
  blue: string
  orange: string
  teal: string
  pink: string
}

export const useThemeColors = () => {
  const [themeColors, setThemeColors] = createStore({} as ThemeColors)

  const computeThemeColors = () => {
    const style = getComputedStyle(document.documentElement)
    setThemeColors({
      // Base colors
      neutral100: style.getPropertyValue("--color-neutral-100").trim(),
      neutral200: style.getPropertyValue("--color-neutral-200").trim(),
      neutral700: style.getPropertyValue("--color-neutral-700").trim(),
      neutral800: style.getPropertyValue("--color-neutral-800").trim(),
      blue200: style.getPropertyValue("--color-blue-200").trim(),
      blue500: style.getPropertyValue("--color-blue-500").trim(),
      orange200: style.getPropertyValue("--color-orange-200").trim(),
      orange500: style.getPropertyValue("--color-orange-500").trim(),
      teal200: style.getPropertyValue("--color-teal-200").trim(),
      teal500: style.getPropertyValue("--color-teal-500").trim(),
      pink200: style.getPropertyValue("--color-pink-200").trim(),
      pink500: style.getPropertyValue("--color-pink-500").trim(),
      // Dynamic colors
      base100: style.getPropertyValue("--color-base-100").trim(),
      base200: style.getPropertyValue("--color-base-200").trim(),
      onBase: style.getPropertyValue("--color-on-base").trim(),
      inverted100: style.getPropertyValue("--color-inverted-100").trim(),
      inverted200: style.getPropertyValue("--color-inverted-200").trim(),
      onInverted: style.getPropertyValue("--color-on-inverted").trim(),
      accent: style.getPropertyValue("--color-accent").trim(),
      blue: style.getPropertyValue("--color-blue").trim(),
      orange: style.getPropertyValue("--color-orange").trim(),
      teal: style.getPropertyValue("--color-teal").trim(),
      pink: style.getPropertyValue("--color-pink").trim(),
    })
  }

  computeThemeColors()
  createMutationObserver(() => document.documentElement, { attributes: true }, computeThemeColors)

  return themeColors
}
