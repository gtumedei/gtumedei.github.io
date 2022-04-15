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
    <div class="grid lg:grid-cols-5 gap-18">
      <contact-form class="lg:col-span-3"/>
      <contact-links class="lg:col-span-2"/>
    </div>
  </app-section>
</template>