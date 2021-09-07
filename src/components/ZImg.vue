<script lang="ts" setup>

const props = defineProps<{
  src: string
  alt?: string
}>()

const img = ref<HTMLImageElement | undefined>(undefined)

const defaultWrapperStyle = { top: "0", left: "0", height: "0", width: "0" }
const wrapperStyle = ref({ ...defaultWrapperStyle })
const overlay = ref(false)
const zoomedImg = ref(false)
const fullscreen = ref(false)
const scrollTop = ref(0)

const zoomIn = async () => {
  // Position the zoomable img exactly on top of the clicked img
  const rect = img.value?.getBoundingClientRect()
  wrapperStyle.value = {
    top: `${rect?.top}px`,
    left: `${rect?.left}px`,
    height: `${rect?.height}px`,
    width: `${rect?.width}px`
  }
  zoomedImg.value = true
  overlay.value = true
  await nextTick()
  await new Promise(r => setTimeout(r, 100))
  // Transition to full screen
  fullscreen.value = true
  await new Promise(r => setTimeout(r, 400))
  // Block scroll while saving the position to restore it later
  scrollTop.value = document.documentElement.scrollTop
  document.body.classList.add("fixed", "w-full", "overflow-y-scroll")
  document.addEventListener("keyup", onKeyUp)
}

const zoomOut = async () => {
  // Exit full screen, restore scroll and remove overlay and zoomed img
  fullscreen.value = false
  overlay.value = false
  document.body.classList.remove("fixed", "w-full", "overflow-y-scroll")
  document.documentElement.scrollTop = scrollTop.value
  await new Promise(r => setTimeout(r, 400))
  zoomedImg.value = false
  wrapperStyle.value = { ...defaultWrapperStyle }
  document.removeEventListener("keyup", onKeyUp)
}

const onKeyUp = (e: KeyboardEvent) => {
  if (e.key == "Escape") {
    e.preventDefault()
    zoomOut()
  }
}

onBeforeUnmount(() => document.removeEventListener("keyup", onKeyUp))

</script>

<template>
  <img
    ref="img"
    :src="props.src" :alt="props.alt"
    class="cursor-zoom-in"
    v-bind="$attrs"
    @click="zoomIn"
  />
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="overlay"
        ref="overlay"
        class="fixed top-0 right-0 bottom-0 left-0 bg-primary"
      ></div>
    </transition>
    <div
      v-if="zoomedImg"
      class="fixed flex justify-center items-center rounded-xl overflow-hidden transition-all"
      :class="{ '!top-0 !left-0 !w-full !h-full rounded-none': fullscreen }"
      :style="wrapperStyle"
    >
      <img
        :src="props.src" :alt="props.alt"
        class="object-contain cursor-zoom-out transition-all"
        @click="zoomOut"
      />
    </div>
  </teleport>
</template>