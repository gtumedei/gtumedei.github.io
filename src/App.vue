<script lang="ts" setup>
import { useHead } from "@vueuse/head"
import { useDarkMode } from "@/hooks"

const { isDark } = useDarkMode()

useHead({
  title: "Gianni Tumedei",
  meta: [
    { name: "description", content: "My portfolio website" },
    {
      name: "theme-color",
      content: computed(() => isDark.value ? "#404040" : "#FAFAFA")
    }
  ]
})
</script>

<template>
  <router-view />
</template>
