<script lang="ts" setup>
import AppHeader from "@/components/AppHeader.vue"
</script>

<template>
  <div class="absolute top-0 left-0 w-full flex justify-center">
    <app-header/>
  </div>
  <main class="container flex-grow px-6 flex">
    <router-view />
  </main>
</template>