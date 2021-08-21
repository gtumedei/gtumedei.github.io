<script setup lang="ts">
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { useUserStore } from "@/stores/user"

const props = defineProps<{ name: string }>()
const router = useRouter()
const { t } = useI18n()
const user = useUserStore()

watchEffect(() => {
  user.setNewName(props.name)
})
</script>

<template>
  <div>
    <p class="text-4xl">
      <carbon-pedestrian class="inline-block" />
    </p>
    <p>
      {{ t("Hi, {name}!", { name: props.name }) }}
    </p>

    <p class="text-sm opacity-50">
      <em>{{ t("Demo of dynamic route") }}</em>
    </p>

    <template v-if="user.otherNames.length">
      <p class="text-sm mt-4">
        <span class="opacity-75">{{ t("Also known as") }}:</span>
        <ul>
          <li v-for="name in user.otherNames" :key="name">
            <router-link :to="`/hi/${name}`" replace>
              {{ name }}
            </router-link>
          </li>
        </ul>
      </p>
    </template>

    <div>
      <button
        class="btn m-3 text-sm mt-6"
        @click="router.back()"
      >
        {{ t("Back") }}
      </button>
    </div>
  </div>
</template>
