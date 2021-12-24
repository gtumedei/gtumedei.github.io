<script lang="ts" setup>
import Icon from "@/components/Icon.vue"
</script>

<template>
  <footer class="container py-12 flex justify-center gap-8">
    <a
      href="#"
      target="_blank"
      class="footer-item btn icon"
      title="Contact me"
    ><icon name="mdi:email-outline"/></a>
    <a
      href="https://www.linkedin.com/in/gianni-tumedei-7171961b8/"
      target="_blank"
      class="footer-item btn icon"
      title="Gianni Tumedei on LinkedIn"
    ><icon name="mdi:linkedin"/></a>
    <a
      href="https://github.com/gtumedei"
      target="_blank"
      class="footer-item btn icon"
      title="gtumedei on GitHub"
    ><icon name="mdi:github"/></a>
    <a
      href="https://goo.gl/maps/knzcetCBj6cHLAAW7"
      target="_blank"
      class="footer-item btn icon"
      title="Located in Cesena (IT)"
    ><icon name="mdi:map-marker-outline"/></a>
  </footer>
</template>

<style lang="postcss" scoped>

.footer-item { @apply
  text-xl !text-faded
  !hover:text-base;
}

</style>