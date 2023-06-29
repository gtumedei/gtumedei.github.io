import { Component, For, JSX } from "solid-js"
import { createTimeline, stagger } from "~/lib/motion"
import CibElectron from "~icons/cib/electron"
import CibJava from "~icons/cib/java"
import CibJavascript from "~icons/cib/javascript"
import CibScala from "~icons/cib/scala"
import CibTypescript from "~icons/cib/typescript"
import TablerBrandCpp from "~icons/tabler/brand-cpp"
import TablerBrandCss3 from "~icons/tabler/brand-css3"
import TablerBrandDocker from "~icons/tabler/brand-docker"
import TablerBrandFlutter from "~icons/tabler/brand-flutter"
import TablerBrandGolang from "~icons/tabler/brand-golang"
import TablerBrandGraphql from "~icons/tabler/brand-graphql"
import TablerBrandHtml5 from "~icons/tabler/brand-html5"
import TablerBrandMongodb from "~icons/tabler/brand-mongodb"
import TablerBrandPhp from "~icons/tabler/brand-php"
import TablerBrandPython from "~icons/tabler/brand-python"
import TablerBrandReact from "~icons/tabler/brand-react"
import TablerBrandSolidjs from "~icons/tabler/brand-solidjs"
import TablerBrandSvelte from "~icons/tabler/brand-svelte"
import TablerBrandVue from "~icons/tabler/brand-vue"
import TablerDatabase from "~icons/tabler/database"

type Technology = {
  name: string
  icon: () => JSX.Element
  hover: { text: string; bg: string }
  url: string
}

const tech: Technology[] = [
  {
    name: "TypeScript",
    icon: () => <CibTypescript />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#0284C7]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#0284C7]",
    },
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "JavaScript",
    icon: () => <CibJavascript />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#EAB308]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#EAB308]",
    },
    url: "https://www.javascript.com/",
  },
  {
    name: "Vue.js",
    icon: () => <TablerBrandVue />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#00C985]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#00C985]",
    },
    url: "https://vuejs.org/",
  },
  {
    name: "React",
    icon: () => <TablerBrandReact />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#33DBFB]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#33DBFB]",
    },
    url: "https://reactjs.org/",
  },
  {
    name: "Svelte",
    icon: () => <TablerBrandSvelte />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#DC2626]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#DC2626]",
    },
    url: "https://svelte.dev/",
  },
  {
    name: "Solid.js",
    icon: () => <TablerBrandSolidjs />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:fill-[#0EA5E9]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#0EA5E9]",
    },
    url: "https://www.solidjs.com/",
  },
  {
    name: "Electron",
    icon: () => <CibElectron />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#67E8F9]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#67E8F9]",
    },
    url: "https://www.electronjs.org/",
  },
  {
    name: "HTML",
    icon: () => <TablerBrandHtml5 />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#EA580C]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#EA580C]",
    },
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS",
    icon: () => <TablerBrandCss3 />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#2563EB]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#2563EB]",
    },
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "PHP",
    icon: () => <TablerBrandPhp />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#6D28D9]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#6D28D9]",
    },
    url: "https://www.php.net/",
  },
  {
    name: "Go",
    icon: () => <TablerBrandGolang />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#00E5FF]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#00E5FF]",
    },
    url: "https://go.dev/",
  },
  {
    name: "Dart",
    icon: () => (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path
          fill="currentColor"
          d="
          M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24
          9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0
          13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204
          23h8.533v-4.263L4.784
          4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643c-.302-.267-.567-.468-1.07-.462c-.37.014-.87.195-.87.195L6.341
          4.105l10.498.001z
        "
        />
      </svg>
    ),
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#1976D2]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#1976D2]",
    },
    url: "https://dart.dev/",
  },
  {
    name: "Flutter",
    icon: () => <TablerBrandFlutter />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#38BDF8]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#38BDF8]",
    },
    url: "https://flutter.dev/",
  },
  {
    name: "C, C++",
    icon: () => <TablerBrandCpp />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#0369A1]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#0369A1]",
    },
    url: "https://www.cplusplus.com/",
  },
  {
    name: "Java",
    icon: () => <CibJava />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#E11D48]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#E11D48]",
    },
    url: "https://www.java.com/",
  },
  {
    name: "Scala",
    icon: () => <CibScala />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#E11D48]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#E11D48]",
    },
    url: "https://www.scala-lang.org/",
  },
  {
    name: "Python",
    icon: () => <TablerBrandPython />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#EAB308]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#EAB308]",
    },
    url: "https://www.python.org/",
  },
  {
    name: "Docker",
    icon: () => <TablerBrandDocker />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#0EA5E9]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#0EA5E9]",
    },
    url: "https://www.docker.com/",
  },
  {
    name: "GraphQL",
    icon: () => <TablerBrandGraphql />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#DD36A3]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#DD36A3]",
    },
    url: "https://graphql.org/",
  },
  {
    name: "SQL",
    icon: () => <TablerDatabase />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#FF7043]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#FF7043]",
    },
    url: "https://en.wikipedia.org/wiki/SQL",
  },
  {
    name: "MongoDB",
    icon: () => <TablerBrandMongodb />,
    hover: {
      text: "[&:where(:hover,:focus)>div>.icon-parent]:text-[#22C55E]",
      bg: "[&:where(:hover,:focus)>div>.icon-parent]:bg-[#22C55E]",
    },
    url: "https://www.mongodb.com/",
  },
]

const TechItem: Component<{
  item: Technology
  bg: "primary" | "primary-focus"
  class?: string
}> = (props) => {
  return (
    <div class={props.class ?? ""}>
      <a
        href={props.item.url}
        target="_blank"
        class={`relative flex flex-col gap-2 outline-none ${props.item.hover.text} ${props.item.hover.bg}`}
      >
        <div class="flex bg-primary mx-auto mb-7">
          <div
            class={`
            icon-parent flex p-6 rounded-lg !text-xl text-neutral fill-neutral
            ${
              props.bg == "primary" ? "bg-primary" : "bg-primary-focus"
            } !bg-opacity-10 transition-colors
          `}
          >
            {props.item.icon()}
          </div>
        </div>
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
        <For each={tech}>
          {(item) => <TechItem item={item} bg="primary-focus" class="motion-2" />}
        </For>
      </div>
    </>
  )
}

export default TechPage
