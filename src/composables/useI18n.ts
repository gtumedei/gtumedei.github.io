import { useI18n } from "vue-i18n"

export default () => {
  const { t, availableLocales, locale } = useI18n()

  const toggleLocales = () => {
    const locales = availableLocales
    const newValue = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    locale.value = newValue
    localStorage.setItem("locale", newValue)
  }

  return { t, locale, toggleLocales }
}