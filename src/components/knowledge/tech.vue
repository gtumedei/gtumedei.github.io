<script lang="ts" setup>
import { useI18n } from "@/composables"
import TechItem from "./tech-item.vue"
import FlutterIcon from "@/assets/flutter.svg"
import MongodbIcon from "@/assets/mongodb.svg"
import ScalaIcon from "@/assets/scala.svg"
import SolidjsIcon from "@/assets/solidjs.svg"
import SvelteIcon from "@/assets/svelte.svg"
import { Technology } from "@/types"

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
    name: "GraphQL",
    icon: "mdi-graphql",
    colors: { text: "!hover:text-[#DD36A3]", hover: "!hover:bg-[#DD36A3]" },
    url: "https://graphql.org/"
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
  <div class="flex flex-col align-center">
    <h3 class="section-subheading mb-12">{{t("other_technologies.heading")}}</h3>
    <p class="text-center lg:max-w-2/3 mx-auto mb-12" v-html="t('other_technologies.paragraph')"></p>
    <div class="
      tech-grid w-full grid gap-12
      grid-cols-[repeat(auto-fill,minmax(84px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))]
    ">
      <tech-item
        v-for="(item, i) in tech" :key="i"
        :item="item"
        bg="primary-dark"
      />
    </div>
  </div>
</template>