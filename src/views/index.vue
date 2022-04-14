<script setup lang="ts">
import { useHomeAnimations } from "@/composables"
import AboutSection from "@/components/about/about-section.vue"
import ContactSection from "@/components/contact/contact-section.vue"
import FeaturedSection from "@/components/featured/featured-section.vue"
import HeroSection from "@/components/hero/hero-section.vue"
import KnowledgeSection from "@/components/knowledge/knowledge-section.vue"

useHomeAnimations()
</script>

<template>
  <hero-section/>
  <featured-section/>
  <knowledge-section/>
  <about-section/>
  <contact-section/>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
