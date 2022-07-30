import { Component, createSignal, onMount } from "solid-js"
import { tooltip } from "~/composables/tooltip"; tooltip
import MdiArrowLeftTop from "~icons/mdi/arrow-left-top"
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

const AppHeader: Component<{ showBackButton: boolean }> = (props) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header class="container max-w-4xl flex items-center px-3 pt-3">
      {props.showBackButton &&
        <a href="/" class="btn icon" use:tooltip={[() => "Go Home", "right"]}>
          <MdiArrowLeftTop />
        </a>
      }
      <div class="flex-grow" />
      <button
        class="btn icon"
        onClick={toggleTheme}
        use:tooltip={[() => theme() == "dark" ? "Enable light theme" : "Enable dark theme", "left"]}
      >{theme() == "dark" ? <MdiBrightness7 /> : <MdiBrightness4 />}</button>
    </header>
  )
}

export default AppHeader
