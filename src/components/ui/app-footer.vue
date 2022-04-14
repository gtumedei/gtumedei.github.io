<script lang="ts" setup>
import Icon from "@/components/ui/icon.vue"

const year = new Date().getFullYear()
</script>

<template>
  <footer class="w-full flex flex-col items-center bg-primary-dark">
    <div class="container text-sm text-center py-11">
      <p class="inline-flex items-center"><icon name="mdi:copyright" class="!text-sm mr-1"/> {{year}} · Gianni Tumedei</p>
    </div>
  </footer>
</template>