<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import gsap from "gsap"

const props = defineProps<{ content: string[] }>()

const i = ref(0)
const textContent = computed(() => props.content[i.value])
const nextContent = () => i.value = i.value == props.content.length - 1 ? 0 : i.value + 1

const text = ref<SVGTextElement>()
const tween = ref<gsap.core.Tween>()

onMounted(() => {
  tween.value = gsap.to(text.value as SVGTextElement, {
    keyframes: [
      { duration: 0.5 },
      {
        strokeDasharray: "50% 0", strokeDashoffset: "-20%",
        fill: "transparent", stroke: "rgba(0, 0, 0, 0.54)",
        duration: 4
      },
      {
        strokeDasharray: "50% 0", strokeDashoffset: "-20%",
        fill: "rgba(0, 0, 0, 0.8)", stroke: "transparent",
        duration: 1
      },
      { duration: 1 }
    ],
    onComplete: () => {
      tween.value?.reverse()
    },
    onReverseComplete: () => {
      nextContent()
      tween.value?.play()
    }
  })
})

onBeforeUnmount(() => tween.value?.kill())
</script>

<template>
  <div class="animated-text">
    <svg width="100%" height="128">
      <text ref="text" x="50%" y="112" text-anchor="middle">{{textContent}}</text>
    </svg>
  </div>
</template>

<style lang="postcss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");

svg text {
  @apply uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl;
  font-family: "Nunito", sans-serif;
  letter-spacing: 0.1em;
  stroke-width: 0.02em;
  stroke-dasharray: 0 50%;
  stroke-dashoffset: 20%;
  fill: transparent;
  stroke: rgba(0, 0, 0, 0.12);
}

</style>