import { createMutationObserver } from "@solid-primitives/mutation-observer"
import { createStore } from "solid-js/store"

// TODO: update for the new theming system

export type ThemeColors = {
  // Base colors

  primary100: string
  primary200: string
  primary700: string
  primary800: string

  white100: string
  white70: string
  white50: string
  white12: string
  white8: string

  black80: string
  black54: string
  black38: string
  black12: string
  black8: string

  darkBlue: string
  darkBlue20: string
  darkBlue10: string

  lightBlue: string
  lightBlue20: string
  lightBlue10: string

  darkOrange: string
  darkOrange20: string
  darkOrange10: string

  lightOrange: string
  lightOrange20: string
  lightOrange10: string

  darkTeal: string
  darkTeal20: string
  darkTeal10: string

  lightTeal: string
  lightTeal20: string
  lightTeal10: string

  darkPink: string
  darkPink20: string
  darkPink10: string

  lightPink: string
  lightPink20: string
  lightPink10: string

  // Dynamic colors

  primary: string
  primaryDark: string

  neutral100: string
  neutral70: string
  neutral40: string
  neutral12: string
  neutral8: string

  invertedPrimary: string
  invertedPrimaryDark: string

  invertedNeutral100: string
  invertedNeutral70: string
  invertedNeutral40: string
  invertedNeutral12: string
  invertedNeutral8: string

  accent: string
  accent20: string
  accent10: string

  blue: string
  blue20: string
  blue10: string

  orange: string
  orange20: string
  orange10: string

  teal: string
  teal20: string
  teal10: string

  pink: string
  pink20: string
  pink10: string
}

export const useThemeColors = () => {
  const [themeColors, setThemeColors] = createStore({} as ThemeColors)

  const computeThemeColors = () => {
    const style = getComputedStyle(document.documentElement)
    const isDark = !(style.getPropertyValue("--color-base") == "#FFFFFF")
    setThemeColors({
      primary100: style.getPropertyValue("--color-base-100").trim(),
      primary200: style.getPropertyValue("--color-base-200").trim(),
      primary700: style.getPropertyValue("--color-base-700").trim(),
      primary800: style.getPropertyValue("--color-base-800").trim(),
      white100: style.getPropertyValue("--color-white-100").trim(),
      white70: style.getPropertyValue("--color-white-70").trim(),
      white50: style.getPropertyValue("--color-white-50").trim(),
      white12: style.getPropertyValue("--color-white-12").trim(),
      white8: style.getPropertyValue("--color-white-8").trim(),
      black80: style.getPropertyValue("--color-black-80").trim(),
      black54: style.getPropertyValue("--color-black-54").trim(),
      black38: style.getPropertyValue("--color-black-38").trim(),
      black12: style.getPropertyValue("--color-black-12").trim(),
      black8: style.getPropertyValue("--color-black-8").trim(),
      darkBlue: style.getPropertyValue("--color-blue").trim(),
      darkBlue20: style.getPropertyValue("--color-blue-20").trim(),
      darkBlue10: style.getPropertyValue("--color-blue-10").trim(),
      lightBlue: style.getPropertyValue("--color-light-blue").trim(),
      lightBlue20: style.getPropertyValue("--color-light-blue-20").trim(),
      lightBlue10: style.getPropertyValue("--color-light-blue-10").trim(),
      darkOrange: style.getPropertyValue("--color-orange").trim(),
      darkOrange20: style.getPropertyValue("--color-orange-20").trim(),
      darkOrange10: style.getPropertyValue("--color-orange-10").trim(),
      lightOrange: style.getPropertyValue("--color-light-orange").trim(),
      lightOrange20: style.getPropertyValue("--color-light-orange-20").trim(),
      lightOrange10: style.getPropertyValue("--color-light-orange-10").trim(),
      darkTeal: style.getPropertyValue("--color-teal").trim(),
      darkTeal20: style.getPropertyValue("--color-teal-20").trim(),
      darkTeal10: style.getPropertyValue("--color-teal-10").trim(),
      lightTeal: style.getPropertyValue("--color-light-teal").trim(),
      lightTeal20: style.getPropertyValue("--color-light-teal-20").trim(),
      lightTeal10: style.getPropertyValue("--color-light-teal-10").trim(),
      darkPink: style.getPropertyValue("--color-pink").trim(),
      darkPink20: style.getPropertyValue("--color-pink-20").trim(),
      darkPink10: style.getPropertyValue("--color-pink-10").trim(),
      lightPink: style.getPropertyValue("--color-light-pink").trim(),
      lightPink20: style.getPropertyValue("--color-light-pink-20").trim(),
      lightPink10: style.getPropertyValue("--color-light-pink-10").trim(),
      primary: style.getPropertyValue("--color-base").trim(),
      primaryDark: style.getPropertyValue("--color-base-focus").trim(),
      neutral100: style.getPropertyValue("--color-content-100").trim(),
      neutral70: style.getPropertyValue("--color-content-70").trim(),
      neutral40: style.getPropertyValue("--color-content-40").trim(),
      neutral12: style.getPropertyValue("--color-content-12").trim(),
      neutral8: style.getPropertyValue("--color-content-8").trim(),
      invertedPrimary: style.getPropertyValue("--color-inverted-base").trim(),
      invertedPrimaryDark: style.getPropertyValue("--color-inverted-base-focus").trim(),
      invertedNeutral100: style.getPropertyValue("--color-inverted-content-100").trim(),
      invertedNeutral70: style.getPropertyValue("--color-inverted-content-70").trim(),
      invertedNeutral40: style.getPropertyValue("--color-inverted-content-40").trim(),
      invertedNeutral12: style.getPropertyValue("--color-inverted-content-12").trim(),
      invertedNeutral8: style.getPropertyValue("--color-inverted-content-8").trim(),
      accent: style.getPropertyValue("--color-accent").trim(),
      accent20: style.getPropertyValue("--color-accent/20").trim(),
      accent10: style.getPropertyValue("--color-accent/10").trim(),
      blue: style.getPropertyValue(isDark ? "--color-blue" : "--color-light-blue").trim(),
      blue20: style.getPropertyValue(isDark ? "--color-blue-20" : "--color-light-blue-20").trim(),
      blue10: style.getPropertyValue(isDark ? "--color-blue-10" : "--color-light-blue-10").trim(),
      orange: style.getPropertyValue(isDark ? "--color-orange" : "--color-light-orange").trim(),
      orange20: style
        .getPropertyValue(isDark ? "--color-orange-20" : "--color-light-orange-20")
        .trim(),
      orange10: style
        .getPropertyValue(isDark ? "--color-orange-10" : "--color-light-orange-10")
        .trim(),
      teal: style.getPropertyValue(isDark ? "--color-teal" : "--color-light-teal").trim(),
      teal20: style.getPropertyValue(isDark ? "--color-teal-20" : "--color-light-teal-20").trim(),
      teal10: style.getPropertyValue(isDark ? "--color-teal-10" : "--color-light-teal-10").trim(),
      pink: style.getPropertyValue(isDark ? "--color-pink" : "--color-light-pink").trim(),
      pink20: style.getPropertyValue(isDark ? "--color-pink-20" : "--color-light-pink-20").trim(),
      pink10: style.getPropertyValue(isDark ? "--color-pink-10" : "--color-light-pink-10").trim(),
    })
  }

  computeThemeColors()
  createMutationObserver(() => document.documentElement, { attributes: true }, computeThemeColors)

  return themeColors
}
