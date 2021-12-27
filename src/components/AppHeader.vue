<script lang="ts" setup>
import { useDarkMode, useI18n } from "@/composables"
import Icon from "@/components/Icon.vue"

const { isDark, toggleDark } = useDarkMode()
const { t, toggleLocales } = useI18n()
</script>

<template>
  <header class="container px-6 py-12 flex items-center gap-2">
    <router-link to="/" class="text-lg no-underline inline-block mr-auto">Gianni Tumedei</router-link>
    <button
      class="btn icon"
      :title="t('ui.locale_button_title')"
      @click="toggleLocales"
    >
      <icon name="mdi:translate" class="text-secondary"/>
    </button>
    <button
      class="btn icon"
      :title="isDark ? t('ui.theme_button.light_title') : t('ui.theme_button.dark_title')"
      @click="() => toggleDark()"
    >
      <icon v-if="isDark" name="mdi:brightness-7" class="text-secondary"/>
      <icon v-else name="mdi:brightness-4" class="text-secondary"/>
    </button>
  </header>
</template>