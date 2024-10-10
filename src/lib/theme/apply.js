// Theme

export const applyTheme = (theme) => {
  // Remove existing theme color meta tags
  document.querySelectorAll(`meta[name="theme-color"]`).forEach((elem) => elem.remove())
  if (theme == "system") {
    // Remove data-theme attribute
    document.documentElement.removeAttribute("data-theme")
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
    // Add/update data-theme attribute
    document.documentElement.setAttribute("data-theme", theme)
    // Add theme color meta tag
    const meta = document.createElement("meta")
    meta.name = "theme-color"
    meta.content = theme == "light" ? "#FFFFFF" : "#171717"
    document.head.append(meta)
  }
}

const getTheme = () => localStorage.getItem("gtumedei-io-theme") ?? "system"

export const applyThemeFnString = `(${applyTheme})((${getTheme})())`

// Accent

export const applyAccent = (accent) => {
  if (accent == "blue") {
    document.documentElement.removeAttribute("data-accent")
  } else {
    document.documentElement.setAttribute("data-accent", accent)
  }
}

const getAccent = () => localStorage.getItem("gtumedei-io-accent") ?? "blue"

export const applyAccentFnString = `(${applyAccent})((${getAccent})())`
