<template>

  <div class="
    card py-48 mb-18
    bg-gradient-to-br from-[#FF8A80] to-[#FFD54F]
    flex flex-col justify-center
    text-black-80 text-center
    relative
    lg:text-left lg:px-12
  ">
    <h1 class="text-4xl sm:text-6xl xl:text-8xl mb-6">WORK IN PROGRESS</h1>
    <p>This will be my portfolio website. For now... it's just some experimental stuff.</p>
    <div class="
      flex flex-col -space-y-2 text-lg text-secondary
      absolute bottom-12 right-1/2 transform translate-x-1/2
      lg:right-12 lg:bottom-1/2 lg:translate-x-0 lg:translate-y-1/2
    ">
      <mdi-menu-down-outline/>
      <mdi-menu-down-outline/>
      <mdi-menu-down-outline/>
    </div>
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
