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
  color: string
}

const tech: Technology[] = [
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
    icon: () => <CibTypescript />,
    color: "#0284C7",
  },
  {
    name: "JavaScript",
    url: "https://www.javascript.com/",
    icon: () => <CibJavascript />,
    color: "#EAB308",
  },
  {
    name: "Vue.js",
    url: "https://vuejs.org/",
    icon: () => <TablerBrandVue />,
    color: "#00C985",
  },
  {
    name: "React",
    url: "https://reactjs.org/",
    icon: () => <TablerBrandReact />,
    color: "#33DBFB",
  },
  {
    name: "Svelte",
    url: "https://svelte.dev/",
    icon: () => <TablerBrandSvelte />,
    color: "#DC2626",
  },
  {
    name: "Solid.js",
    url: "https://www.solidjs.com/",
    icon: () => <TablerBrandSolidjs />,
    color: "#0EA5E9",
  },
  {
    name: "Electron",
    url: "https://www.electronjs.org/",
    icon: () => <CibElectron />,
    color: "#67E8F9",
  },
  {
    name: "HTML",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    icon: () => <TablerBrandHtml5 />,
    color: "#EA580C",
  },
  {
    name: "CSS",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    icon: () => <TablerBrandCss3 />,
    color: "#2563EB",
  },
  {
    name: "PHP",
    url: "https://www.php.net/",
    icon: () => <CibPhp />,
    color: "#6D28D9",
  },
  {
    name: "Go",
    url: "https://go.dev/",
    icon: () => <TablerBrandGolang />,
    color: "#00E5FF",
  },
  {
    name: "Kotlin",
    url: "https://kotlinlang.org/",
    icon: () => <TablerBrandKotlin />,
    color: "iolet-500",
  },
  {
    name: "Swift",
    url: "https://www.swift.org/",
    icon: () => <TablerBrandSwift />,
    color: "#F05238",
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
    color: "#1976D2",
  },
  {
    name: "Flutter",
    url: "https://flutter.dev/",
    icon: () => <TablerBrandFlutter />,
    color: "#38BDF8",
  },
  {
    name: "C, C++",
    url: "https://www.cplusplus.com/",
    icon: () => <TablerBrandCpp />,
    color: "#0369A1",
  },
  {
    name: "Java",
    url: "https://www.java.com/",
    icon: () => <CibJava />,
    color: "#E11D48",
  },
  {
    name: "Scala",
    url: "https://www.scala-lang.org/",
    icon: () => <CibScala />,
    color: "#E11D48",
  },
  {
    name: "Python",
    url: "https://www.python.org/",
    icon: () => <TablerBrandPython />,
    color: "#EAB308",
  },
  {
    name: "Docker",
    url: "https://www.docker.com/",
    icon: () => <TablerBrandDocker />,
    color: "#0EA5E9",
  },
  {
    name: "GraphQL",
    url: "https://graphql.org/",
    icon: () => <TablerBrandGraphql />,
    color: "#DD36A3",
  },
  {
    name: "SQL",
    url: "https://en.wikipedia.org/wiki/SQL",
    icon: () => <TablerDatabase />,
    color: "#FF7043",
  },
  {
    name: "MongoDB",
    url: "https://www.mongodb.com/",
    icon: () => <TablerBrandMongodb />,
    color: "#22C55E",
  },
]

export default tech
