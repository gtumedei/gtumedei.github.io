<script lang="ts" setup>
import { useI18n } from "@/composables"
import Icon from "@/components/icon.vue"

const { t } = useI18n()

const onMainCallToActionClick = () => window.scrollTo({ top: 820, behavior: "smooth" })
</script>

<template>
  <div id="hero" class="
    card relative py-64 lg:px-12 mb-18
    bg-gradient-to-br from-[#FFD54F] to-[#FF8A80]
    flex flex-col justify-center items-center
    text-black-80 text-center
  ">
    <h1 class="display-heading">Gianni <span class="text-stroke-none text-black-80">Tumedei</span></h1>
    <icon name="mdi:cards-diamond-outline" class="mt-4 mb-5"/>
    <p class="text-sm font-bold uppercase tracking-wide">{{t("hero.subheading")}}<!-- IT Engineer, Full Stack Developer --></p>
    <button class="btn inverted absolute-center-x bottom-12" @click="onMainCallToActionClick">
      <span class="whitespace-nowrap">{{t("hero.btn")}}</span>
      <icon name="mdi:chevron-double-down"/>
    </button>
  </div>
</template>