<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import { useAccentTheme, useDarkMode } from "@/hooks"

interface Theme {
  name: string
  label: string
  class: string
}

const { t } = useI18n()
const { isDark, toggleDark } = useDarkMode()
const { accentTheme, applyTheme } = useAccentTheme()

const primaryThemes = computed(() => {
  const lightTheme: Theme = {
    name: "light",
    label: t("Light theme"),
    class: "bg-light-primary"
  }
  const darkTheme: Theme = {
    name: "dark",
    label: t("Dark theme"),
    class: "bg-dark-primary !after:border-white !after:border-opacity-30"
  }
  return isDark.value
    ? [darkTheme, lightTheme]
    : [lightTheme, darkTheme]
})

const accentThemes = computed(() => {
  const themes: Theme[] = [
    { name: "theme-blue", label: t("Blue"), class: isDark.value ? "bg-accent-blue-dark" : "bg-accent-blue-light" },
    { name: "theme-teal", label: t("Teal"), class: isDark.value ? "bg-accent-teal-dark" : "bg-accent-teal-light" },
    { name: "theme-orange", label: t("Orange"), class: isDark.value ? "bg-accent-orange-dark" : "bg-accent-orange-light" },
    { name: "theme-pink", label: t("Pink"), class: isDark.value ? "bg-accent-pink-dark" : "bg-accent-pink-light" }
  ]
  return [
    themes.find(t => t.name == accentTheme.value) as Theme,
    ...themes.filter(t => t.name != accentTheme.value)
  ]
})

</script>

<template>
  <div class="theme-switcher relative h-5 w-12">
    <div class="theme-selector primary-theme left-0">
      <button
        v-for="theme in primaryThemes"
        :key="theme.name"
        :class="`swatch ${theme.class}`"
        :title="theme.label"
        @click="() => toggleDark(theme.name == 'dark')"
      ></button>
    </div>
    <div class="theme-selector accent-theme left-7">
      <button
        v-for="theme in accentThemes"
        :key="theme.name"
        :class="`swatch ${theme.class}`"
        :title="theme.label"
        @click="() => applyTheme(theme.name)"
      ></button>
    </div>
  </div>
</template>

<style scoped lang="postcss">

.theme-selector { @apply
  absolute top-0
  flex flex-col gap-1
  h-auto w-5;
}

.theme-selector:hover > .swatch { @apply
  !opacity-100 !pointer-events-auto;
}

.swatch { @apply
  relative outline-none flex-shrink-0
  h-5 w-5 rounded-full;

  &::after {
    content: "";
    @apply
      absolute top-0 left-0
      h-full w-full rounded-full
      border-2 border-black border-opacity-10;
  }

  &:not(:first-child) { @apply
    opacity-0 pointer-events-none;
  }
}

</style>