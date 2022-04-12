<script lang="ts" setup>
import Icon from "@/components/icon.vue"

defineProps<{
  label: string
  url: string
  icon: string
  colors: {
    text: string
    hover: string
  }
}>()
</script>

<template>
  <div class="flex">
    <a
      :href="url" target="_blank"
      class="link-item relative flex flex-col gap-2 mx-auto mb-7"
    >
      <div class="flex rounded-full bg-primary-dark mx-auto">
        <icon
          v-if="typeof icon == 'string'"
          :name="icon"
          :class="`
            p-8 rounded-full !text-4xl text-inverted-primary
            transition-colors ${colors.text} ${colors.hover} !hover:bg-opacity-10
          `"
        />
      </div>
      <p class="text-center whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 -bottom-8">
        {{label}}
      </p>
    </a>
  </div>
</template>