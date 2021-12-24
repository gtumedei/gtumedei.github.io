<script setup lang="ts">
import FeaturedSection from "@/components/index/FeaturedSection.vue"
import ProfileSection from "@/components/index/ProfileSection.vue"

const onMainCallToActionClick = () => window.scrollTo({ top: 780, behavior: "smooth" })
</script>

<template>

  <div class="
    card py-64 lg:px-12 mb-18
    bg-gradient-to-br from-[#FF8A80] to-[#FFD54F]
    flex flex-col justify-center
    text-black-80 text-center
    relative
  ">
    <h1 class="display-heading">Gianni <span class="text-stroke-none text-black-80">Tumedei</span></h1>
    <p class="text-lg tracking-wide mt-4">IT Engineer, Full Stack Developer</p>
    <button class="btn absolute-center-x bottom-12" @click="onMainCallToActionClick">
      <span class="whitespace-nowrap">Check out my work</span>
      <mdi-chevron-double-down/>
    </button>
  </div>

  <featured-section/>

  <div class="
    card bg-gradient-to-br from-[#a18cd1] to-[#fbc2eb]
    h-80 mb-18 text-black-80
    flex flex-col justify-center items-center
  ">
    <h2 class="display-heading">Knowledge</h2>
  </div>

  <h3 class="heading">Current tech stack</h3>

  <h3 class="heading">Other technologies</h3>

  <div class="
    card bg-gradient-to-br from-[#A7FFEB] to-[#64B5F6]
    h-80 mb-18 text-black-80
    flex flex-col justify-center items-center
  ">
    <h2 class="display-heading">About me</h2>
  </div>

  <profile-section/>

  <div class="text-center">
    <h3 class="heading">Resume</h3>

    <button class="btn inverted">
        <span>See my CV</span>
        <mdi-open-in-new/>
      </button>
  </div>

</template>

<route lang="yaml">
meta:
  layout: default
</route>
