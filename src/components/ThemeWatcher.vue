<script lang="ts" setup>
import { useHead } from "@vueuse/head"
import { useDarkMode } from "@/hooks"

const { isDark } = useDarkMode()

useHead({
  meta: [
    {
      name: "theme-color",
      content: computed(() => isDark.value ? "#404040" : "#FAFAFA")
    }
  ]
})
</script>

<template></template>