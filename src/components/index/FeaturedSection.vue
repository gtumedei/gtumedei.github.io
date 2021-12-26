<script lang="ts" setup>
import { useI18n } from "@/composables"
import FeaturedProject from "@/components/index/FeaturedProject.vue"

const { t } = useI18n()

const projects = [
  {
    name: "featured.items.0.name",
    type: "featured.items.0.type",
    description: "featured.items.0.description",
    image: "/mtt.jpeg"
  },
  {
    name: "featured.items.1.name",
    type: "featured.items.1.type",
    description: "featured.items.1.description",
    image: "/placeholder.png"
  },
  {
    name: "featured.items.2.name",
    type: "featured.items.2.type",
    description: "featured.items.2.description",
    image: "/tbg.jpeg"
  }
]
</script>

<template>
  <div class="mb-18">
    <h2 class="heading">{{t("featured.heading")}}</h2>

    <div class="flex flex-col gap-12">
      <featured-project
        v-for="(project, i) in projects" :key="i"
        :project="project"
        :flip-layout="i % 2 != 0"
      />
    </div>
  </div>
</template>