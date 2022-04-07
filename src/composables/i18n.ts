import { useI18n as useVueI18n } from "vue-i18n"

export const useI18n = () => {
  const { t, availableLocales, locale } = useVueI18n()

  const toggleLocales = () => {
    const locales = availableLocales
    const newValue = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    locale.value = newValue
    localStorage.setItem("locale", newValue)
  }

  return { t, locale, toggleLocales }
}