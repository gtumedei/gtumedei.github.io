import { Component, createSignal, onMount } from "solid-js"
import { useTippy } from "~/composables/tippy"
import MdiBrightness4 from "~icons/mdi/brightness-4"
import MdiBrightness7 from "~icons/mdi/brightness-7"

type Theme = "light" | "dark"

const useTheme = () => {
  const [theme, set] = createSignal<Theme>()
  const setTheme = (theme: Theme) => {
    set(theme)
    localStorage.setItem("theme", theme)
    if (theme == "dark") {
      document.documentElement.classList.add("theme-dark")
      document.querySelector(`meta[name="theme-color"]`)?.setAttribute("content",  "#303030")
    } else {
      document.documentElement.classList.remove("theme-dark")
      document.querySelector(`meta[name="theme-color"]`)?.setAttribute("content",  "#FFFFFF")
    }
  }
  const toggleTheme = () => setTheme(theme() == "dark" ? "light" : "dark")

  onMount(() => setTheme(localStorage.getItem("theme") as Theme ?? "light"))

  return { theme, setTheme, toggleTheme }
}

const AppHeader: Component<{ showName?: boolean }> = (props) => {
  const { theme, toggleTheme } = useTheme()

  const btn = (
    <button class="btn icon" onClick={toggleTheme}>
      {theme() == "dark"
        ? <MdiBrightness7 />
        : <MdiBrightness4 />
      }
    </button>
  )
  const tooltip = () => theme() == "dark" ? "Enable light theme" : "Enable dark theme"
  useTippy(btn, tooltip, "bottom")

  return (
    <header class="container p-6 flex items-center gap-2">
      {props.showName
        ? <a href="/" class="text-lg mr-auto">Gianni Tumedei</a>
        : <div class="mr-auto" />
      }
      {btn}
    </header>
  )
}

export default AppHeader
