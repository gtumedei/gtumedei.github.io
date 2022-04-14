<script lang="ts" setup>
import AppSection from "@/components/ui/app-section.vue"
import ProfileSection from "./profile-section.vue"
import ResumeSection from "./resume-section.vue"
</script>

<template>
  <app-section class="bg-primary-dark">
    <div id="about-heading" class="flex flex-col items-center text-center pb-32">
      <p class="text-overline mb-2">Catchy headline</p>
      <h2 class="section-heading text-gradient from-[#64B5F6] to-[#64FFDA]">About</h2>
    </div>
    <profile-section/>
    <resume-section/>
  </app-section>
</template>