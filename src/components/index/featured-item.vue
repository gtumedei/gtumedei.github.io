<script lang="ts" setup>
import { useI18n } from "@/composables"
import Featured from "@/models/featured"
import Icon from "@/components/icon.vue"

defineProps<{
  project: Featured
  flipLayout?: boolean
}>()

const { t } = useI18n()
</script>

<template>
  <div class="featured-item flex flex-col lg:flex-row lg:gap-24">
    <div
      class="featured-text w-full lg:w-3/5 py-6 flex flex-col justify-center order-1"
      :class="{ 'lg:order-2': flipLayout }"
    >
      <p class="text-sm text-secondary font-bold uppercase tracking-wide mb-1">{{t(project.type)}}</p>
      <h3 class="text-2xl mb-4">{{t(project.name)}}</h3>
      <p>{{t(project.description)}}</p>
    </div>
    <a
      :href="project.url" target="_blank"
      :class="`${flipLayout ? 'featured-img-flip lg:order-1' : 'featured-img'} w-full lg:w-2/5 order-2`"
    >
      <div class="aspect-10/16">
        <img :src="project.image" class="object-cover w-full h-full card p-0" alt="placeholder image"/>
        <div class="
            img-shade absolute top-0 right-0 bottom-0 left-0
          bg-black bg-opacity-40 flex rounded-xl opacity-0 transition-opacity
        ">
          <icon name="mdi:open-in-new" class="text-2xl text-white-100 m-auto"/>
        </div>
      </div>
    </a>
  </div>
</template>

<style lang="postcss" scoped>

.featured-img, .featured-img-flip {
  &:hover .img-shade  { @apply
    opacity-100;
  }
}

</style>