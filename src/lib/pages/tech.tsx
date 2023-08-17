import { Component, For, JSX } from "solid-js"
import { createTimeline, stagger } from "~/lib/motion"
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

type Technology = {
  name: string
  url: string
  icon: () => JSX.Element
}

const iconParentClass =
  "flex p-6 rounded-lg !text-xl text-content fill-content bg-base-focus transition-colors "

const tech: Technology[] = [
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#0284C7] group-focus:bg-[#0284C7] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <CibTypescript class="group-hover:text-[#0284C7] group-focus:text-[#0284C7] transition-colors" />
      </div>
    ),
  },
  {
    name: "JavaScript",
    url: "https://www.javascript.com/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#EAB308] group-focus:bg-[#EAB308] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <CibJavascript class="group-hover:text-[#EAB308] group-focus:text-[#EAB308] transition-colors" />
      </div>
    ),
  },
  {
    name: "Vue.js",
    url: "https://vuejs.org/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#00C985] group-focus:bg-[#00C985] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandVue class="group-hover:text-[#00C985] group-focus:text-[#00C985] transition-colors" />
      </div>
    ),
  },
  {
    name: "React",
    url: "https://reactjs.org/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#33DBFB] group-focus:bg-[#33DBFB] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandReact class="group-hover:text-[#33DBFB] group-focus:text-[#33DBFB] transition-colors" />
      </div>
    ),
  },
  {
    name: "Svelte",
    url: "https://svelte.dev/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#DC2626] group-focus:bg-[#DC2626] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandSvelte class="group-hover:text-[#DC2626] group-focus:text-[#DC2626] transition-colors" />
      </div>
    ),
  },
  {
    name: "Solid.js",
    url: "https://www.solidjs.com/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#0EA5E9] group-focus:bg-[#0EA5E9] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandSolidjs class="group-hover:text-[#0EA5E9] group-focus:text-[#0EA5E9] transition-colors" />
      </div>
    ),
  },
  {
    name: "Electron",
    url: "https://www.electronjs.org/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#67E8F9] group-focus:bg-[#67E8F9] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <CibElectron class="group-hover:text-[#67E8F9] group-focus:text-[#67E8F9] transition-colors" />
      </div>
    ),
  },
  {
    name: "HTML",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#EA580C] group-focus:bg-[#EA580C] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandHtml5 class="group-hover:text-[#EA580C] group-focus:text-[#EA580C] transition-colors" />
      </div>
    ),
  },
  {
    name: "CSS",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#2563EB] group-focus:bg-[#2563EB] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandCss3 class="group-hover:text-[#2563EB] group-focus:text-[#2563EB] transition-colors" />
      </div>
    ),
  },
  {
    name: "PHP",
    url: "https://www.php.net/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#6D28D9] group-focus:bg-[#6D28D9] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <CibPhp class="group-hover:text-[#6D28D9] group-focus:text-[#6D28D9] transition-colors" />
      </div>
    ),
  },
  {
    name: "Go",
    url: "https://go.dev/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#00E5FF] group-focus:bg-[#00E5FF] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandGolang class="group-hover:text-[#00E5FF] group-focus:text-[#00E5FF] transition-colors" />
      </div>
    ),
  },
  {
    name: "Kotlin",
    url: "https://kotlinlang.org/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-violet-500 group-focus:bg-violet-500 group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandKotlin class="group-hover:text-violet-500 group-focus:text-[#8B5CF6] transition-colors" />
      </div>
    ),
  },
  {
    name: "Swift",
    url: "https://www.swift.org/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#F05238] group-focus:bg-[#F05238] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandSwift class="group-hover:text-[#F05238] group-focus:text-[#F05238] transition-colors" />
      </div>
    ),
  },
  {
    name: "Dart",
    url: "https://dart.dev/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#1976D2] group-focus:bg-[#1976D2] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <svg
          viewBox="0 0 24 24"
          class="h-6 w-6 group-hover:text-[#1976D2] group-focus:text-[#1976D2] transition-colors"
        >
          <path
            fill="currentColor"
            d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263L4.784 4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643c-.302-.267-.567-.468-1.07-.462c-.37.014-.87.195-.87.195L6.341 4.105l10.498.001z"
          />
        </svg>
      </div>
    ),
  },
  {
    name: "Flutter",
    url: "https://flutter.dev/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#38BDF8] group-focus:bg-[#38BDF8] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandFlutter class="group-hover:text-[#38BDF8] group-focus:text-[#38BDF8] transition-colors" />
      </div>
    ),
  },
  {
    name: "C, C++",
    url: "https://www.cplusplus.com/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#0369A1] group-focus:bg-[#0369A1] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandCpp class="group-hover:text-[#0369A1] group-focus:text-[#0369A1] transition-colors" />
      </div>
    ),
  },
  {
    name: "Java",
    url: "https://www.java.com/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#E11D48] group-focus:bg-[#E11D48] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <CibJava class="group-hover:text-[#E11D48] group-focus:text-[#E11D48] transition-colors" />
      </div>
    ),
  },
  {
    name: "Scala",
    url: "https://www.scala-lang.org/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#E11D48] group-focus:bg-[#E11D48] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <CibScala class="group-hover:text-[#E11D48] group-focus:text-[#E11D48] transition-colors" />
      </div>
    ),
  },
  {
    name: "Python",
    url: "https://www.python.org/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#EAB308] group-focus:bg-[#EAB308] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandPython class="group-hover:text-[#EAB308] group-focus:text-[#EAB308] transition-colors" />
      </div>
    ),
  },
  {
    name: "Docker",
    url: "https://www.docker.com/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#0EA5E9] group-focus:bg-[#0EA5E9] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandDocker class="group-hover:text-[#0EA5E9] group-focus:text-[#0EA5E9] transition-colors" />
      </div>
    ),
  },
  {
    name: "GraphQL",
    url: "https://graphql.org/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#DD36A3] group-focus:bg-[#DD36A3] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandGraphql class="group-hover:text-[#DD36A3] group-focus:text-[#DD36A3] transition-colors" />
      </div>
    ),
  },
  {
    name: "SQL",
    url: "https://en.wikipedia.org/wiki/SQL",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#FF7043] group-focus:bg-[#FF7043] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerDatabase class="group-hover:text-[#FF7043] group-focus:text-[#FF7043] transition-colors" />
      </div>
    ),
  },
  {
    name: "MongoDB",
    url: "https://www.mongodb.com/",
    icon: () => (
      <div
        class={
          iconParentClass +
          "group-hover:bg-[#22C55E] group-focus:bg-[#22C55E] group-hover:bg-opacity-10 group-focus:bg-opacity-10"
        }
      >
        <TablerBrandMongodb class="group-hover:text-[#22C55E] group-focus:text-[#22C55E] transition-colors" />
      </div>
    ),
  },
]

