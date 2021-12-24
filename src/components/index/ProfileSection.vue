<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import gsap from "gsap"
import Icon from "@/components/Icon.vue"

// Animation stuff

const profileImg = ref<HTMLDivElement>()
const textDiv = ref<HTMLDivElement>()

const lgAndUp = useBreakpoints(breakpointsTailwind).greater("lg")

onMounted(() => {
  const options: gsap.TweenVars = { opacity: 0, duration: 0.5 }
  gsap.from(profileImg.value!, {
    scrollTrigger: { trigger: profileImg.value!, start: "50% bottom" },
    x: lgAndUp.value ? -32 : 0,
    y: lgAndUp.value ? 0 : 32,
    ...options
  })
  gsap.from(textDiv.value!, {
    scrollTrigger: { trigger: textDiv.value!, start: "50% bottom" },
    y: 32,
    ...options
  })
})
</script>

<template>
  <div class="profile flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-18">
    <img
      ref="profileImg"
      src="/profile.jpg" alt="Profile image"
      class="h-64 w-64 rounded-full shadow-xl"
    />
    <div ref="textDiv">
      <p class="font-serif text-2xl mb-4">Hi, I'm Gianni</p>
      <p class="mb-6">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Reiciendis consectetur id voluptates culpa aspernatur possimus, fugit nostrum illum temporibus facilis
        eum autem atque dolores ipsum, illo saepe odio cumque vel.
      </p>
      <button class="btn inverted">
        <span>Get in touch</span>
        <icon name="mdi:message-outline"/>
      </button>
    </div>
  </div>
</template>