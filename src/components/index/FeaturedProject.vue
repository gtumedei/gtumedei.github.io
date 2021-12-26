<script lang="ts" setup>
import Project from "@/models/Project"
import ZImg from "@/components/ZImg.vue"

const props = defineProps<{
  project: Project
  flipLayout?: boolean
}>()
</script>

<template>
  <div class="featured-project flex flex-col lg:flex-row lg:gap-24">
    <div class="featured-text w-full lg:w-3/5 py-6 flex flex-col justify-center order-1" :class="{ 'lg:order-2': flipLayout }">
      <p class="text-sm text-secondary font-bold uppercase tracking-wide mb-1">{{project.type}}</p>
      <h3 class="text-2xl mb-4">{{project.name}}</h3>
      <p>{{project.description}}</p>
    </div>
    <div :class="`${props.flipLayout ? 'featured-img-flip lg:order-1' : 'featured-img'} w-full lg:w-2/5 order-2`">
      <div class="aspect-10/16">
        <z-img :src="project.image" class="object-cover w-full h-full card p-0" alt="placeholder image"/>
      </div>
    </div>
  </div>
</template>