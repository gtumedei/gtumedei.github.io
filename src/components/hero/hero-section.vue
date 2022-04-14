<script lang="ts" setup>
import { useI18n } from "@/composables"
import Icon from "@/components/ui/icon.vue"

const { t } = useI18n()

const onMainCallToActionClick = () => window.scrollTo({ top: 820, behavior: "smooth" })
</script>

<template>
  <div id="hero" class="container flex-grow flex flex-col items-center text-center px-6 py-48 lg:py-64">
    <p class="text-sm font-bold uppercase tracking-wide mb-4">{{t("hero.subheading")}}</p>
    <h1 class="hero-heading bg-gradient-to-br from-[#FFCA28] to-[#FF8A80] bg-clip-text text-transparent">Gianni Tumedei</h1>
    <icon name="mdi:cards-diamond-outline" class="mt-5 mb-6"/>
    <button class="btn inverted" @click="onMainCallToActionClick">
      <span class="whitespace-nowrap">{{t("hero.btn")}}</span>
      <icon name="mdi:chevron-double-down"/>
    </button>
  </div>
</template>