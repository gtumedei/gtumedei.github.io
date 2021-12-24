<script lang="ts" setup>
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import BackToTopButton from "@/components/BackToTopButton.vue"
</script>

<template>
  <app-header/>
  <main class="container flex-grow px-6">
    <router-view />
  </main>
  <app-footer/>
  <client-only><back-to-top-button/></client-only>
</template>
