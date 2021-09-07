<script lang="ts" setup>
/* import gsap from "gsap"

const tween = ref<gsap.core.Tween>()

onMounted(() => {
  // tween.value = gsap.fromTo(".scroll-icon",
  //   { opacity: 0, y: -10 },
  //   { opacity: 1, y: 0, duration: 1, stagger: 0.2, yoyo: true, repeat: -1 }
  // )

  const tl = gsap.timeline({delay: 2})
  tl.set(".scroll-icon", { opacity: 0, y: -10 })
  tl.to(".scroll-icon", {
    keyframes: [
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.2 },
      { opacity: 0, duration: 1 }
    ],
    ease: "easeInOut.Power2",
    repeat: -1
  })

})

onBeforeUnmount(() => tween.value?.kill()) */

</script>

<template>
  <div class="
    flex flex-col-reverse space-y-reverse -space-y-2 text-lg text-black-54
    absolute bottom-12 right-1/2 transform translate-x-1/2
    lg:right-12 lg:bottom-1/2 lg:translate-x-0 lg:translate-y-1/2
  ">
    <mdi-menu-down-outline class="scroll-icon"/>
    <mdi-menu-down-outline class="scroll-icon"/>
    <mdi-menu-down-outline class="scroll-icon"/>
  </div>
</template>