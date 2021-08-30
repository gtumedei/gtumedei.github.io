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
    <scroll-indicator/>
  </div>

  <div class="mb-18">
    <h2 class="heading">Featured Projects</h2>

    <div class="flex flex-col gap-12">
      <featured-project/>
      <featured-project flip/>
      <featured-project/>
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

<route lang="yaml">
meta:
  layout: default
</route>
