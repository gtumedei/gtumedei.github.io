<script lang="ts" setup>
import { useI18n } from "@/composables"
import Icon from "@/components/ui/icon.vue"

const { t } = useI18n()

const onMainCallToActionClick = () => window.scrollTo({ top: 820, behavior: "smooth" })
</script>

<template>
  <div id="hero" class="container flex-grow flex flex-col items-center text-center px-6 py-48 lg:py-64">
    <p class="text-sm font-bold uppercase tracking-wide mb-4">{{t("hero.subheading")}}</p>
    <h1 class="hero-heading bg-gradient-to-br from-[#FFCA28] to-[#FF8A80] bg-clip-text text-transparent mb-18">Gianni Tumedei</h1>

    <div class="flex flex-col md:flex-row gap-6 mb-12">
      <a
        href="https://msfvkoblamagehrpbmtw.supabase.co/storage/v1/object/public/gtumedei-github-io/CV.pdf"
        target="_blank"
        rel="nofollow"
        class="btn transparent order-2 md:order-1"
      >
        <span>Download my CV</span>
        <icon name="mdi:open-in-new"/>
      </a>
      <button class="btn inverted order-1 md:order-2" @click="onMainCallToActionClick">
        <span class="whitespace-nowrap">{{t("hero.btn")}}</span>
        <icon name="mdi:chevron-double-down"/>
      </button>
    </div>
  </div>
</template>