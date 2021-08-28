<script lang="ts" setup>
import { useDarkMode } from "@/hooks"

const { toggleDark } = useDarkMode()

const btnToggleDark = ref<HTMLButtonElement | undefined>(undefined)
const clip = ref<HTMLDivElement | undefined>(undefined)

// const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

const animateDarkToggle = async () => {
  /* if (btnToggleDark.value == undefined || clip.value == undefined) return
  clip.value.classList.remove("hidden")
  await delay(1)
  clip.value.classList.remove("opacity-0")
  await delay(200) */
  toggleDark()
  /* await delay(200)
  clip.value.classList.add("opacity-0")
  await delay(200)
  clip.value.classList.add("hidden") */
}
</script>

<template>
  <header class="container px-6 py-12 flex items-center gap-2">
    <a href="#" class="text-lg no-underline inline-block mr-auto">Gianni Tumedei</a>
    <button class="btn icon">
      <mdi-translate class="text-secondary"/>
    </button>
    <button ref="btnToggleDark" class="btn icon">
      <mdi-theme-light-dark class="text-secondary" @click="animateDarkToggle"/>
    </button>
  </header>

  <teleport to="body">
    <div ref="clip" class="clip opacity-0 hidden"></div>
  </teleport>

</template>

<style lang="postcss">

.clip { @apply
  fixed top-0 left-0 bottom-0 right-0
  bg-primary transition transition-all;
}

</style>