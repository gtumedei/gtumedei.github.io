const accentTheme = ref<string>("theme-blue")

const applyTheme = (themeName: string) => {
  // Remove previous theme
  document.documentElement.classList.forEach(c =>  {
    if (c.startsWith("theme-")) document.documentElement.classList.remove(c)
  })
  // Apply new theme
  document.documentElement.classList.add(themeName)
  accentTheme.value = themeName
}

export default () => ({ accentTheme, applyTheme })