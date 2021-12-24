<script lang="ts" setup>
const props = defineProps<{ name: string, class?: string }>()
</script>

<template>
  <div :class="`inline-flex text-xl ${props.class ?? ''}`">
    <span class="iconify" :data-icon="props.name"></span>
  </div>
</template>