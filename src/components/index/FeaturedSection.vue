<script lang="ts" setup>
import projects from "@/data/featured.json"
import FeaturedProject from "@/components/index/FeaturedProject.vue"
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