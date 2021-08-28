<!-- <script lang="ts" setup>
import { useI18n } from "vue-i18n"
import { useDarkMode } from "@/hooks"

const { t, availableLocales, locale } = useI18n()
const { isDark, toggleDark: toggle } = useDarkMode()

const toggleDark = () => toggle()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script> -->

<template>
  <footer class="container py-12 flex justify-center gap-8">
    <a href="#" class="btn icon text-2xl !text-faded"><mdi-email/></a>
    <a href="#" class="btn icon text-2xl !text-faded"><mdi-linkedin/></a>
    <a href="#" class="btn icon text-2xl !text-faded"><mdi-github/></a>
    <a href="#" class="btn icon text-2xl !text-faded"><mdi-map-marker/></a>
  </footer>
</template>
