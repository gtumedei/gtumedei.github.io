<script lang="ts" setup>
import { onMounted, ref } from "vue"
import gsap from "gsap"
import Icon from "@/components/Icon.vue"

const stack = {
  frontend: [
    {
      name: "TypeScript",
      icon: "mdi:language-typescript",
      colors: { text: "!hover:text-[#0284C7]", hover: "!hover:bg-[#0284C7]" },
      url: "https://www.typescriptlang.org/"
    },
    {
      name: "Vue.js",
      icon: "mdi:vuejs",
      colors: { text: "!hover:text-[#00C985]", hover: "!hover:bg-[#00C985]" },
      url: "https://vuejs.org/"
    },
    {
      name: "Vite",
      icon: "mdi:alert-outline",
      colors: { text: "!hover:text-[#FF0000]", hover: "!hover:bg-[#FF0000]" },
      url: "https://vitejs.dev/"
    },
    {
      name: "Tailwind CSS",
      icon: "mdi:tailwind",
      colors: { text: "!hover:text-[#22D3EE]", hover: "!hover:bg-[#22D3EE]" },
      url: "https://tailwindcss.com/"
    }
  ],
  backend: [
    {
      name: "TypeScript",
      icon: "mdi:language-typescript",
      colors: { text: "!hover:text-[#0284C7]", hover: "!hover:bg-[#0284C7]" },
      url: "https://www.typescriptlang.org/"
    },
    {
      name: "Nest.js",
      icon: "mdi:alert-outline",
      colors: { text: "!hover:text-[#FF0000]", hover: "!hover:bg-[#FF0000]" },
      url: "https://nestjs.com/"
    },
    {
      name: "Prisma",
      icon: "mdi:alert-outline",
      colors: { text: "!hover:text-[#FF0000]", hover: "!hover:bg-[#FF0000]" },
      url: "https://www.prisma.io/"
    },
    {
      name: "MySQL",
      icon: "mdi:alert-outline",
      colors: { text: "!hover:text-[#FF0000]", hover: "!hover:bg-[#FF0000]" },
      url: "https://www.mysql.com/"
    }
  ]
}

// Animation stuff

const carouselDiv = ref<HTMLDivElement>()

onMounted(() => gsap.from(carouselDiv.value!, {
  scrollTrigger: { trigger: carouselDiv.value!, start: "80% bottom" },
  opacity: 0,
  y: 32,
  duration: 0.5
}))
</script>

<template>
  <div>
    <h3 class="heading">Current tech stack</h3>
    <div ref="carouselDiv" class="carousel">

      <div class="carousel-item items-start">
        <div class="flex p-8 rounded-xl bg-primary mb-4">
          <icon name="mdi:application-brackets-outline" class="text-4xl text-inverted-primary"/>
        </div>
        <h3 class="text-2xl mb-8">Frontend</h3>
        <icon name="mdi:chevron-double-right" class="lg:hidden text-2xl absolute top-8 right-8"/>

        <div class="w-full flex justify-around gap-6 xl:gap-8">
          <a
            v-for="(entry, i) in stack.frontend" :key="i"
            :href="entry.url" target="_blank"
            class="stack-entry"
          >
            <div>
              <icon
                :name="entry.icon"
                :class="`${entry.colors.text} ${entry.colors.hover} !hover:bg-opacity-10`"
              />
            </div>
            <p>{{entry.name}}</p>
          </a>
        </div>
      </div>

      <div class="carousel-item items-end">
        <div class="flex p-8 rounded-xl bg-primary mb-4">
          <icon name="mdi:server-network" class="text-4xl text-inverted-primary"/>
        </div>
        <h3 class="text-2xl mb-8">Backend</h3>
        <icon name="mdi:chevron-double-left" class="lg:hidden text-2xl absolute top-8 left-8"/>

        <div class="w-full flex justify-around gap-6 lg:gap-8">
          <a
            v-for="(entry, i) in stack.backend" :key="i"
            :href="entry.url" target="_blank"
            class="stack-entry"
          >
            <div>
              <icon
                :name="entry.icon"
                :class="`${entry.colors.text} ${entry.colors.hover} !hover:bg-opacity-10`"
              />
            </div>
            <p>{{entry.name}}</p>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="postcss" scoped>

.carousel { @apply
  flex gap-18 w-full overflow-x-auto snap snap-x pb-9 mb-9;

  .carousel-item { @apply
    w-full lg:w-[calc(50%-2.25rem)] flex-shrink-0 flex flex-col snap-center
    bg-primary-dark rounded-xl p-8 relative;
  }

  .stack-entry { @apply
    relative flex flex-col gap-2 mb-8;

    & > div { @apply
      flex rounded-xl bg-primary mx-auto;

      .icon { @apply
        flex p-4 md:p-6 rounded-xl transition-colors text-2xl md:text-3xl text-inverted-primary;
      }
    }

    & > p { @apply
      text-center whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 -bottom-8;
    }
  }
}

</style>