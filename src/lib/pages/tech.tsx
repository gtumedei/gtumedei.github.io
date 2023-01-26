import { Component, For, JSX } from "solid-js"
import { createTimeline, stagger } from "~/lib/motion"
import CibFlutter from "~icons/cib/flutter"
import CibMongodb from "~icons/cib/mongodb"
import CibScala from "~icons/cib/scala"
import CibSvelte from "~icons/cib/svelte"
import MdiDatabaseSearch from "~icons/mdi/database-search"
import MdiDocker from "~icons/mdi/docker"
import MdiElectronFramework from "~icons/mdi/electron-framework"
import MdiGraphql from "~icons/mdi/graphql"
import MdiLanguageC from "~icons/mdi/language-c"
import MdiLanguageCss3 from "~icons/mdi/language-css3"
import MdiLanguageGo from "~icons/mdi/language-go"
import MdiLanguageHtml5 from "~icons/mdi/language-html5"
import MdiLanguageJava from "~icons/mdi/language-java"
import MdiLanguageJavaScript from "~icons/mdi/language-javascript"
import MdiLanguagePhp from "~icons/mdi/language-php"
import MdiLanguagePython from "~icons/mdi/language-python"
import MdiLanguageTypeScript from "~icons/mdi/language-typescript"
import MdiReact from "~icons/mdi/react"
import MdiVuejs from "~icons/mdi/vuejs"

type Technology = {
  name: string
  icon: () => JSX.Element
  hover: { text: string, bg: string }
  url: string
}

