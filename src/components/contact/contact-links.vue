<script lang="ts" setup>
import LinkItem from "./link-item.vue"

const links = [
  {
    label: "LinkedIn",
    icon: "mdi:linkedin",
    colors: { text: "!hover:text-[#0284C7]", hover: "!hover:bg-[#0284C7]" },
    url: "https://www.linkedin.com/in/gianni-tumedei-7171961b8/"
  },
  {
    label: "GitHub",
    icon: "mdi:github",
    colors: { text: "!hover:text-[#546E7A]", hover: "!hover:bg-[#546E7A]" },
    url: "https://github.com/gtumedei"
  },
  {
    label: "Cesena (IT)",
    icon: "mdi:map-marker-outline",
    colors: { text: "!hover:text-[#FF5252]", hover: "!hover:bg-[#FF5252]" },
    url: "https://goo.gl/maps/knzcetCBj6cHLAAW7"
  }
]
</script>

<template>
  <div class="contact-links">
    <link-item
      v-for="(link, i) in links" :key="i"
      :class="`link-${i + 1} mx-12`"
      :label="link.label"
      :icon="link.icon"
      :colors="link.colors"
      :url="link.url"
    />
  </div>
</template>

<style lang="postcss" scoped>

.contact-links {
  @apply hidden lg:grid p-18 gap-18 m-auto;
  grid-template-areas:
    "link1 link2"
    "link3 link3";
}

.link-1 { grid-area: link1; }
.link-2 { grid-area: link2; }
.link-3 { grid-area: link3; }

</style>