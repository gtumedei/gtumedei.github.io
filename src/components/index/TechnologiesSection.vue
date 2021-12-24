<script lang="ts" setup>
import Icon from "@/components/Icon.vue"
</script>

<template>
  <div class="flex flex-col align-center mb-18">
    <h3 class="heading mb-12">Other technologies</h3>
    <p class="text-center lg:max-w-2/3 mx-auto mb-18">
      While I'm quite proficient with the above stack, I know a lot of other languages, technologies
      and platforms and I'm always up to work with those too!<br/>
      Here are some of them.
    </p>
    <div class="flex gap-6">
      <div class="flex flex-col gap-2">
        <div class="flex p-8 rounded-xl bg-primary-dark mx-auto">
          <icon name="mdi:application-brackets-outline" class="text-4xl text-inverted-primary"/>
        </div>
        <p class="text-center">TypeScript</p>
      </div>
    </div>
  </div>
</template>