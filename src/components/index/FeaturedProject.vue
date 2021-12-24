<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import gsap from "gsap"
import Project from "@/models/Project"
import ZImg from "@/components/ZImg.vue"

const props = defineProps<{
  project: Project
  flipLayout?: boolean
}>()

// Animation stuff

const textDiv = ref<HTMLDivElement>()
const imgDiv = ref<HTMLDivElement>()

const lgAndUp = useBreakpoints(breakpointsTailwind).greater("lg")

onMounted(() => {
  const options: gsap.TweenVars = { opacity: 0, duration: 0.5 }
  gsap.from(textDiv.value!, {
    scrollTrigger: { trigger: textDiv.value!, start: "50% bottom" },
    y: 32,
    ...options
  })
  gsap.from(imgDiv.value!, {
    scrollTrigger: { trigger: imgDiv.value!, start: "50% bottom" },
    x: lgAndUp.value
      ? props.flipLayout ? -32 : 32
      : 0,
    y: lgAndUp.value ? 0 : 32,
    ...options
  })
})
</script>

<template>
  <div class="flex flex-col lg:flex-row lg:gap-24">
    <div ref="textDiv" class="w-full lg:w-3/5 py-6 flex flex-col justify-center order-1" :class="{ 'lg:order-2': flipLayout }">
      <p class="text-sm text-secondary font-bold uppercase mb-1">{{project.type}}</p>
      <h3 class="text-2xl mb-4">{{project.name}}</h3>
      <p>{{project.description}}</p>
    </div>
    <div ref="imgDiv" class="w-full lg:w-2/5 order-2" :class="{ 'lg:order-1': flipLayout }">
      <z-img :src="project.image" class="object-cover w-full h-72 card p-0" alt="placeholder image"/>
    </div>
  </div>
</template>