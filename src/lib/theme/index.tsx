import { createSignal, onCleanup, onMount } from "solid-js"
import { create } from "~/lib/context"
import {
  applyAccent,
  applyHeadingFont,
  applyTheme,
  LOCAL_STORAGE_ACCENT_KEY,
  LOCAL_STORAGE_HEADING_FONT_KEY,
  LOCAL_STORAGE_THEME_KEY,
  readAccent,
  readHeadingFont,
  readTheme,
} from "./apply"

export const themes = ["light", "dark", "system"] as const
export type Theme = (typeof themes)[number]

export const accents = ["blue", "orange", "teal", "pink"] as const
export type Accent = (typeof accents)[number]

export const headingFonts = ["serif", "dotted"] as const
export type HeadingFont = (typeof headingFonts)[number]

export const [ThemeProvider, useTheme] = create(() => {
  const [theme, _setTheme] = createSignal<Theme>("system")
  const setTheme = (value: Theme) => {
    _setTheme(value)
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, value)
    applyTheme(value)
  }

  const actualTheme = () => {
    const t = theme()
    if (t != "system") return t
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  const [accent, _setAccent] = createSignal<Accent>("blue")
  const setAccent = (value: Accent) => {
    _setAccent(value)
    localStorage.setItem(LOCAL_STORAGE_ACCENT_KEY, value)
    applyAccent(value)
  }

  const [headingFont, _setHeadingFont] = createSignal<HeadingFont>("serif")
  const setHeadingFont = (value: HeadingFont) => {
    _setHeadingFont(value)
    localStorage.setItem(LOCAL_STORAGE_HEADING_FONT_KEY, value)
    applyHeadingFont(value)
  }

  onMount(() => {
    _setTheme(readTheme())
    _setAccent(readAccent())
    _setHeadingFont(readHeadingFont())

    // Listen for the (prefers-color-scheme: dark) media query to change theme
    const onPrefersColorSchemeChange = (e: MediaQueryListEvent) => {
      if (theme() != "system") return
      document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light")
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", onPrefersColorSchemeChange)
    onCleanup(() =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", onPrefersColorSchemeChange)
    )
  })

  const [superModeOn, setSuperModeOn] = createSignal(false)

  return {
    theme,
    setTheme,
    actualTheme,
    accent,
    setAccent,
    headingFont,
    setHeadingFont,
    superModeOn,
    setSuperModeOn,
  }
})
