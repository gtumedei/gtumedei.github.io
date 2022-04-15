<script lang="ts" setup>
import { computed } from "vue"
import { useHead } from "@vueuse/head"
import { useDarkMode } from "@/composables"

const { isDark } = useDarkMode()

useHead({
  meta: [
    {
      name: "theme-color",
      content: computed(() => isDark.value ? "#303030" : "#FFFFFF")
    }
  ]
})
</script>

<template></template>