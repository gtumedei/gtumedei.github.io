<script lang="ts" setup>
import { onMounted, ref } from "vue"
import gsap from "gsap"

const knowledgeHeading = ref<HTMLDivElement>()

onMounted(() => gsap.from(knowledgeHeading.value!, {
  scrollTrigger: { trigger: knowledgeHeading.value!, start: "80% bottom" },
  opacity: 0,
  y: 32,
  duration: 0.5
}))
</script>

<template>
  <div ref="knowledgeHeading" class="
    card bg-gradient-to-br from-[#a18cd1] to-[#fbc2eb]
    h-64 lg:h-80 mb-18 text-black-80
    flex flex-col justify-center items-center
  ">
    <h2 class="display-heading">Knowledge</h2>
  </div>
</template>