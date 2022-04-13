<script lang="ts" setup>
import ContactForm from "@/components/contact/contact-form.vue"
import ContactLinks from "@/components/contact/contact-links.vue"
</script>

<template>
  <div class="grid xl:grid-cols-2 xl:gap-18 px-6">
    <contact-links/>
    <contact-form/>
  </div>
</template>