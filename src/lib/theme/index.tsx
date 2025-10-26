import { createSignal, onCleanup, onMount } from "solid-js"
import { create } from "~/lib/context"
import { applyAccent, applyTheme } from "./apply"

export const themes = ["light", "dark", "system"] as const
export type Theme = (typeof themes)[number]

export const accents = ["blue", "orange", "teal", "pink"] as const
export type Accent = (typeof accents)[number]

export const [ThemeProvider, useTheme] = create(() => {
  const [theme, _setTheme] = createSignal<Theme>("system")
  const setTheme = (value: Theme) => {
    _setTheme(value)
    localStorage.setItem("gtumedei-io-theme", value)
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
    localStorage.setItem("gtumedei-io-accent", value)
    applyAccent(value)
  }

  onMount(() => {
    _setTheme((localStorage.getItem("gtumedei-io-theme") as Theme) ?? "system")
    _setAccent((localStorage.getItem("gtumedei-io-accent") as Accent) ?? "blue")

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

  const [dottedHeadingsOn, _setDottedHeadingsOn] = createSignal(false)
  const setDottedHeadingsOn = (value: boolean) => {
    _setDottedHeadingsOn(value)
    document.documentElement.setAttribute("data-heading-font", value ? "dotted" : "serif")
  }

  const [superModeOn, setSuperModeOn] = createSignal(false)

  return {
    theme,
    setTheme,
    actualTheme,
    accent,
    setAccent,
    dottedHeadingsOn,
    setDottedHeadingsOn,
    superModeOn,
    setSuperModeOn,
  }
})
