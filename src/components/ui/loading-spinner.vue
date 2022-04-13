<script lang="ts" setup>
withDefaults(
  defineProps<{ inverted: boolean }>(),
  { inverted: false }
)
</script>

<template>
  <div :class="`spinner ${inverted ? 'bg-inverted-typography-base' : 'bg-typography-base'}`"></div>
</template>

<style lang="postcss" scoped>

.spinner { @apply
  h-5 w-5 rounded-full;
  animation: scaleout 1.0s infinite ease-in-out;
}

@keyframes scaleout {

  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1.0);
    opacity: 0;
  }
}

</style>