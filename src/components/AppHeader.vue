<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import { useDarkMode } from "@/hooks"

const { isDark, toggleDark } = useDarkMode()

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <header class="container px-6 py-12 flex items-center gap-2">
    <router-link to="/" class="text-lg no-underline inline-block mr-auto">Gianni Tumedei</router-link>
    <button
      class="btn icon"
      :title="t('ui.locale_button_title')"
      @click="toggleLocales"
    >
      <mdi-translate class="text-secondary"/>
    </button>
    <button
      class="btn icon"
      :title="isDark ? t('ui.theme_button.light_title') : t('ui.theme_button.dark_title')"
      @click="() => toggleDark()"
    >
      <mdi-brightness-7 v-if="isDark" class="text-secondary"/>
      <mdi-brightness-4 v-else class="text-secondary"/>
    </button>
  </header>
</template>

<style lang="postcss">

.clip { @apply
  fixed top-0 left-0 bottom-0 right-0
  bg-primary transition transition-all;
}

</style>