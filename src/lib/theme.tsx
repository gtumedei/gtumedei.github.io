import { createSignal } from "solid-js"

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
export type Theme = typeof themes[number]

const [theme, _setTheme] = createSignal<Theme>(null)
export { theme }

export const setTheme = (theme: Theme) => {
  _setTheme(theme)
  // Save theme to local storage
  if (!theme) localStorage.removeItem("theme")
  else localStorage.setItem("theme", theme)
  // Update the html tag class
  removeClass(document.documentElement, className => className.startsWith("theme-"))
  if (theme) document.documentElement.classList.add(`theme-${theme}`)
  // Update the theme-color meta tag
  document.querySelectorAll(`meta[name="theme-color"]`).forEach(elem => elem.remove())
  if (theme) {
    document.head.appendChild((theme == "light"
      ? <meta name="theme-color" content="#FFFFFF" />
      : <meta name="theme-color" content="#262626" />
    ) as Node)
  } else {
    document.head.append(
      // @ts-ignore
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FFFFFF" /> as Node,
      // @ts-ignore
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#262626" /> as Node
    )
  }
}

export const cycleTheme = () => {
  const i = themes.indexOf(theme())
  const nextTheme = themes[i == themes.length - 1 ? 0 : i + 1]
  setTheme(nextTheme)
}

const accents = ["blue", "orange", "teal", "pink"] as const
export type Accent = typeof accents[number]

const [accent, _setAccent] = createSignal<Accent>("blue")
export { accent }

export const setAccent = (accent: Accent) => {
  _setAccent(accent)
  // Save theme to local storage
  localStorage.setItem("accent", accent)
  // Update the html tag class
  removeClass(document.documentElement, className => className.startsWith("accent-"))
  document.documentElement.classList.add(`accent-${accent}`)
}

export const cycleAccent = () => {
  const i = accents.indexOf(accent())
  const nextAccent = accents[i == accents.length - 1 ? 0 : i + 1]
  setAccent(nextAccent)
}
