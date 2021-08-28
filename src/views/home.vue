<script lang="ts" setup>
import { useDarkMode } from "@/hooks"

const { toggleDark } = useDarkMode()
</script>

<template>
  <div class="container text-base px-6">

    <div class="py-12 flex items-center gap-2">
      <a href="#" class="text-lg no-underline inline-block mr-auto">Gianni Tumedei</a>
      <button class="btn icon">
        <mdi-translate class="text-secondary"/>
      </button>
      <button class="btn icon">
        <mdi-theme-light-dark class="text-secondary" @click="() => toggleDark()"/>
      </button>
    </div>

    <div class="
      card py-48 mb-18
      bg-gradient-to-br from-[#FF8A80] to-[#FFD54F]
      flex flex-col justify-center items-center
      text-black-80
    ">
      <h1 class="text-8xl">Hero</h1>
    </div>

    <div class="mb-18">
      <h2 class="heading">Featured Projects</h2>

      <div class="flex flex-col gap-12">

        <div class="flex flex-col lg:flex-row lg:gap-24">
          <div class="w-full lg:w-3/5 py-6 flex flex-col justify-center">
            <h4 class="text-sm text-secondary font-bold uppercase mb-1">Type of Project</h4>
            <h3 class="text-3xl mb-6">Project Name</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid nihil magni porro, veniam labore dolor officia eveniet adipisci quae repudiandae.</p>
          </div>
          <div class="w-full lg:w-2/5">
            <div class="card bg-[#666666] w-full h-72"></div>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row lg:gap-24">
          <div class="w-full lg:w-3/5 py-6 flex flex-col justify-center order-1 lg:order-2">
            <h4 class="text-sm text-secondary font-bold uppercase mb-1">Type of Project</h4>
            <h3 class="text-3xl mb-6">Project Name</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid nihil magni porro, veniam labore dolor officia eveniet adipisci quae repudiandae.</p>
          </div>
          <div class="w-full lg:w-2/5 order-2 lg:order-1">
            <div class="card bg-[#666666] w-full h-72"></div>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row lg:gap-24">
          <div class="w-full lg:w-3/5 py-6 flex flex-col justify-center">
            <h4 class="text-sm text-secondary font-bold uppercase mb-1">Type of Project</h4>
            <h3 class="text-3xl mb-6">Project Name</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid nihil magni porro, veniam labore dolor officia eveniet adipisci quae repudiandae.</p>
          </div>
          <div class="w-full lg:w-2/5">
            <div class="card bg-[#666666] w-full h-72"></div>
          </div>
        </div>

      </div>
    </div>

    <div class="
      card bg-gradient-to-br from-[#A7FFEB] to-[#64B5F6]
      h-92
      flex flex-col justify-center items-center
      text-black-80
    ">
      <h2 class="heading mb-12 !after:bg-black-80">About me</h2>
      <button class="btn">
        <span>Call to Action</span>
        <mdi-open-in-new/>
      </button>
    </div>

    <div class="py-12 flex justify-center gap-8 text-secondary">
      <a href="#" class="btn icon text-2xl"><mdi-email/></a>
      <a href="#" class="btn icon text-2xl"><mdi-linkedin/></a>
      <a href="#" class="btn icon text-2xl"><mdi-github/></a>
      <a href="#" class="btn icon text-2xl"><mdi-map-marker/></a>
    </div>

  </div>
</template>

<style lang="postcss" scoped>

.heading { @apply
  relative text-4xl text-center px-6 mb-18;

  &::after {
    content: "";
    @apply
      absolute -bottom-6 left-1/2 transform -translate-x-1/2
      h-1 w-16 rounded-full bg-typography-base;
  }
}



</style>

<route lang="yaml">
meta:
  layout: empty
</route>
