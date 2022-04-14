<script lang="ts" setup>
import AppSection from "@/components/ui/app-section.vue"
import { Featured } from "@/types"
import FeaturedItem from "./featured-item.vue"

const projects: Featured[] = [
  {
    name: "featured.items.0.name",
    type: "featured.items.0.type",
    description: "featured.items.0.description",
    image: "/mtt.jpeg",
    url: "https://morethantech.it"
  },
  {
    name: "featured.items.1.name",
    type: "featured.items.1.type",
    description: "featured.items.1.description",
    image: "/placeholder.png",
    url: "#"
  },
  {
    name: "featured.items.2.name",
    type: "featured.items.2.type",
    description: "featured.items.2.description",
    image: "/tbg.jpeg",
    url: "https://tbgstudio.it"
  }
]
</script>

<template>
  <app-section class="bg-primary-dark">
    <div id="featured-heading" class="flex flex-col items-center text-center pb-32">
      <p class="text-overline mb-2">Catchy headline</p>
      <h2 class="section-heading text-gradient from-[#FF8A80] to-[#FBC2EB]">Featured content</h2>
    </div>
    <div class="flex flex-col gap-12">
      <featured-item
        v-for="(project, i) in projects" :key="i"
        :project="project"
        :flip-layout="i % 2 != 0"
      />
    </div>
  </app-section>
</template>