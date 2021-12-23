<script lang="ts" setup>
import { useHead } from "@vueuse/head"

useHead({
  title: "Gianni Tumedei",
  meta: [
    { name: "description", content: "My portfolio website" }
  ]
})

// Prevent the "flash of unstyled content" by revealing the body only after the app is mounted
onMounted(() => document.body.style.visibility = "visible")
</script>

<template>
  <router-view/>
  <client-only><theme-watcher/></client-only>
</template>
