// @ts-check

/**
 * Applies the given theme to the website by setting the `data-theme` attribute on the `<html>` tag and updating `meta[name="theme-color"]`.
 * @param {"light" | "dark" | "system"} theme
 */
export const applyTheme = (theme) => {
  const actualTheme =
    theme == "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme
  // Add/update data-theme attribute
  document.documentElement.setAttribute("data-theme", actualTheme)
  // Remove existing theme color meta tags
  document.querySelectorAll(`meta[name="theme-color"]`).forEach((elem) => elem.remove())
  if (theme == "system") {
    // Add automatic theme color meta tags
    const lightMeta = document.createElement("meta")
    lightMeta.name = "theme-color"
    lightMeta.media = "(prefers-color-scheme: light)"
    lightMeta.content = "#FFFFFF"
    const darkMeta = document.createElement("meta")
    darkMeta.name = "theme-color"
    darkMeta.media = "(prefers-color-scheme: dark)"
    darkMeta.content = "#171717"
    document.head.append(lightMeta, darkMeta)
  } else {
    // Add theme color meta tag
    const meta = document.createElement("meta")
    meta.name = "theme-color"
    meta.content = theme == "light" ? "#FFFFFF" : "#171717"
    document.head.append(meta)
  }
}

export const LOCAL_STORAGE_THEME_KEY = "gtumedei-io-theme"

// Can't use LOCAL_STORAGE_THEME_KEY in this function because it gets stringified and exported without that variable. This would lead to using a variable that's not defined.
const getTheme = () => localStorage.getItem("gtumedei-io-theme") ?? "system"

export const applyThemeFnString = `(${applyTheme})((${getTheme})())`

/**
 * Applies the given accent to the website by setting the `data-theme` attribute on the `<html>` tag.
 * @param {string} accent
 */
export const applyAccent = (accent) => {
  document.documentElement.setAttribute("data-accent", accent ?? "blue")
}

export const LOCAL_STORAGE_ACCENT_KEY = "gtumedei-io-accent"

// Can't use LOCAL_STORAGE_ACCENT_KEY in this function because it gets stringified and exported without that variable. This would lead to using a variable that's not defined.
const getAccent = () => localStorage.getItem("gtumedei-io-accent") ?? "blue"

export const applyAccentFnString = `(${applyAccent})((${getAccent})())`
