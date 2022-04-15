<script lang="ts" setup>
import Icon from "@/components/ui/icon.vue"

const links = [
  {
    title: "LinkedIn",
    subtitle: "@gianni-tumedei",
    icon: "mdi:linkedin",
    colors: { text: "!hover:text-[#0284C7]", hover: "!hover:bg-[#0284C7]" },
    url: "https://www.linkedin.com/in/gianni-tumedei-7171961b8/"
  },
  {
    title: "GitHub",
    subtitle: "gtumedei",
    icon: "mdi:github",
    colors: { text: "!hover:text-[#546E7A]", hover: "!hover:bg-[#546E7A]" },
    url: "https://github.com/gtumedei"
  },
  {
    title: "Location",
    subtitle: "Cesena (IT)",
    icon: "mdi:map-marker-outline",
    colors: { text: "!hover:text-[#FF5252]", hover: "!hover:bg-[#FF5252]" },
    url: "https://goo.gl/maps/knzcetCBj6cHLAAW7"
  }
]
</script>

<template>
  <div class="contact-links w-full flex flex-col gap-12">
    <h3 class="section-subheading lg:mb-4">Find me online</h3>
    <a
      v-for="(link, i) in links" :key="i"
      :href="link.url" target="_blank"
      class="relative flex items-center gap-6 p-4 rounded-xl bg-primary-dark"
    >
      <icon :name="link.icon" class="p-6 rounded-xl bg-primary !text-4xl text-inverted-primary"/>
      <div>
        <h4 class="section-subsubheading">{{link.title}}</h4>
        <p>{{link.subtitle}}</p>
      </div>
    </a>
  </div>
</template>