import { usePrefersDark } from "@solid-primitives/media"
import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  onMount,
  ParentComponent,
  useContext,
} from "solid-js"
import { applyAccent, applyTheme } from "./apply"

const themes = ["light", "dark", "system"] as const
export type Theme = (typeof themes)[number]

const accents = ["blue", "orange", "teal", "pink"] as const
export type Accent = (typeof accents)[number]

type Ctx = {
  theme: Accessor<Theme>
  setTheme: (value: Theme) => void
  actualTheme: Accessor<"light" | "dark">
  accent: Accessor<Accent>
  setAccent: (value: Accent) => void
}

const ThemeCtx = createContext<Ctx>()

export const ThemeProvider: ParentComponent = (props) => {
  const prefersDark = usePrefersDark()

  const [theme, _setTheme] = createSignal<Theme>("system")
  const setTheme = (value: Theme) => {
    _setTheme(value)
    localStorage.setItem("gtumedei-io-theme", value)
    applyTheme(value)
  }

  const actualTheme = () => {
    const t = theme()
    if (t != "system") return t
    return prefersDark() ? "dark" : "light"
  }

  const [accent, _setAccent] = createSignal<Accent>("blue")
  const setAccent = (value: Accent) => {
    _setAccent(value)
    localStorage.setItem("gtumedei-io-accent", value)
    applyAccent(value)
  }

  createEffect(() => {
    if (theme() != "system") return
    document.documentElement.setAttribute("data-theme", prefersDark() ? "dark" : "light")
  })

  onMount(() => {
    _setTheme((localStorage.getItem("gtumedei-io-theme") as Theme) ?? "system")
    _setAccent((localStorage.getItem("gtumedei-io-accent") as Accent) ?? "blue")
  })

  return (
    <ThemeCtx.Provider
      value={{
        theme,
        setTheme,
        actualTheme,
        accent,
        setAccent,
      }}
    >
      {props.children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)!
