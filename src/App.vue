<script setup lang="ts">
import { useHead } from "@vueuse/head"

useHead({
  title: "Gianni Tumedei",
  meta: [
    { name: "description", content: "My portfolio website" },
  ],
})
</script>

<template>
  <router-view />
</template>
