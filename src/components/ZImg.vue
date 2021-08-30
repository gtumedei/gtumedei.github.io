<script lang="ts" setup>

const props = defineProps<{
  src: string
  alt?: string
  class?: string
}>()

const img = ref<HTMLImageElement | undefined>(undefined)
const overlay = ref<HTMLDivElement | undefined>(undefined)

const defaultOverlayStyle = { top: "0", left: "0", height: "0", width: "0" }
const overlayStyle = ref({ ...defaultOverlayStyle })
const showOverlay = ref(false)
const fullscreen = ref(false)

const zoomIn = async () => {
  const rect = img.value?.getBoundingClientRect()
  overlayStyle.value.top = `${rect?.top}px`
  overlayStyle.value.left = `${rect?.left}px`
  overlayStyle.value.height = `${rect?.height}px`
  overlayStyle.value.width = `${rect?.width}px`
  showOverlay.value = true
  await nextTick()
  await new Promise(r => setTimeout(r, 100))
  fullscreen.value = true
}

const zoomOut = async () => {
  fullscreen.value = false
  await new Promise(r => setTimeout(r, 550))
  showOverlay.value = false
  overlayStyle.value = { ...defaultOverlayStyle }
}

</script>

<template>
  <img
    ref="img"
    :src="props.src" :alt="props.alt"
    :class="`z-img ${props.class}`"
    @click="zoomIn"
  />
  <teleport to="body">
    <img
      v-if="showOverlay"
      ref="overlay"
      :src="props.src" :alt="props.alt"
      class="overlay" :class="{ fullscreen }" :style="overlayStyle"
      @click="zoomOut"
    />
  </teleport>
</template>

<style lang="postcss" scoped>

.z-img {
  cursor: zoom-in;
}

.overlay { @apply
  fixed object-contain bg-primary opacity-0;
  cursor: zoom-out;
  transition: all 0.5s ease;

  &.fullscreen { @apply
    !top-0 !left-0 !w-full !h-full !opacity-100;
  }
}

</style>