<script lang="ts" setup>
import Icon from "@/components/Icon.vue"
import StackItem from "@/components/index/StackItem.vue"
import MysqlIcon from "@/assets/mysql.svg"
import NestjsIcon from "@/assets/nestjs.svg"
import PrismaIcon from "@/assets/prisma.svg"
import ViteIcon from "@/assets/vite.svg"

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
      icon: ViteIcon,
      colors: { text: "!hover:fill-[#C084FC]", hover: "!hover:bg-[#C084FC]" },
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
      icon: NestjsIcon,
      colors: { text: "!hover:fill-[#F43F5E]", hover: "!hover:bg-[#F43F5E]" },
      url: "https://nestjs.com/"
    },
    {
      name: "Prisma",
      icon: PrismaIcon,
      colors: { text: "!hover:fill-[#14B8A6]", hover: "!hover:bg-[#14B8A6]" },
      url: "https://www.prisma.io/"
    },
    {
      name: "MySQL",
      icon: MysqlIcon,
      colors: { text: "!hover:fill-[#0891B2]", hover: "!hover:bg-[#0891B2]" },
      url: "https://www.mysql.com/"
    }
  ]
}
</script>

<template>
  <div>
    <h3 class="heading">Current tech stack</h3>
    <div class="carousel">

      <div class="carousel-item items-start">
        <div class="flex p-8 rounded-xl bg-primary-dark mb-4">
          <icon name="mdi:application-brackets-outline" class="text-4xl text-inverted-primary"/>
        </div>
        <h3 class="text-2xl mb-4">Frontend</h3>
        <icon name="mdi:chevron-double-right" class="lg:hidden text-2xl absolute top-10 right-2"/>

        <div class="bg-primary-dark rounded-xl p-6 w-full flex justify-evenly gap-6 xl:gap-8">
          <stack-item v-for="(item, i) in stack.frontend" :key="i" :item="item"/>
        </div>
      </div>

      <div class="carousel-item items-end">
        <div class="flex p-8 rounded-xl bg-primary-dark mb-4">
          <icon name="mdi:server-network" class="text-4xl text-inverted-primary"/>
        </div>
        <h3 class="text-2xl mb-4">Backend</h3>
        <icon name="mdi:chevron-double-left" class="lg:hidden text-2xl absolute top-10 left-2"/>

        <div class="bg-primary-dark rounded-xl p-6 w-full flex justify-evenly gap-6 lg:gap-8">
          <stack-item v-for="(item, i) in stack.backend" :key="i" :item="item"/>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="postcss" scoped>

.carousel { @apply
  flex gap-18 lg:gap-36 w-full overflow-x-auto snap snap-x pb-9 mb-9;

  .carousel-item { @apply
    w-full lg:w-[calc(50%-4.5rem)] flex-shrink-0 flex flex-col snap-center
    rounded-xl relative;
  }

  .stack-entry { @apply
    relative flex flex-col gap-2 mb-7;

    & > div { @apply
      flex rounded-xl bg-primary mx-auto;

      .icon { @apply
        p-4 md:p-6 rounded-xl transition-colors text-2xl md:text-3xl text-inverted-primary fill-inverted-primary;
      }
    }

    & > p { @apply
      text-center whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 -bottom-8;
    }
  }
}

</style>