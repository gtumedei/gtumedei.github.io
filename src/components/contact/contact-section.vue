<script lang="ts" setup>
import AppSection from "@/components/ui/app-section.vue"
import ContactForm from "./contact-form.vue"
import ContactLinks from "./contact-links.vue"
</script>

<template>
  <app-section>
    <div id="contact-heading" class="flex flex-col items-center text-center pb-32">
      <p class="text-overline mb-2">Catchy headline</p>
      <h2 class="section-heading text-gradient from-[#64FFDA] to-[#00E676]">Get in touch</h2>
    </div>
    <div class="grid xl:grid-cols-2 xl:gap-18">
      <contact-links/>
      <contact-form/>
    </div>
  </app-section>
</template>