const TechItem: Component<{
  item: Technology
  class?: string
}> = (props) => {
  return (
    <div class={props.class ?? ""}>
      <a
        href={props.item.url}
        target="_blank"
        class="relative flex flex-col gap-2 outline-none group"
      >
        <div class="flex bg-base mx-auto mb-7">{props.item.icon()}</div>
        <p class="text-sm text-center whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 bottom-0">
          {props.item.name}
        </p>
      </a>
    </div>
  )
}

const TechPage = () => {
  createTimeline([
    [".motion-1", { opacity: 1, x: [-10, 0] }, { duration: 0.4, delay: stagger(0.15) }],
    [".motion-2", { opacity: 1, y: [-10, 0] }, { duration: 0.4, delay: stagger(0.05), at: "<" }],
  ])

  return (
    <>
      <h1 class="motion-1 section-heading mt-9 mb-2">Tech I Use</h1>
      <p class="motion-1 mb-12">
        There it is. In no particular order, some tech I like to work and tinker with, from
        programming and templating languages, to frameworks, to databases.
      </p>
      <div
        class="
        w-full grid gap-12
        grid-cols-[repeat(auto-fill,minmax(84px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))]
      "
      >
        <For each={tech}>{(item) => <TechItem item={item} class="motion-2" />}</For>
      </div>
    </>
  )
}

export default TechPage
