<script lang="ts" setup>
import AppSection from "@/components/ui/app-section.vue"
import CurrentStack from "./current-stack.vue"
import Tech from "./tech.vue"
</script>

<template>
  <app-section>
    <div id="knowledge-heading" class="flex flex-col items-center text-center pb-32">
      <p class="text-overline mb-2">Catchy headline</p>
      <h2 class="section-heading text-gradient from-[#FBC2EB] to-[#64B5F6]">Knowledge</h2>
    </div>
    <current-stack/>
    <tech/>
  </app-section>
</template>