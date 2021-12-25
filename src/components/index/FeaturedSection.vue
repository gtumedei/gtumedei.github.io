<script lang="ts" setup>
import FeaturedProject from "@/components/index/FeaturedProject.vue"

const projects = [
  {
    name: "Project Name",
    type: "Type of Project",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid nihil magni porro, veniam labore dolor officia eveniet adipisci quae repudiandae.",
    image: "/placeholder.png"
  },
  {
    name: "Project Name",
    type: "Type of Project",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid nihil magni porro, veniam labore dolor officia eveniet adipisci quae repudiandae.",
    image: "/placeholder.png"
  },
  {
    name: "Project Name",
    type: "Type of Project",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid nihil magni porro, veniam labore dolor officia eveniet adipisci quae repudiandae.",
    image: "/placeholder.png"
  }
]
</script>

<template>
  <div class="mb-18">
    <h2 class="heading">Featured</h2>

    <div class="flex flex-col gap-12">
      <featured-project
        v-for="(project, i) in projects" :key="i"
        :project="project"
        :flip-layout="i % 2 != 0"
      />
    </div>
  </div>
</template>