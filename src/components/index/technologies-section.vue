<script lang="ts" setup>
import { useI18n } from "@/composables"
import Technology from "@/models/technology"
import Icon from "@/components/icon.vue"
import FlutterIcon from "@/assets/flutter.svg"
import MongodbIcon from "@/assets/mongodb.svg"
import ScalaIcon from "@/assets/scala.svg"
import SolidjsIcon from "@/assets/solidjs.svg"
import SvelteIcon from "@/assets/svelte.svg"

const { t } = useI18n()

const tech: Technology[] = [
  {
    name: "TypeScript",
    icon: "mdi:language-typescript",
    colors: { text: "!hover:text-[#0284C7]", hover: "!hover:bg-[#0284C7]" },
    url: "https://www.typescriptlang.org/"
  },
  {
    name: "JavaScript",
    icon: "mdi:language-javascript",
    colors: { text: "!hover:text-[#EAB308]", hover: "!hover:bg-[#EAB308]" },
    url: "https://www.javascript.com/"
  },
  {
    name: "Vue.js",
    icon: "mdi:vuejs",
    colors: { text: "!hover:text-[#00C985]", hover: "!hover:bg-[#00C985]" },
    url: "https://vuejs.org/"
  },
  {
    name: "React",
    icon: "mdi:react",
    colors: { text: "!hover:text-[#33DBFB]", hover: "!hover:bg-[#33DBFB]" },
    url: "https://reactjs.org/"
  },
  {
    name: "Svelte",
    icon: SvelteIcon,
    colors: { text: "!hover:fill-[#DC2626]", hover: "!hover:bg-[#DC2626]" },
    url: "https://svelte.dev/"
  },
  {
    name: "Solid.js",
    icon: SolidjsIcon,
    colors: { text: "!hover:fill-[#0EA5E9]", hover: "!hover:bg-[#0EA5E9]" },
    url: "https://www.solidjs.com/"
  },
  {
    name: "Electron",
    icon: "mdi:electron-framework",
    colors: { text: "!hover:text-[#67E8F9]", hover: "!hover:bg-[#67E8F9]" },
    url: "https://www.electronjs.org/"
  },
  {
    name: "HTML",
    icon: "mdi:language-html5",
    colors: { text: "!hover:text-[#EA580C]", hover: "!hover:bg-[#EA580C]" },
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
  },
  {
    name: "CSS",
    icon: "mdi:language-css3",
    colors: { text: "!hover:text-[#2563EB]", hover: "!hover:bg-[#2563EB]" },
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
  },
  {
    name: "PHP",
    icon: "mdi:language-php",
    colors: { text: "!hover:text-[#6D28D9]", hover: "!hover:bg-[#6D28D9]" },
    url: "https://www.php.net/"
  },
  {
    name: "Flutter & Dart",
    icon: FlutterIcon,
    colors: { text: "!hover:fill-[#38BDF8]", hover: "!hover:bg-[#38BDF8]" },
    url: "https://flutter.dev/"
  },
  {
    name: "C, C++",
    icon: "mdi:language-c",
    colors: { text: "!hover:text-[#0369A1]", hover: "!hover:bg-[#0369A1]" },
    url: "https://www.cplusplus.com/"
  },
  {
    name: "Java",
    icon: "mdi:language-java",
    colors: { text: "!hover:text-[#E11D48]", hover: "!hover:bg-[#E11D48]" },
    url: "https://www.java.com/"
  },
  {
    name: "Scala",
    icon: ScalaIcon,
    colors: { text: "!hover:fill-[#E11D48]", hover: "!hover:bg-[#E11D48]" },
    url: "https://www.scala-lang.org/"
  },
  {
    name: "Python",
    icon: "mdi:language-python",
    colors: { text: "!hover:text-[#EAB308]", hover: "!hover:bg-[#EAB308]" },
    url: "https://www.python.org/"
  },
  {
    name: "Docker",
    icon: "mdi:docker",
    colors: { text: "!hover:text-[#0EA5E9]", hover: "!hover:bg-[#0EA5E9]" },
    url: "https://www.docker.com/"
  },
  {
    name: "SQL",
    icon: "mdi-database-search",
    colors: { text: "!hover:text-[#FF7043]", hover: "!hover:bg-[#FF7043]" },
    url: "https://en.wikipedia.org/wiki/SQL"
  },
  {
    name: "MongoDB",
    icon: MongodbIcon,
    colors: { text: "!hover:fill-[#22C55E]", hover: "!hover:bg-[#22C55E]" },
    url: "https://www.mongodb.com/"
  }
]
</script>

<template>
  <div class="flex flex-col align-center mb-18">
    <h3 class="heading mb-12">{{t("other_technologies.heading")}}</h3>
    <p class="text-center lg:max-w-2/3 mx-auto mb-12" v-html="t('other_technologies.paragraph')"></p>
    <div class="tech-grid w-full grid grid-tem grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-12">
      <a
        v-for="(entry, i) in tech" :key="i"
        :href="entry.url" target="_blank"
        class="tech-item relative flex flex-col gap-2 mb-7"
      >
        <div class="flex rounded-xl bg-primary mx-auto">
          <icon
            v-if="typeof entry.icon == 'string'"
            :name="entry.icon"
            :class="`
              p-8 rounded-xl text-4xl text-inverted-primary bg-primary-dark
              transition-colors ${entry.colors.text} ${entry.colors.hover} !hover:bg-opacity-10
            `"
          />
          <div v-else :class="`
            flex p-8.5 rounded-xl bg-primary-dark fill-typography-base
            transition-colors ${entry.colors.text} ${entry.colors.hover} !hover:bg-opacity-10
          `">
            <component :is="entry.icon" class="h-8 w-8"/>
          </div>
        </div>
        <p class="text-center whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 -bottom-8">
          {{entry.name}}
        </p>
      </a>
    </div>
  </div>
</template>