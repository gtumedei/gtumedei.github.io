<script lang="ts" setup>
import { onMounted } from "vue"
import gsap from "gsap"
import Icon from "@/components/Icon.vue"

const tech = [
  {
    name: "JavaScript",
    icon: "mdi:language-javascript",
    colors: { text: "!hover:text-[#EAB308]", hover: "!hover:bg-[#EAB308]" },
    url: "https://www.javascript.com/"
  },
  {
    name: "React",
    icon: "mdi:react",
    colors: { text: "!hover:text-[#33DBFB]", hover: "!hover:bg-[#33DBFB]" },
    url: "https://reactjs.org/"
  },
  {
    name: "Svelte",
    icon: "mdi:alert-outline",
    colors: { text: "!hover:text-[#FF0000]", hover: "!hover:bg-[#FF0000]" },
    url: "https://svelte.dev/"
  },
  {
    name: "Solid.js",
    icon: "mdi:alert-outline",
    colors: { text: "!hover:text-[#FF0000]", hover: "!hover:bg-[#FF0000]" },
    url: "https://www.solidjs.com/"
  },
  {
    name: "Electron",
    icon: "mdi:electron-framework",
    colors: { text: "!hover:text-[#67E8F9]", hover: "!hover:bg-[#67E8F9]" },
    url: "https://www.electronjs.org/"
  },
  {
    name: "HTML",
    icon: "mdi:language-html5",
    colors: { text: "!hover:text-[#EA580C]", hover: "!hover:bg-[#EA580C]" },
    url: "#"
  },
  {
    name: "CSS",
    icon: "mdi:language-css3",
    colors: { text: "!hover:text-[#2563EB]", hover: "!hover:bg-[#2563EB]" },
    url: "#"
  },
  {
    name: "PHP",
    icon: "mdi:language-php",
    colors: { text: "!hover:text-[#6D28D9]", hover: "!hover:bg-[#6D28D9]" },
    url: "https://www.php.net/"
  },
  {
    name: "Dart",
    icon: "mdi:alert-outline",
    colors: { text: "!hover:text-[#FF0000]", hover: "!hover:bg-[#FF0000]" },
    url: "https://dart.dev/"
  },
  {
    name: "Flutter",
    icon: "mdi:alert-outline",
    colors: { text: "!hover:text-[#FF0000]", hover: "!hover:bg-[#FF0000]" },
    url: "https://flutter.dev/"
  },
  {
    name: "C, C++",
    icon: "mdi:language-c",
    colors: { text: "!hover:text-[#0369A1]", hover: "!hover:bg-[#0369A1]" },
    url: "https://www.cplusplus.com/"
  },
  {
    name: "Java",
    icon: "mdi:language-java",
    colors: { text: "!hover:text-[#E11D48]", hover: "!hover:bg-[#E11D48]" },
    url: "https://www.java.com/"
  },
  {
    name: "Scala",
    icon: "mdi:alert-outline",
    colors: { text: "!hover:text-[#E11D48]", hover: "!hover:bg-[#E11D48]" },
    url: "https://www.scala-lang.org/"
  },
  {
    name: "Python",
    icon: "mdi:language-python",
    colors: { text: "!hover:text-[#EAB308]", hover: "!hover:bg-[#EAB308]" },
    url: "https://www.python.org/"
  },
  {
    name: "Docker",
    icon: "mdi:docker",
    colors: { text: "!hover:text-[#0EA5E9]", hover: "!hover:bg-[#0EA5E9]" },
    url: "https://www.docker.com/"
  },
  {
    name: "MongoDB",
    icon: "mdi:alert-outline",
    colors: { text: "!hover:text-[#22C55E]", hover: "!hover:bg-[#22C55E]" },
    url: "https://www.mongodb.com/"
  }
]

onMounted(() => {
  gsap.from(".tech-item", {
    scrollTrigger: { trigger: ".tech-grid", start: "130px bottom" },
    opacity: 0,
    y: 32,
    duration: 0.5,
    stagger: 0.02
  })
})
</script>

<template>
  <div class="flex flex-col align-center mb-18">
    <h3 class="heading mb-12">Other technologies</h3>
    <p class="text-center lg:max-w-2/3 mx-auto mb-18">
      While I'm quite proficient with the above stack, I know a lot of other languages, technologies
      and platforms and I'm always up to work with those too!<br/>
      Here are some of them.
    </p>
    <div class="tech-grid w-full grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-12">
      <a
        v-for="(entry, i) in tech" :key="i"
        :href="entry.url" target="_blank"
        class="tech-item flex flex-col gap-2"
      >
        <div class="flex rounded-xl bg-primary mx-auto">
          <icon
            :name="entry.icon"
            :class="`
              flex p-8 rounded-xl text-4xl text-inverted-primary bg-primary-dark
              transition-colors ${entry.colors.text} ${entry.colors.hover} !hover:bg-opacity-10
            `"
          />
        </div>
        <p class="text-center">{{entry.name}}</p>
      </a>
    </div>
  </div>
</template>