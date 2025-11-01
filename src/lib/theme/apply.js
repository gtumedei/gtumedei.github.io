// @ts-check

/**
 * Applies the given theme to the website by setting the `data-theme` attribute on the `<html>` tag and updating `meta[name="theme-color"]`.
 * @param {"light" | "dark" | "system"} theme
 * @param {boolean} disableTransition
 */
export const applyTheme = (theme, disableTransition = false) => {
  const actualTheme =
    theme == "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme
  // Add/update data-theme attribute
  if ("startViewTransition" in document && !disableTransition) {
    document.startViewTransition(() =>
      document.documentElement.setAttribute("data-theme", actualTheme)
    )
  } else {
    // @ts-ignore
    document.documentElement.setAttribute("data-theme", actualTheme)
  }
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

/** @returns {import(".").Theme} */
// @ts-ignore
export const readTheme = () => localStorage.getItem("gtumedei-io-theme") ?? "system"

/**
 * Applies the given accent to the website by setting the `data-theme` attribute on the `<html>` tag.
 * @param {"blue" | "orange" | "teal" | "pink"} accent
 */
export const applyAccent = (accent) => {
  document.documentElement.setAttribute("data-accent", accent)
}

export const LOCAL_STORAGE_ACCENT_KEY = "gtumedei-io-accent"

/** @returns {import(".").Accent} */
// @ts-ignore
export const readAccent = () => localStorage.getItem("gtumedei-io-accent") ?? "blue"

/**
 * Applies the given accent to the website by setting the `data-theme` attribute on the `<html>` tag.
 * @param {"serif" | "dotted"} font
 */
export const applyHeadingFont = (font) => {
  document.documentElement.setAttribute("data-heading", font)
}

export const LOCAL_STORAGE_HEADING_FONT_KEY = "gtumedei-io-heading-font"

/** @returns {import(".").HeadingFont} */
// @ts-ignore
export const readHeadingFont = () => localStorage.getItem("gtumedei-io-heading-font") ?? "blue"

export const fnStrings = {
  applyTheme: `(${applyTheme})((${readTheme})(), true)`,
  applyAccent: `(${applyAccent})((${readAccent})())`,
  applyHeadingFont: `(${applyHeadingFont})((${readHeadingFont})())`,
}
