<script lang="ts" setup>
import { onMounted } from "vue"
import { useHead } from "@vueuse/head"
import ThemeWatcher from "@/components/ThemeWatcher.vue"
import { useI18n } from "./composables"

useHead({
  title: "Gianni Tumedei",
  meta: [
    { name: "description", content: "My portfolio website" }
  ]
})

onMounted(() => {
  // Prevent the "flash of unstyled content" by revealing the body only after the app is mounted
  document.body.style.visibility = "visible"

  // Load locale from local storage, if present
  const savedLocale = localStorage.getItem("locale")
  if (savedLocale) {
    const { locale } = useI18n()
    locale.value = savedLocale
  }
})
</script>

<template>
  <router-view/>
  <client-only><theme-watcher/></client-only>
</template>
