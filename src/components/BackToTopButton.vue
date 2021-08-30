<script lang="ts" setup>
import { useEventListener } from "@vueuse/core"

const show = ref(false)
useEventListener(document, "scroll", () => show.value = window.scrollY > 200)

const onClick = () => window.scrollTo({ top: 0, behavior: "smooth" })

</script>

<template>
  <div class="fixed bottom-6 right-6">
    <transition name="fade">
      <button
        v-if="show"
        class="btn fab inverted"
        title="Go back to top"
        @click="onClick"
      ><mdi-menu-up-outline/></button>
    </transition>
  </div>
</template>
