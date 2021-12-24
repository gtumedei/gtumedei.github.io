<script setup lang="ts">
const onMainCallToActionClick = () => window.scrollTo({ top: 780, behavior: "smooth" })
</script>

<template>

  <div class="
    card py-64 lg:px-12 mb-18
    bg-gradient-to-br from-[#FF8A80] to-[#FFD54F]
    flex flex-col justify-center
    text-black-80 text-center
    relative
  ">
    <h1 class="font-serif text-4xl lg:text-6xl font-black tracking-widest">Gianni Tumedei</h1>
    <p class="text-lg tracking-wide mt-4">IT Engineer, Full Stack Developer</p>
    <button class="btn absolute-center-x bottom-12" @click="onMainCallToActionClick">
      <span class="whitespace-nowrap">Check out my work</span>
      <mdi-chevron-double-down/>
    </button>
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
    card bg-gradient-to-br from-[#a18cd1] to-[#fbc2eb]
    h-80 mb-18 text-black-80
    flex flex-col justify-center items-center
  ">
    <h2 class="font-serif text-4xl lg:text-6xl font-black tracking-widest">Knowledge</h2>
  </div>

  <h3 class="heading">Tech stack</h3>

  <h3 class="heading">Other technologies</h3>

  <div class="
    card bg-gradient-to-br from-[#A7FFEB] to-[#64B5F6]
    h-80 mb-18 text-black-80
    flex flex-col justify-center items-center
  ">
    <h2 class="font-serif text-4xl lg:text-6xl font-black tracking-widest">About me</h2>
  </div>

  <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-18">
    <img
      src="profile.jpg" alt="Profile image"
      class="h-64 w-64 rounded-full shadow-xl"
    />
    <div>
      <h3 class="text-3xl mb-4">Hi, I'm Gianni</h3>
      <p class="mb-6">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Reiciendis consectetur id voluptates culpa aspernatur possimus, fugit nostrum illum temporibus facilis
        eum autem atque dolores ipsum, illo saepe odio cumque vel.
      </p>
      <button class="btn inverted">
        <span>Get in touch</span>
        <mdi-message-outline/>
      </button>
    </div>
  </div>

  <div class="text-center">
    <h3 class="heading">Resume</h3>

    <button class="btn inverted">
        <span>See my CV</span>
        <mdi-open-in-new/>
      </button>
  </div>

</template>

<route lang="yaml">
meta:
  layout: default
</route>
