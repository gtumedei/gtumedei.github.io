<script lang="ts" setup>
import AppSection from "@/components/ui/app-section.vue"
import Profile from "./profile.vue"
import Resume from "./resume.vue"
</script>

<template>
  <app-section class="bg-primary-dark">
    <div id="about-heading" class="flex flex-col items-center text-center pb-32">
      <p class="text-overline mb-2">Catchy headline</p>
      <h2 class="section-heading text-gradient from-[#64B5F6] to-[#64FFDA]">About</h2>
    </div>
    <profile/>
    <resume/>
  </app-section>
</template>