<script lang="ts" setup>
import { ref } from "vue"
import Icon from "@/components/icon.vue"
import { useTippy } from "@/composables"

const emailButton = ref<HTMLAnchorElement>()
const linkedinButton = ref<HTMLAnchorElement>()
const githubButton = ref<HTMLAnchorElement>()
const locationButton = ref<HTMLAnchorElement>()
useTippy(emailButton, "ui.footer.email_btn_title")
useTippy(linkedinButton, "ui.footer.linkedin_btn_title")
useTippy(githubButton, "ui.footer.github_btn_title")
useTippy(locationButton, "ui.footer.location_btn_title")
</script>

<template>
  <footer class="container px-6 pb-6 mt-18">
    <div class="flex justify-center gap-8 p-6 rounded-xl bg-primary-dark">
      <a
        ref="emailButton"
        href="#"
        target="_blank"
        class="btn icon"
      ><icon name="mdi:email-outline"/></a>
      <a
        ref="linkedinButton"
        href="https://www.linkedin.com/in/gianni-tumedei-7171961b8/"
        target="_blank"
        class="btn icon"
      ><icon name="mdi:linkedin"/></a>
      <a
        ref="githubButton"
        href="https://github.com/gtumedei"
        target="_blank"
        class="btn icon"
      ><icon name="mdi:github"/></a>
      <a
        ref="locationButton"
        href="https://goo.gl/maps/knzcetCBj6cHLAAW7"
        target="_blank"
        class="btn icon"
      ><icon name="mdi:map-marker-outline"/></a>
    </div>
  </footer>
</template>