<script lang="ts" setup>
import Icon from "@/components/icon.vue"
import Technology from "@/models/technology"

defineProps<{ item: Technology, bg: "primary" | "primary-dark" }>()
</script>

<template>
  <div>
    <a
      :href="item.url" target="_blank"
      class="tech-item relative flex flex-col gap-2 mb-7"
    >
      <div class="flex rounded-xl bg-primary mx-auto">
        <icon
          v-if="typeof item.icon == 'string'"
          :name="item.icon"
          :class="`
            p-8 rounded-xl text-4xl text-inverted-primary ${bg == 'primary' ? 'bg-primary' : 'bg-primary-dark'}
            transition-colors ${item.colors.text} ${item.colors.hover} !hover:bg-opacity-10
          `"
        />
        <div v-else :class="`
          flex p-8.5 rounded-xl ${bg == 'primary' ? 'bg-primary' : 'bg-primary-dark'} fill-typography-base
          transition-colors ${item.colors.text} ${item.colors.hover} !hover:bg-opacity-10
        `">
          <component :is="item.icon" class="h-8 w-8"/>
        </div>
      </div>
      <p class="text-center whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 -bottom-8">
        {{item.name}}
      </p>
    </a>
  </div>
</template>