<template>

  <div class="
    card py-48 lg:px-12 mb-18
    bg-gradient-to-br from-[#FF8A80] to-[#FFD54F]
    flex flex-col justify-center
    text-black-80 text-center
    relative
  ">
    <animated-text :content="['WIP', 'IT Engineer', 'Developer', 'Designer']"/>

    <p class="mt-4">This will be my portfolio website. For now... it's just some experimental stuff.</p>
    <button class="btn mx-auto mt-12">
      <span>Call to Action</span>
      <mdi-open-in-new/>
    </button>

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
