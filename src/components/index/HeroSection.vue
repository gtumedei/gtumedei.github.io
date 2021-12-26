<script lang="ts" setup>
import Icon from "@/components/Icon.vue"

const onMainCallToActionClick = () => window.scrollTo({ top: 820, behavior: "smooth" })
</script>

<template>
  <div id="hero" class="
    card py-64 lg:px-12 mb-18
    bg-gradient-to-br from-[#FF8A80] to-[#FFD54F]
    flex flex-col justify-center items-center
    text-black-80 text-center
    relative
  ">
    <h1 class="display-heading">Gianni <span class="text-stroke-none text-black-80">Tumedei</span></h1>
    <icon name="mdi:cards-diamond-outline" class="mt-4 mb-5"/>
    <p class="text-sm font-bold uppercase tracking-wide">Work in Progress<!-- IT Engineer, Full Stack Developer --></p>
    <button class="btn absolute-center-x bottom-12" @click="onMainCallToActionClick">
      <span class="whitespace-nowrap">Check out my work</span>
      <icon name="mdi:chevron-double-down"/>
    </button>
  </div>
</template>