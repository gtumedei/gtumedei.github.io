<script lang="ts" setup>
defineProps<{ show: boolean }>()
const emit = defineEmits(["update:show"])
</script>

<template>
  <teleport to="body">
    <transition name="backdrop">
      <div v-if="show" class="modal-wrapper fixed inset-0 bg-black-38 z-50 flex" @click="emit('update:show', false)">
        <div class="container flex m-auto p-6">
          <transition name="modal" appear>
            <div class="modal bg-primary p-6 rounded-xl shadow-xl m-auto">
              <slot></slot>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="postcss" scoped>

.backdrop-enter-from, .backdrop-leave-active {
  opacity: 0;
}

.backdrop-enter-active, .backdrop-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.modal-enter-from {
  opacity: 0;
  transform: translateY(5%);
}

.modal-enter-active, .modal-leave-active {
  transform-origin: top right;
  transition: all 0.3s ease-in-out;
}

</style>