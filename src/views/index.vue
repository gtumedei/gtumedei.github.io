<script setup lang="ts">
import Icon from "@/components/Icon.vue"
import HeroSection from "@/components/index/HeroSection.vue"
import AboutHeading from "@/components/index/AboutHeading.vue"
import FeaturedSection from "@/components/index/FeaturedSection.vue"
import KnowledgeHeading from "@/components/index/KnowledgeHeading.vue"
import ProfileSection from "@/components/index/ProfileSection.vue"
</script>

<template>

  <hero-section/>

  <featured-section/>

  <knowledge-heading/>

  <h3 class="heading">Current tech stack</h3>

  <h3 class="heading">Other technologies</h3>

  <about-heading/>

  <profile-section/>

  <div class="text-center">
    <h3 class="heading">Resume</h3>

    <button class="btn inverted">
        <span>See my CV</span>
        <icon name="mdi:open-in-new"/>
      </button>
  </div>

</template>

<route lang="yaml">
meta:
  layout: default
</route>
