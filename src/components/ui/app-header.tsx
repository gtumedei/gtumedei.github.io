import { Component, createMemo, createSignal, onMount } from "solid-js"
import tooltip from "~/composables/tooltip"; tooltip
import MdiArrowLeftTop from "~icons/mdi/arrow-left-top"
import MdiCircle from "~icons/mdi/circle"
import MdiBrightness4 from "~icons/mdi/brightness-4"
import MdiBrightness7 from "~icons/mdi/brightness-7"

type Theme = "light" | "dark"

const useTheme = () => {
  const [theme, set] = createSignal<Theme>()
  const setTheme = (theme: Theme) => {
    set(theme)
    localStorage.setItem("theme", theme)
    document.documentElement.classList[theme == "dark" ? "add" : "remove"]("theme-dark")
    document.querySelector(`meta[name="theme-color"]`)?.setAttribute("content", theme == "dark" ? "#303030" : "#FFFFFF")
  }
  const toggleTheme = () => setTheme(theme() == "dark" ? "light" : "dark")

  onMount(() => setTheme(localStorage.getItem("theme") as Theme ?? "light"))

  return { theme, setTheme, toggleTheme }
}

const removeClass = (elem: HTMLElement, predicate: string | ((className: string) => boolean)) => {
  const match = typeof predicate == "string"
    ? (className: string) => className == predicate
    : predicate
  for (let i = elem.classList.length - 1; i >= 0; i--) {
    const className = elem.classList[i]
    if (match(className)) elem.classList.remove(className)
  }
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
  const { theme, toggleTheme } = useTheme()
  const { accent, cycleAccent } = useAccent()

  const themeBtnTitle = createMemo(() => theme() == "dark" ? "Dark theme" : "Light theme")
  const accentBtnTitle = createMemo(() => accent()[0].toUpperCase() + accent().substring(1) + " accent")

  return (
    <header class="container max-w-4xl flex items-center px-3 pt-3">
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
        onClick={toggleTheme}
        aria-label={themeBtnTitle()}
        use:tooltip={[themeBtnTitle, "bottom"]}
      >{theme() == "dark" ? <MdiBrightness4 /> : <MdiBrightness7 />}</button>
    </header>
  )
}

export default AppHeader
