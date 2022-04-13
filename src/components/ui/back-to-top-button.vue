<script lang="ts" setup>
import { ref } from "vue"
import { useEventListener } from "@vueuse/core"
import Icon from "@/components/ui/icon.vue"
import { useTippy } from "@/composables"

const show = ref(false)
useEventListener(document, "scroll", () => show.value = window.scrollY > 200)

const backToTopButton = ref<HTMLButtonElement>()
useTippy(backToTopButton, "ui.back_to_top_btn_title", "left")

const onClick = () => window.scrollTo({ top: 0, behavior: "smooth" })
</script>

<template>
  <div class="fixed bottom-6 right-6">
    <transition name="fade">
      <button
        v-show="show"
        ref="backToTopButton"
        class="btn fab inverted"
        @click="onClick"
      ><icon name="mdi:menu-up-outline"/></button>
    </transition>
  </div>
</template>
