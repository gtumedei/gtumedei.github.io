<script lang="ts" setup>
import { onMounted } from "vue"
import { useHead } from "@vueuse/head"
import ThemeWatcher from "@/components/ThemeWatcher.vue"

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
