<script lang="ts" setup>
import Icon from "@/components/ui/icon.vue"

const year = new Date().getFullYear()
</script>

<template>
  <footer class="container text-sm text-center pt-18 pb-12">
    <p class="inline-flex items-center"><icon name="mdi:copyright" class="!text-sm mr-1"/> {{year}} · Gianni Tumedei</p>
  </footer>
</template>