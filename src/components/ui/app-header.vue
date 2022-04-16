<script lang="ts" setup>
import { computed, ref } from "vue"
import { useDarkMode, useI18n, useTippy } from "@/composables"
import Icon from "@/components/ui/icon.vue"

withDefaults(
  defineProps<{ showName?: boolean }>(),
  { showName: false }
)

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
  <header class="container p-6 flex items-center gap-2">
    <router-link v-if="showName" to="/" class="text-lg mr-auto">Gianni Tumedei</router-link>
    <div v-else class="mr-auto"></div>
    <button
      ref="localeButton"
      class="btn icon"
      @click="toggleLocales"
    >
      <icon name="mdi:translate"/>
    </button>
    <button
      ref="themeButton"
      class="btn icon"
      @click="() => toggleDark()"
    >
      <icon v-if="isDark" name="mdi:brightness-7"/>
      <icon v-else name="mdi:brightness-4"/>
    </button>
  </header>
</template>