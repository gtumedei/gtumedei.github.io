import { createSignal, onCleanup, onMount } from "solid-js"
import { create } from "~/lib/context"
import {
  applyAccent,
  applyStyle,
  applyTheme,
  applyWallpaper,
  LOCAL_STORAGE_ACCENT_KEY,
  LOCAL_STORAGE_STYLE_KEY,
  LOCAL_STORAGE_THEME_KEY,
  LOCAL_STORAGE_WALLPAPER_KEY,
  readAccent,
  readStyle,
  readTheme,
  readWallpaper,
} from "./apply"

export const themes = ["light", "dark", "system"] as const
export type Theme = (typeof themes)[number]

export const accents = ["blue", "orange", "teal", "pink"] as const
export type Accent = (typeof accents)[number]

export const styles = ["minimalist", "dotted", "pixelated"] as const
export type Style = (typeof styles)[number]

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

  const [style, _setStyle] = createSignal<Style>("minimalist")
  const setStyle = (value: Style) => {
    _setStyle(value)
    localStorage.setItem(LOCAL_STORAGE_STYLE_KEY, value)
    applyStyle(value)
  }

  const [showWallpaper, _setShowWallpaper] = createSignal<"on" | "off">("off")
  const setShowWallpaper = (value: "on" | "off") => {
    _setShowWallpaper(value)
    localStorage.setItem(LOCAL_STORAGE_WALLPAPER_KEY, value)
    applyWallpaper(value)
  }

  onMount(() => {
    _setTheme(readTheme())
    _setAccent(readAccent())
    _setStyle(readStyle())
    _setShowWallpaper(readWallpaper())

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
    style,
    setStyle,
    showWallpaper,
    setShowWallpaper,
    superModeOn,
    setSuperModeOn,
  }
})
