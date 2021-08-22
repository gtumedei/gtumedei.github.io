<script lang="ts" setup>
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { useAccentTheme, useDarkMode, useUserStore } from "@/hooks"

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
const go = () => {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { applyTheme } = useAccentTheme()
const { toggleDark } = useDarkMode()

const { t } = useI18n()
</script>

<template>
  <div>

    <p class="text-primary">Primary text</p>
    <p class="text-secondary">Secondary text</p>
    <p class="text-faded">Faded text</p>

    <div class="flex gap-1 my-4">
      <div class="h-4 w-4 border-2 border-gray-300 bg-light-primary"></div>
      <div class="h-4 w-4 border-2 border-gray-300 bg-light-primary-dark"></div>
      <div class="h-4 w-4 border-2 border-gray-300 bg-dark-primary"></div>
      <div class="h-4 w-4 border-2 border-gray-300 bg-dark-primary-dark"></div>
      <div class="h-4 w-4 border-2 border-gray-300 bg-accent-blue-light"></div>
      <div class="h-4 w-4 border-2 border-gray-300 bg-accent-blue-dark"></div>
      <div class="h-4 w-4 border-2 border-gray-300 bg-accent-teal-light"></div>
      <div class="h-4 w-4 border-2 border-gray-300 bg-accent-teal-dark"></div>
      <div class="h-4 w-4 border-2 border-gray-300 bg-accent-orange-light"></div>
      <div class="h-4 w-4 border-2 border-gray-300 bg-accent-orange-dark"></div>
      <div class="h-4 w-4 border-2 border-gray-300 bg-accent-pink-light"></div>
      <div class="h-4 w-4 border-2 border-gray-300 bg-accent-pink-dark"></div>
    </div>

    <div class="flex gap-1 my-4">
      <button class="btn" @click="() => toggleDark(false)">Light</button>
      <button class="btn" @click="() => toggleDark(true)">Dark</button>

      <button class="btn" @click="() => applyTheme('theme-blue')">Blue</button>
      <button class="btn" @click="() => applyTheme('theme-teal')">Teal</button>
      <button class="btn" @click="() => applyTheme('theme-orange')">Orange</button>
      <button class="btn" @click="() => applyTheme('theme-pink')">Pink</button>
    </div>


    <div class="flex gap-1 my-4">
      <div class="h-4 w-4 border-2 border-gray-300 bg-primary"></div>
      <div class="h-4 w-4 border-2 border-gray-300 bg-primary-dark"></div>
      <div class="h-4 w-4 border-2 border-gray-300 bg-accent"></div>
    </div>

    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em class="text-sm opacity-75">{{ t("Opinionated Vite Starter Template") }}</em>
    </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="name"
      :placeholder="t('What\'s your name?')"
      :aria-label="t('What\'s your name?')"
      type="text"
      autocomplete="false"
      @keydown.enter="go"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
    >
    <label class="hidden" for="input">{{ t("What's your name?") }}</label>

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        {{ t("Go") }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
