import { makePersisted } from "@solid-primitives/storage"
import { createSignal } from "solid-js"

export type Theme = "light" | "dark" | null
export type Accent = "blue" | "orange" | "teal" | "pink"

const [theme, _setTheme] = makePersisted(createSignal<Theme>(null), {
  name: "gtumedei.theme",
})
export { theme }
export const setTheme = (theme: Theme) => {
  _setTheme(theme)
  updateDOMTheme(theme)
}

const [accent, _setAccent] = makePersisted(createSignal<Accent>("blue"), {
  name: "gtumedei.accent",
})
export { accent }
export const setAccent = (accent: Accent) => {
  _setAccent(accent)
  updateDOMAccent(accent)
}

const updateDOMTheme = (theme: Theme) => {
  // Update the html tag data-theme attribute
  if (theme) document.documentElement.setAttribute("data-theme", theme)
  else document.documentElement.removeAttribute("data-theme")
  // Update the theme-color meta tag
  document.querySelectorAll(`meta[name="theme-color"]`).forEach((elem) => elem.remove())
  if (theme == "light") {
    document.head.appendChild((<meta name="theme-color" content="#FFFFFF" />) as Node)
  } else if (theme == "dark") {
    document.head.appendChild((<meta name="theme-color" content="#262626" />) as Node)
  } else {
    document.head.append(
      // @ts-ignore
      (<meta name="theme-color" media="(prefers-color-scheme: light)" content="#FFFFFF" />) as Node,
      // @ts-ignore
      (<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#262626" />) as Node
    )
  }
}

export const updateDOMAccent = (accent: Accent) => {
  // Update the html tag data-theme attribute
  document.documentElement.setAttribute("data-accent", accent)
}

const loadTheme = () => {
  updateDOMTheme(theme())
  updateDOMAccent(accent())
  document.body.style.visibility = "visible"
  document.body.style.opacity = "1"
}

export const ThemeLoader = () => {
  loadTheme()
  return <></>
}
