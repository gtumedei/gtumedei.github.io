<script setup lang="ts">
import { useHomeAnimations } from "@/composables"
import AboutHeading from "@/components/about/about-heading.vue"
import ProfileSection from "@/components/about/profile-section.vue"
import ResumeSection from "@/components/about/resume-section.vue"
import ContactHeading from "@/components/contact/contact-heading.vue"
import ContactSection from "@/components/contact/contact-section.vue"
import FeaturedSection from "@/components/hero/featured-section.vue"
import HeroSection from "@/components/hero/hero-section.vue"
import CurrentStackSection from "@/components/knowledge/current-stack-section.vue"
import KnowledgeHeading from "@/components/knowledge/knowledge-heading.vue"
import TechnologiesSection from "@/components/knowledge/technologies-section.vue"

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

  <contact-heading/>
  <contact-section/>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
