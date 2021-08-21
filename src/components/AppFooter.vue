<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import { useDarkMode } from "@/hooks"

const { t, availableLocales, locale } = useI18n()
const { isDark, toggleDark: toggle } = useDarkMode()

const toggleDark = () => toggle()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <footer class="footer mt-auto text-xl mt-6">
    <router-link class="icon-btn mx-2" to="/" :title="t('Home')">
      <mdi-tent/>
    </router-link>

    <button class="icon-btn mx-2 !outline-none" :title="t('Toggle dark mode')" @click="toggleDark">
      <mdi-weather-sunny v-if="isDark" />
      <mdi-weather-night v-else />
    </button>

    <a class="icon-btn mx-2" :title="t('Change language')" @click="toggleLocales">
      <mdi-translate />
    </a>

    <router-link class="icon-btn mx-2" to="/about" :title="t('About')">
      <mdi-information-outline />
    </router-link>

    <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank" title="GitHub">
      <mdi-github />
    </a>
  </footer>
</template>
