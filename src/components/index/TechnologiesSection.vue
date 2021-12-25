<script lang="ts" setup>
import { onMounted } from "vue"
import gsap from "gsap"
import Icon from "@/components/Icon.vue"

const tech = [
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" },
  { name: "TypeScript", icon: "mdi:application-brackets-outline" }
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
      <div
        v-for="(entry, i) in tech" :key="i"
        class="tech-item flex flex-col gap-2"
      >
        <div class="flex p-8 rounded-xl bg-primary-dark mx-auto">
          <icon :name="entry.icon" class="text-4xl text-inverted-primary"/>
        </div>
        <p class="text-center">{{entry.name}}</p>
      </div>
    </div>
  </div>
</template>