<script lang="ts" setup>
import Technology from "@/models/Technology"
import Icon from "@/components/Icon.vue"

defineProps<{ item: Technology }>()
</script>

<template>
  <a :href="item.url" target="_blank" class="stack-item">
    <div>
      <icon v-if="typeof item.icon == 'string'" :name="item.icon" :class="`${item.colors.text} ${item.colors.hover}`"/>
      <div v-else :class="`icon flex !p-3.25 !md:p-6 ${item.colors.text} ${item.colors.hover}`">
        <component :is="item.icon" class="w-7.5 h-7.5 transform scale-80 md:scale-100"/>
      </div>
    </div>
    <p>{{item.name}}</p>
  </a>
</template>

<style lang="postcss" scoped>

.stack-item { @apply
  relative flex flex-col gap-2 mb-7;

  & > div { @apply
    flex rounded-xl bg-primary mx-auto;

    .icon { @apply
      p-4 md:p-6 rounded-xl transition-colors text-2xl md:text-3xl
      text-inverted-primary fill-inverted-primary !hover:bg-opacity-10;
    }
  }

  & > p { @apply
    text-center whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 -bottom-8;
  }
}

</style>