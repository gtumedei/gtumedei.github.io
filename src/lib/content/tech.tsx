import { JSX } from "solid-js"
import CibElectron from "~icons/cib/electron"
import CibJava from "~icons/cib/java"
import CibJavascript from "~icons/cib/javascript"
import CibPhp from "~icons/cib/php"
import CibScala from "~icons/cib/scala"
import CibTypescript from "~icons/cib/typescript"
import TablerBrandCpp from "~icons/tabler/brand-cpp"
import TablerBrandCss3 from "~icons/tabler/brand-css3"
import TablerBrandDocker from "~icons/tabler/brand-docker"
import TablerBrandFlutter from "~icons/tabler/brand-flutter"
import TablerBrandGolang from "~icons/tabler/brand-golang"
import TablerBrandGraphql from "~icons/tabler/brand-graphql"
import TablerBrandHtml5 from "~icons/tabler/brand-html5"
import TablerBrandKotlin from "~icons/tabler/brand-kotlin"
import TablerBrandMongodb from "~icons/tabler/brand-mongodb"
import TablerBrandPython from "~icons/tabler/brand-python"
import TablerBrandReact from "~icons/tabler/brand-react"
import TablerBrandSolidjs from "~icons/tabler/brand-solidjs"
import TablerBrandSvelte from "~icons/tabler/brand-svelte"
import TablerBrandSwift from "~icons/tabler/brand-swift"
import TablerBrandVue from "~icons/tabler/brand-vue"
import TablerDatabase from "~icons/tabler/database"

export type Technology = {
  name: string
  url: string
  icon: () => JSX.Element
  color: {
    light: string
    dark: string
  }
}

const tech: Technology[] = [
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
    icon: () => <CibTypescript />,
    color: { light: "#0284c7", dark: "#7dd3fc" },
  },
  {
    name: "JavaScript",
    url: "https://www.javascript.com/",
    icon: () => <CibJavascript />,
    color: { light: "#ca8a04", dark: "#fde047" },
  },
  {
    name: "Vue.js",
    url: "https://vuejs.org/",
    icon: () => <TablerBrandVue />,
    color: { light: "#059669", dark: "#6ee7b7" },
  },
  {
    name: "React",
    url: "https://reactjs.org/",
    icon: () => <TablerBrandReact />,
    color: { light: "#0891b2", dark: "#67e8f9" },
  },
  {
    name: "Svelte",
    url: "https://svelte.dev/",
    icon: () => <TablerBrandSvelte />,
    color: { light: "#dc2626", dark: "#fca5a5" },
  },
  {
    name: "Solid.js",
    url: "https://www.solidjs.com/",
    icon: () => <TablerBrandSolidjs />,
    color: { light: "#0284c7", dark: "#7dd3fc" },
  },
  {
    name: "Electron",
    url: "https://www.electronjs.org/",
    icon: () => <CibElectron />,
    color: { light: "#0891b2", dark: "#67e8f9" },
  },
  {
    name: "HTML",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    icon: () => <TablerBrandHtml5 />,
    color: { light: "#ea580c", dark: "#fdba74" },
  },
  {
    name: "CSS",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    icon: () => <TablerBrandCss3 />,
    color: { light: "#2563eb", dark: "#93c5fd" },
  },
  {
    name: "PHP",
    url: "https://www.php.net/",
    icon: () => <CibPhp />,
    color: { light: "#7c3aed", dark: "#c4b5fd" },
  },
  {
    name: "Go",
    url: "https://go.dev/",
    icon: () => <TablerBrandGolang />,
    color: { light: "#0891b2", dark: "#67e8f9" },
  },
  {
    name: "Kotlin",
    url: "https://kotlinlang.org/",
    icon: () => <TablerBrandKotlin />,
    color: { light: "#c026d3", dark: "#f0abfc" },
  },
  {
    name: "Swift",
    url: "https://www.swift.org/",
    icon: () => <TablerBrandSwift />,
    color: { light: "#ea580c", dark: "#fdba74" },
  },
  {
    name: "Dart",
    url: "https://dart.dev/",
    icon: () => (
      <svg viewBox="0 0 24 24" class="h-6 w-6">
        <path
          fill="currentColor"
          d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263L4.784 4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643c-.302-.267-.567-.468-1.07-.462c-.37.014-.87.195-.87.195L6.341 4.105l10.498.001z"
        />
      </svg>
    ),
    color: { light: "#0284c7", dark: "#7dd3fc" },
  },
  {
    name: "Flutter",
    url: "https://flutter.dev/",
    icon: () => <TablerBrandFlutter />,
    color: { light: "#0284c7", dark: "#7dd3fc" },
  },
  {
    name: "C, C++",
    url: "https://www.cplusplus.com/",
    icon: () => <TablerBrandCpp />,
    color: { light: "#4f46e5", dark: "#a5b4fc" },
  },
  {
    name: "Java",
    url: "https://www.java.com/",
    icon: () => <CibJava />,
    color: { light: "#e11d48", dark: "#fda4af" },
  },
  {
    name: "Scala",
    url: "https://www.scala-lang.org/",
    icon: () => <CibScala />,
    color: { light: "#e11d48", dark: "#fda4af" },
  },
  {
    name: "Python",
    url: "https://www.python.org/",
    icon: () => <TablerBrandPython />,
    color: { light: "#ca8a04", dark: "#fde047" },
  },
  {
    name: "Docker",
    url: "https://www.docker.com/",
    icon: () => <TablerBrandDocker />,
    color: { light: "#2563eb", dark: "#93c5fd" },
  },
  {
    name: "GraphQL",
    url: "https://graphql.org/",
    icon: () => <TablerBrandGraphql />,
    color: { light: "#db2777", dark: "#f9a8d4" },
  },
  {
    name: "SQL",
    url: "https://en.wikipedia.org/wiki/SQL",
    icon: () => <TablerDatabase />,
    color: { light: "#ea580c", dark: "#fdba74" },
  },
  {
    name: "MongoDB",
    url: "https://www.mongodb.com/",
    icon: () => <TablerBrandMongodb />,
    color: { light: "#16a34a", dark: "#86efac" },
  },
]

export default tech
