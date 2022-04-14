<script lang="ts" setup>
import AppHeader from "@/components/ui/app-header.vue"
import AppFooter from "@/components/ui/app-footer.vue"
import BackToTopButton from "@/components/ui/back-to-top-button.vue"
</script>

<template>
  <app-header/>
  <main class="w-full flex flex-col items-center">
    <router-view/>
  </main>
  <app-footer/>
  <client-only><back-to-top-button/></client-only>
</template>