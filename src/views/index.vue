<script setup lang="ts">
import HeroSection from "@/components/index/HeroSection.vue"
import AboutHeading from "@/components/index/AboutHeading.vue"
import FeaturedSection from "@/components/index/FeaturedSection.vue"
import KnowledgeHeading from "@/components/index/KnowledgeHeading.vue"
import ProfileSection from "@/components/index/ProfileSection.vue"
import TechnologiesSection from "@/components/index/TechnologiesSection.vue"
import CurrentStackSection from "@/components/index/CurrentStackSection.vue"
import ResumeSection from "@/components/index/ResumeSection.vue"
</script>

<template>
  <hero-section/>
  <featured-section/>

  <knowledge-heading/>
  <current-stack-section/>
  <technologies-section/>

  <about-heading/>
  <profile-section/>
  <resume-section/>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
