<template>

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
          <h3 class="text-3xl mb-4">Project Name</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid nihil magni porro, veniam labore dolor officia eveniet adipisci quae repudiandae.</p>
        </div>
        <div class="w-full lg:w-2/5">
          <div class="card bg-[#666666] w-full h-72"></div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row lg:gap-24">
        <div class="w-full lg:w-3/5 py-6 flex flex-col justify-center order-1 lg:order-2">
          <h4 class="text-sm text-secondary font-bold uppercase mb-1">Type of Project</h4>
          <h3 class="text-3xl mb-4">Project Name</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid nihil magni porro, veniam labore dolor officia eveniet adipisci quae repudiandae.</p>
        </div>
        <div class="w-full lg:w-2/5 order-2 lg:order-1">
          <div class="card bg-[#666666] w-full h-72"></div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row lg:gap-24">
        <div class="w-full lg:w-3/5 py-6 flex flex-col justify-center">
          <h4 class="text-sm text-secondary font-bold uppercase mb-1">Type of Project</h4>
          <h3 class="text-3xl mb-4">Project Name</h3>
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

</template>

<style lang="postcss" scoped>

</style>

<route lang="yaml">
meta:
  layout: default
</route>
