<script lang="ts" setup>
import AppHeader from "@/components/app-header.vue"
import AppFooter from "@/components/app-footer.vue"
import BackToTopButton from "@/components/back-to-top-button.vue"
</script>

<template>
  <app-header/>
  <main class="container flex-grow px-6">
    <router-view />
  </main>
  <app-footer/>
  <client-only><back-to-top-button/></client-only>
</template>
