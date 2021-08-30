<script lang="ts" setup>
import { useDarkMode } from "@/hooks"
const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <header class="container px-6 py-12 flex items-center gap-2">
    <a href="#" class="text-lg no-underline inline-block mr-auto">Gianni Tumedei</a>
    <button class="btn icon" title="Change language">
      <mdi-translate class="text-secondary"/>
    </button>
    <button
      class="btn icon"
      :title="isDark ? 'Enable light theme' : 'Enable dark theme'"
      @click="() => toggleDark()"
    >
      <mdi-brightness-7 v-if="isDark" class="text-secondary"/>
      <mdi-brightness-4 v-else class="text-secondary"/>
    </button>
  </header>
</template>

<style lang="postcss">

.clip { @apply
  fixed top-0 left-0 bottom-0 right-0
  bg-primary transition transition-all;
}

</style>