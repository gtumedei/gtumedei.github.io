<script lang="ts" setup>
import Project from "@/models/Project"
import ZImg from "@/components/ZImg.vue"

defineProps<{
  project: Project
  flipLayout?: boolean
}>()
</script>

<template>
  <div class="flex flex-col lg:flex-row lg:gap-24">
    <div class="w-full lg:w-3/5 py-6 flex flex-col justify-center order-1" :class="{ 'lg:order-2': flipLayout }">
      <p class="text-sm text-secondary font-bold uppercase mb-1">Type of Project</p>
      <h3 class="text-2xl mb-4">Project Name</h3>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid nihil magni porro, veniam labore dolor officia eveniet adipisci quae repudiandae.</p>
    </div>
    <div class="w-full lg:w-2/5 order-2" :class="{ 'lg:order-1': flipLayout }">
      <z-img src="/placeholder.png" class="object-cover w-full h-72 card p-0" alt="placeholder image"/>
    </div>
  </div>
</template>