const tech: Technology[] = [
  {
    name: "TypeScript",
    icon: () => <MdiLanguageTypeScript />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#0284C7]", bg: "[&:hover>div>.icon-parent]:bg-[#0284C7]" },
    url: "https://www.typescriptlang.org/"
  },
  {
    name: "JavaScript",
    icon: () => <MdiLanguageJavaScript />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#EAB308]", bg: "[&:hover>div>.icon-parent]:bg-[#EAB308]" },
    url: "https://www.javascript.com/"
  },
  {
    name: "Vue.js",
    icon: () => <MdiVuejs />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#00C985]", bg: "[&:hover>div>.icon-parent]:bg-[#00C985]" },
    url: "https://vuejs.org/"
  },
  {
    name: "React",
    icon: () => <MdiReact />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#33DBFB]", bg: "[&:hover>div>.icon-parent]:bg-[#33DBFB]" },
    url: "https://reactjs.org/"
  },
  {
    name: "Svelte",
    icon: () => <CibSvelte/>,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#DC2626]", bg: "[&:hover>div>.icon-parent]:bg-[#DC2626]" },
    url: "https://svelte.dev/"
  },
  {
    name: "Solid.js",
    icon: () => (
      <svg viewBox="0 0 30 30" version="1.1" width="24" height="24">
        <g transform="matrix(0.17,0,0,0.17,0.805,1.8031938)">
          <path
            style="opacity:1;fill-opacity:1;stroke-width:0.17"
            d="
              M 15.222656 2.4335938 C 14.309238 2.3987305 13.406406 2.4610938 12.535156 2.6523438 L 12.025391
              2.8222656 C 11.005391 3.1622656 10.154531 3.6735156 9.6445312 4.3535156 L 9.3046875 4.8632812
              L 6.7558594 9.2832031 L 6.8183594 9.2949219 C 5.797106 10.530908 5.7266406 12.27204 6.7558594
              13.873047 C 7.1395557 14.371852 7.6269745 14.810204 8.171875 15.193359 L 4.8847656 16.253906
              L 1.484375 22.203125 C 1.484375 22.203125 10.494844 29.002734 17.464844 27.302734 L 17.974609
              27.132812 C 19.103017 26.800928 19.935723 26.18031 20.443359 25.419922 L 20.525391 25.433594
              L 23.925781 19.3125 C 24.605781 18.1225 24.435938 16.762344 23.585938 15.402344 A 7.65 7.65 0 0
              0 21.957031 14.037109 L 25.455078 12.853516 L 28.515625 7.7539062 C 28.515625 7.7539062 21.616582
              2.6776367 15.222656 2.4335938 z
            "
            transform="matrix(5.8823529,0,0,5.8823529,-4.7352941,-10.607022)"
          />
        </g>
      </svg>
    ),
    hover: { text: "[&:hover>div>.icon-parent]:fill-[#0EA5E9]", bg: "[&:hover>div>.icon-parent]:bg-[#0EA5E9]" },
    url: "https://www.solidjs.com/"
  },
  {
    name: "Electron",
    icon: () => <MdiElectronFramework />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#67E8F9]", bg: "[&:hover>div>.icon-parent]:bg-[#67E8F9]" },
    url: "https://www.electronjs.org/"
  },
  {
    name: "HTML",
    icon: () => <MdiLanguageHtml5 />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#EA580C]", bg: "[&:hover>div>.icon-parent]:bg-[#EA580C]" },
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
  },
  {
    name: "CSS",
    icon: () => <MdiLanguageCss3 />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#2563EB]", bg: "[&:hover>div>.icon-parent]:bg-[#2563EB]" },
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
  },
  {
    name: "PHP",
    icon: () => <MdiLanguagePhp />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#6D28D9]", bg: "[&:hover>div>.icon-parent]:bg-[#6D28D9]" },
    url: "https://www.php.net/"
  },
  {
    name: "Go",
    icon: () => <MdiLanguageGo />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#00E5FF]", bg: "[&:hover>div>.icon-parent]:bg-[#00E5FF]" },
    url: "https://go.dev/"
  },
  {
    name: "Dart",
    icon: () => (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="
          M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24
          9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0
          13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204
          23h8.533v-4.263L4.784
          4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643c-.302-.267-.567-.468-1.07-.462c-.37.014-.87.195-.87.195L6.341
          4.105l10.498.001z
        " />
      </svg>
    ),
    hover: { text: "[&:hover>div>.icon-parent]:text-[#1976D2]", bg: "[&:hover>div>.icon-parent]:bg-[#1976D2]" },
    url: "https://dart.dev/"
  },
  {
    name: "Flutter",
    icon: () => <CibFlutter />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#38BDF8]", bg: "[&:hover>div>.icon-parent]:bg-[#38BDF8]" },
    url: "https://flutter.dev/"
  },
  {
    name: "C, C++",
    icon: () => <MdiLanguageC />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#0369A1]", bg: "[&:hover>div>.icon-parent]:bg-[#0369A1]" },
    url: "https://www.cplusplus.com/"
  },
  {
    name: "Java",
    icon: () => <MdiLanguageJava />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#E11D48]", bg: "[&:hover>div>.icon-parent]:bg-[#E11D48]" },
    url: "https://www.java.com/"
  },
  {
    name: "Scala",
    icon: () => <CibScala />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#E11D48]", bg: "[&:hover>div>.icon-parent]:bg-[#E11D48]" },
    url: "https://www.scala-lang.org/"
  },
  {
    name: "Python",
    icon: () => <MdiLanguagePython />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#EAB308]", bg: "[&:hover>div>.icon-parent]:bg-[#EAB308]" },
    url: "https://www.python.org/"
  },
  {
    name: "Docker",
    icon: () => <MdiDocker />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#0EA5E9]", bg: "[&:hover>div>.icon-parent]:bg-[#0EA5E9]" },
    url: "https://www.docker.com/"
  },
  {
    name: "GraphQL",
    icon: () => <MdiGraphql />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#DD36A3]", bg: "[&:hover>div>.icon-parent]:bg-[#DD36A3]" },
    url: "https://graphql.org/"
  },
  {
    name: "SQL",
    icon: () => <MdiDatabaseSearch />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#FF7043]", bg: "[&:hover>div>.icon-parent]:bg-[#FF7043]" },
    url: "https://en.wikipedia.org/wiki/SQL"
  },
  {
    name: "MongoDB",
    icon: () => <CibMongodb />,
    hover: { text: "[&:hover>div>.icon-parent]:text-[#22C55E]", bg: "[&:hover>div>.icon-parent]:bg-[#22C55E]" },
    url: "https://www.mongodb.com/"
  }
]

const TechItem: Component<{
  item: Technology
  bg: "primary" | "primary-focus"
  class?: string
}> = (props) => {
  return (
    <div class={props.class ?? ""}>
      <a href={props.item.url} target="_blank" class={`relative flex flex-col gap-2 ${props.item.hover.text} ${props.item.hover.bg}`}>
        <div class="flex bg-primary mx-auto mb-7">
          <div class={`
            icon-parent flex p-6 rounded-lg !text-xl text-neutral fill-neutral
            ${props.bg == "primary" ? "bg-primary" : "bg-primary-focus"} !bg-opacity-10 transition-colors
          `}>{props.item.icon()}</div>
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
    [".motion-2", { opacity: 1, y: [-10, 0] }, { duration: 0.4, delay: stagger(0.05), at: "<" }]
  ])

  return (
    <>
      <h1 class="motion-1 section-heading mt-9 mb-2">Tech I Use</h1>
      <p class="motion-1 mb-12">
        There it is. In no particular order, some tech I like to work and tinker with,
        from programming and templating languages, to frameworks, to databases.
      </p>
      <div class="
        w-full grid gap-12
        grid-cols-[repeat(auto-fill,minmax(84px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))]
      ">
        <For each={tech}>{item =>
          <TechItem item={item} bg="primary-focus" class="motion-2" />
        }</For>
      </div>
    </>
  )
}

export default TechPage
