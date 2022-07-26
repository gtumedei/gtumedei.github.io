<script lang="ts" setup>
import { useI18n } from "@/composables"
import Icon from "@/components/ui/icon.vue"
import TechItem from "./tech-item.vue"
import PlanetscaleIcon from "@/assets/planetscale.svg"
import PrismaIcon from "@/assets/prisma.svg"
import TrpcIcon from "@/assets/trpc.svg"
import ViteIcon from "@/assets/vite.svg"
import { Stack } from "@/types"

const { t } = useI18n()

const stack: { frontend: Stack, backend: Stack } = {
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
      name: "TRPC",
      icon: TrpcIcon,
      colors: { text: "!hover:fill-[#2896BC]", hover: "!hover:bg-[#2896BC]" },
      url: "https://trpc.io/"
    },
    {
      name: "Prisma",
      icon: PrismaIcon,
      colors: { text: "!hover:fill-[#14B8A6]", hover: "!hover:bg-[#14B8A6]" },
      url: "https://www.prisma.io/"
    },
    {
      name: "Planetscale",
      icon: PlanetscaleIcon,
      colors: { text: "!hover:fill-[#8368EE]", hover: "!hover:bg-[#8368EE]" },
      url: "https://planetscale.com/"
    }
  ]
}
</script>

<template>
  <div>
    <h3 class="section-subheading lg:text-center mb-12">{{t("current_stack.heading")}}</h3>
    <!-- <div class="carousel">

      <div class="carousel-item rounded-xl items-center bg-primary-dark">
        <div class="flex p-4 mt-8">
          <icon name="mdi:application-brackets-outline" class="!text-4xl text-inverted-primary"/>
        </div>
        <h4 class="section-subsubheading mb-6">Frontend</h4>

        <div class="w-full">
          <div class="
            p-6 w-full h-full grid gap-6 lg:gap-8
            grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4
          ">
            <tech-item
              v-for="(item, i) in stack.frontend" :key="i"
              :item="item"
              bg="primary"
              class="m-auto"
            />
          </div>
        </div>

        <icon name="mdi:chevron-double-right" class="mb-6 lg:hidden"/>
      </div>

      <div class="carousel-item rounded-xl items-center bg-primary-dark">
        <div class="flex p-4 mt-8">
          <icon name="mdi:server-network" class="!text-4xl text-inverted-primary"/>
        </div>
        <h4 class="section-subsubheading mb-6">Backend</h4>

        <div class="w-full">
          <div class="
            p-6 w-full h-full grid gap-6 lg:gap-8
            grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4
          ">
            <tech-item
              v-for="(item, i) in stack.backend" :key="i"
              :item="item"
              bg="primary"
              class="m-auto"
            />
          </div>
        </div>

        <icon name="mdi:chevron-double-left" class="mb-6 lg:hidden"/>
      </div>

    </div> -->

    <div class="grid lg:grid-cols-2 gap-12 lg:gap-18 mb-18">

      <div class="flex flex-col gap-6 bg-primary-dark rounded-xl p-6">
        <div class="flex items-center gap-6">
          <icon name="mdi:application-brackets-outline" class="!text-4xl bg-primary rounded-xl p-8 md:p-12"/>
          <div class="w-full">
            <p class="text-overline mb-1">Node.js</p>
            <h4 class="section-subsubheading">Frontend</h4>
          </div>
        </div>
        <div class="w-full pl-24 sm:pl-36 grid gap-y-6 grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 2xl:grid-cols-4">
          <tech-item
            v-for="(item, i) in stack.frontend" :key="i"
            :item="item"
            bg="primary"
            class="m-auto"
          />
        </div>
      </div>

      <div class="flex flex-col gap-6 bg-primary-dark rounded-xl p-6">
        <div class="flex items-center gap-6">
          <icon name="mdi:server-network" class="!text-4xl bg-primary rounded-xl p-8 md:p-12"/>
          <div class="w-full">
            <p class="text-overline mb-1">Node.js</p>
            <h4 class="section-subsubheading">Backend</h4>
          </div>
        </div>
        <div class="w-full pl-24 sm:pl-36 grid gap-y-6 grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 2xl:grid-cols-4">
          <tech-item
            v-for="(item, i) in stack.backend" :key="i"
            :item="item"
            bg="primary"
            class="m-auto"
          />
        </div>
      </div>

    </div>

  </div>
</template>

<style lang="postcss" scoped>

/* .carousel { @apply
  flex w-full overflow-x-auto snap snap-x pb-9 mb-9
  gap-18;

  .carousel-item { @apply
    w-full lg:w-[calc(50%-1.5rem)] xl:w-[calc(50%-3rem)] 2xl:w-[calc(50%-4.5rem)]
    flex-shrink-0 flex flex-col snap-center
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
} */

</style>