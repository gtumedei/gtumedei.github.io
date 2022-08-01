import { Component, createMemo, createSignal, Match, onMount, Switch } from "solid-js"
import tooltip from "~/composables/tooltip"
import MdiArrowLeftTop from "~icons/mdi/arrow-left-top"
import MdiCircle from "~icons/mdi/circle"
import MdiBrightnessAuto from "~icons/mdi/brightness-auto"
import MdiBrightness4 from "~icons/mdi/brightness-4"
import MdiBrightness7 from "~icons/mdi/brightness-7"

tooltip

const removeClass = (elem: HTMLElement, predicate: string | ((className: string) => boolean)) => {
  const match = typeof predicate == "string"
    ? (className: string) => className == predicate
    : predicate
  for (let i = elem.classList.length - 1; i >= 0; i--) {
    const className = elem.classList[i]
    if (match(className)) elem.classList.remove(className)
  }
}

const themes = ["light", "dark", null] as const
type Theme = typeof themes[number]

const useTheme = () => {
  const [theme, set] = createSignal<Theme>(null)
  const setTheme = (theme: Theme) => {
    set(theme)
    if (!theme) localStorage.removeItem("theme")
    else localStorage.setItem("theme", theme)
    removeClass(document.documentElement, className => className.startsWith("theme-"))
    if (theme) document.documentElement.classList.add(`theme-${theme}`)
  }
  const cycleTheme = () => {
    const i = themes.indexOf(theme())
    const nextTheme = themes[i == themes.length - 1 ? 0 : i + 1]
    setTheme(nextTheme)
  }

  onMount(() => setTheme(localStorage.getItem("theme") as Theme))

  return { theme, setTheme, cycleTheme }
}

const accents = ["blue", "orange", "teal", "pink"] as const
type Accent = typeof accents[number]

const useAccent = () => {
  const [accent, set] = createSignal<Accent>("blue")
  const setAccent = (accent: Accent) => {
    set(accent)
    localStorage.setItem("accent", accent)
    removeClass(document.documentElement, className => className.startsWith("accent-"))
    document.documentElement.classList.add(`accent-${accent}`)
  }
  const cycleAccent = () => {
    const i = accents.indexOf(accent())
    const nextAccent = accents[i == accents.length - 1 ? 0 : i + 1]
    setAccent(nextAccent)
  }

  onMount(() => setAccent(localStorage.getItem("accent") as Accent ?? "blue"))

  return { accent, setAccent, cycleAccent }
}

const AppHeader: Component<{ showBackButton: boolean }> = (props) => {
  const { theme, cycleTheme } = useTheme()
  const { accent, cycleAccent } = useAccent()

  const themeBtnTitle = createMemo(() => {
    if (theme() == "dark") return "Dark theme"
    else if (theme() == "light") return "Light theme"
    else return "System theme"
  })
  const accentBtnTitle = createMemo(() => accent()[0].toUpperCase() + accent().substring(1) + " accent")

  return (
    <header class="container max-w-4xl flex items-center p-3">
      {props.showBackButton &&
        <a href="/" class="btn icon" aria-label="Go Home" use:tooltip={[() => "Go Home", "right"]}>
          <MdiArrowLeftTop />
        </a>
      }
      <div class="flex-grow" />
      <button
        class="btn icon"
        onClick={cycleAccent}
        aria-label={accentBtnTitle()}
        use:tooltip={[accentBtnTitle, "bottom"]}
      ><MdiCircle class="text-accent" /></button>
      <button
        class="btn icon"
        onClick={cycleTheme}
        aria-label={themeBtnTitle()}
        use:tooltip={[themeBtnTitle, "bottom"]}
      >
        <Switch>
          <Match when={theme() == "dark"}><MdiBrightness4 /></Match>
          <Match when={theme() == "light"}><MdiBrightness7 /></Match>
          <Match when={theme() == null}><MdiBrightnessAuto /></Match>
        </Switch>
      </button>
    </header>
  )
}

export default AppHeader
