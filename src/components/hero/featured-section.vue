<script lang="ts" setup>
import { useI18n } from "@/composables"
import Featured from "@/models/featured"
import FeaturedItem from "@/components/hero/featured-item.vue"

const { t } = useI18n()

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
  <div class="px-6 mb-18">
    <h2 class="heading">{{t("featured.heading")}}</h2>

    <div class="flex flex-col gap-12">
      <featured-item
        v-for="(project, i) in projects" :key="i"
        :project="project"
        :flip-layout="i % 2 != 0"
      />
    </div>
  </div>
</template>