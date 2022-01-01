<script lang="ts" setup>
import { useDarkMode, useI18n, useTippy } from "@/composables"
import Icon from "@/components/Icon.vue"
import { computed, ref } from "vue";

const { isDark, toggleDark } = useDarkMode()
const { toggleLocales } = useI18n()

const localeButton = ref<HTMLButtonElement>()
const themeButton = ref<HTMLButtonElement>()

useTippy(localeButton, "ui.header.locale_btn_title", "bottom")
useTippy(
  themeButton,
  computed(() => isDark.value ? "ui.header.theme_btn.light_title" : "ui.header.theme_btn.dark_title"),
  "bottom"
)
</script>

<template>
  <header class="container px-6 py-12 flex items-center gap-2">
    <router-link to="/" class="text-lg no-underline inline-block mr-auto">Gianni Tumedei</router-link>
    <button
      ref="localeButton"
      class="btn icon"
      @click="toggleLocales"
    >
      <icon name="mdi:translate" class="text-secondary"/>
    </button>
    <button
      ref="themeButton"
      class="btn icon"
      @click="() => toggleDark()"
    >
      <icon v-if="isDark" name="mdi:brightness-7" class="text-secondary"/>
      <icon v-else name="mdi:brightness-4" class="text-secondary"/>
    </button>
  </header>
</template>