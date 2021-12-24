<script lang="ts" setup>
import { onMounted, ref } from "vue"
import gsap from "gsap"

const aboutHeading = ref<HTMLDivElement>()

onMounted(() => gsap.from(aboutHeading.value!, {
  scrollTrigger: { trigger: aboutHeading.value!, start: "80% bottom" },
  opacity: 0,
  y: 32,
  duration: 0.5
}))
</script>

<template>
  <div ref="aboutHeading" class="
    card bg-gradient-to-br from-[#A7FFEB] to-[#64B5F6]
    h-64 lg:h-80 mb-18 text-black-80
    flex flex-col justify-center items-center
  ">
    <h2 class="display-heading">About me</h2>
  </div>
</template>