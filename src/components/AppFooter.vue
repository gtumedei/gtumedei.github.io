<script lang="ts" setup>
import Icon from "@/components/Icon.vue"
</script>

<template>
  <footer class="container px-6 pb-6 mt-18">
    <div class="flex justify-center gap-8 p-6 rounded-xl bg-primary-dark">
      <a
        href="#"
        target="_blank"
        class="btn icon"
        title="Contact me"
      ><icon name="mdi:email-outline"/></a>
      <a
        href="https://www.linkedin.com/in/gianni-tumedei-7171961b8/"
        target="_blank"
        class="btn icon"
        title="Gianni Tumedei on LinkedIn"
      ><icon name="mdi:linkedin"/></a>
      <a
        href="https://github.com/gtumedei"
        target="_blank"
        class="btn icon"
        title="gtumedei on GitHub"
      ><icon name="mdi:github"/></a>
      <a
        href="https://goo.gl/maps/knzcetCBj6cHLAAW7"
        target="_blank"
        class="btn icon"
        title="Located in Cesena (IT)"
      ><icon name="mdi:map-marker-outline"/></a>
    </div>
  </footer>
</template>