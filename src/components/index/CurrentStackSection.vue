<script lang="ts" setup>
import { onMounted, ref } from "vue"
import gsap from "gsap"
import Icon from "@/components/Icon.vue"

const stack = {
  frontend: [
    { name: "TypeScript", icon: "mdi:application-brackets-outline" },
    { name: "Vue.js", icon: "mdi:application-brackets-outline" },
    { name: "Vite", icon: "mdi:application-brackets-outline" },
    { name: "Tailwind CSS", icon: "mdi:application-brackets-outline" }
  ],
  backend: [
    { name: "TypeScript", icon: "mdi:server-network" },
    { name: "Next.js", icon: "mdi:server-network" },
    { name: "Prisma", icon: "mdi:server-network" },
    { name: "MySQL", icon: "mdi:server-network" }
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

      <div class="carousel-item">
        <div class="flex p-8 rounded-xl bg-primary mb-4">
          <icon name="mdi:application-brackets-outline" class="text-4xl text-inverted-primary"/>
        </div>
        <h3 class="text-2xl mb-6">Frontend</h3>

        <div class="flex gap-6">
          <div
            v-for="(entry, i) in stack.frontend" :key="i"
            class="stack-entry"
          >
            <div><icon :name="entry.icon"/></div>
            <p>{{entry.name}}</p>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="flex p-8 rounded-xl bg-primary mb-4">
          <icon name="mdi:server-network" class="text-4xl text-inverted-primary"/>
        </div>
        <h3 class="text-2xl mb-6">Backend</h3>

        <div class="flex gap-6">
          <div
            v-for="(entry, i) in stack.backend" :key="i"
            class="stack-entry"
          >
            <div><icon :name="entry.icon"/></div>
            <p>{{entry.name}}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="postcss" scoped>

.carousel { @apply
  flex gap-18 w-full overflow-x-auto snap snap-x pb-9 mb-9;

  .carousel-item { @apply
    w-full lg:w-[calc(50%-2.25rem)] flex-shrink-0 flex flex-col items-center snap-center
    bg-primary-dark rounded-xl px-6 py-9;
  }

  .stack-entry { @apply
    relative flex flex-col gap-2 mb-8;

    & > div { @apply
      flex p-6 rounded-xl bg-primary mx-auto;

      .mdi { @apply
        text-2xl text-inverted-primary;
      }
    }

    & > p { @apply
      text-center whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 -bottom-8;
    }
  }
}

</style>