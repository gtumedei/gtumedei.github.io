<script setup lang="ts">
import { useHomeAnimations } from "@/composables"
import HeroSection from "@/components/index/hero-section.vue"
import AboutHeading from "@/components/index/about-heading.vue"
import FeaturedSection from "@/components/index/featured-section.vue"
import KnowledgeHeading from "@/components/index/knowledge-heading.vue"
import ProfileSection from "@/components/index/profile-section.vue"
import TechnologiesSection from "@/components/index/technologies-section.vue"
import CurrentStackSection from "@/components/index/current-stack-section.vue"
import ResumeSection from "@/components/index/resume-section.vue"

useHomeAnimations()
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
