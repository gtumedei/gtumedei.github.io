<script lang="ts" setup>
import Icon from "@/components/Icon.vue"
</script>

<template>
  <div class="mb-18">
    <h3 class="heading">Current tech stack</h3>
    <div class="flex gap-18 w-full overflow-x-auto snap snap-x">

      <div class="w-full lg:w-[calc(50%-2.25rem)] flex-shrink-0 snap-center flex flex-col items-center">
        <div class="flex p-8 rounded-xl bg-primary-dark mb-4">
          <icon name="mdi:application-brackets-outline" class="text-4xl text-inverted-primary"/>
        </div>
        <h3 class="text-2xl mb-6">Frontend</h3>

        <div class="flex gap-6">
          <div class="flex flex-col gap-2">
            <div class="flex p-6 rounded-xl bg-primary-dark mx-auto">
              <icon name="mdi:application-brackets-outline" class="text-2xl text-inverted-primary"/>
            </div>
            <p class="text-center">TypeScript</p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex p-6 rounded-xl bg-primary-dark mx-auto">
              <icon name="mdi:application-brackets-outline" class="text-2xl text-inverted-primary"/>
            </div>
            <p class="text-center">Vue.js</p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex p-6 rounded-xl bg-primary-dark mx-auto">
              <icon name="mdi:application-brackets-outline" class="text-2xl text-inverted-primary"/>
            </div>
            <p class="text-center">Vite</p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex p-6 rounded-xl bg-primary-dark mx-auto">
              <icon name="mdi:application-brackets-outline" class="text-2xl text-inverted-primary"/>
            </div>
            <p class="text-center">Tailwind</p>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-[calc(50%-2.25rem)] flex-shrink-0 snap-center flex flex-col items-center">
        <div class="flex p-8 rounded-xl bg-primary-dark mb-4">
          <icon name="mdi:server-network" class="text-4xl text-inverted-primary"/>
        </div>
        <h3 class="text-2xl mb-6">Backend</h3>

        <div class="flex gap-6">
          <div class="flex flex-col gap-2">
            <div class="flex p-6 rounded-xl bg-primary-dark mx-auto">
              <icon name="mdi:server-network" class="text-2xl text-inverted-primary"/>
            </div>
            <p class="text-center">TypeScript</p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex p-6 rounded-xl bg-primary-dark mx-auto">
              <icon name="mdi:server-network" class="text-2xl text-inverted-primary"/>
            </div>
            <p class="text-center">Nest.js</p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex p-6 rounded-xl bg-primary-dark mx-auto">
              <icon name="mdi:server-network" class="text-2xl text-inverted-primary"/>
            </div>
            <p class="text-center">Prisma</p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex p-6 rounded-xl bg-primary-dark mx-auto">
              <icon name="mdi:server-network" class="text-2xl text-inverted-primary"/>
            </div>
            <p class="text-center">MySQL</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>