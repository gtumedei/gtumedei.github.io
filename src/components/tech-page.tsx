import { Component, For, JSX } from "solid-js"
import CibFlutter from "~icons/cib/flutter"
import CibMongodb from "~icons/cib/mongodb"
import CibScala from "~icons/cib/scala"
import CibSvelte from "~icons/cib/svelte"
import MdiArrowLeftThin from "~icons/mdi/arrow-left-thin"
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
  icon: JSX.Element
  colors: { text: string, hover: string }
  url: string
}

const tech: Technology[] = [
  {
    name: "TypeScript",
    icon: <MdiLanguageTypeScript />,
    colors: { text: "!hover:text-[#0284C7]", hover: "!hover:bg-[#0284C7]" },
    url: "https://www.typescriptlang.org/"
  },
  {
    name: "JavaScript",
    icon: <MdiLanguageJavaScript />,
    colors: { text: "!hover:text-[#EAB308]", hover: "!hover:bg-[#EAB308]" },
    url: "https://www.javascript.com/"
  },
  {
    name: "Vue.js",
    icon: <MdiVuejs />,
    colors: { text: "!hover:text-[#00C985]", hover: "!hover:bg-[#00C985]" },
    url: "https://vuejs.org/"
  },
  {
    name: "React",
    icon: <MdiReact />,
    colors: { text: "!hover:text-[#33DBFB]", hover: "!hover:bg-[#33DBFB]" },
    url: "https://reactjs.org/"
  },
  {
    name: "Svelte",
    icon: <CibSvelte/>,
    colors: { text: "!hover:text-[#DC2626]", hover: "!hover:bg-[#DC2626]" },
    url: "https://svelte.dev/"
  },
  /* {
    name: "Solid.js",
    icon: SolidjsIcon,
    colors: { text: "!hover:text-[#0EA5E9]", hover: "!hover:bg-[#0EA5E9]" },
    url: "https://www.solidjs.com/"
  }, */
  {
    name: "Electron",
    icon: <MdiElectronFramework />,
    colors: { text: "!hover:text-[#67E8F9]", hover: "!hover:bg-[#67E8F9]" },
    url: "https://www.electronjs.org/"
  },
  {
    name: "HTML",
    icon: <MdiLanguageHtml5 />,
    colors: { text: "!hover:text-[#EA580C]", hover: "!hover:bg-[#EA580C]" },
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
  },
  {
    name: "CSS",
    icon: <MdiLanguageCss3 />,
    colors: { text: "!hover:text-[#2563EB]", hover: "!hover:bg-[#2563EB]" },
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
  },
  {
    name: "PHP",
    icon: <MdiLanguagePhp />,
    colors: { text: "!hover:text-[#6D28D9]", hover: "!hover:bg-[#6D28D9]" },
    url: "https://www.php.net/"
  },
  {
    name: "Go",
    icon: <MdiLanguageGo />,
    colors: { text: "!hover:text-[#00E5FF]", hover: "!hover:bg-[#00E5FF]" },
    url: "https://go.dev/"
  },
  {
    name: "Flutter & Dart",
    icon: <CibFlutter />,
    colors: { text: "!hover:text-[#38BDF8]", hover: "!hover:bg-[#38BDF8]" },
    url: "https://flutter.dev/"
  },
  {
    name: "C, C++",
    icon: <MdiLanguageC />,
    colors: { text: "!hover:text-[#0369A1]", hover: "!hover:bg-[#0369A1]" },
    url: "https://www.cplusplus.com/"
  },
  {
    name: "Java",
    icon: <MdiLanguageJava />,
    colors: { text: "!hover:text-[#E11D48]", hover: "!hover:bg-[#E11D48]" },
    url: "https://www.java.com/"
  },
  {
    name: "Scala",
    icon: <CibScala />,
    colors: { text: "!hover:text-[#E11D48]", hover: "!hover:bg-[#E11D48]" },
    url: "https://www.scala-lang.org/"
  },
  {
    name: "Python",
    icon: <MdiLanguagePython />,
    colors: { text: "!hover:text-[#EAB308]", hover: "!hover:bg-[#EAB308]" },
    url: "https://www.python.org/"
  },
  {
    name: "Docker",
    icon: <MdiDocker />,
    colors: { text: "!hover:text-[#0EA5E9]", hover: "!hover:bg-[#0EA5E9]" },
    url: "https://www.docker.com/"
  },
  {
    name: "GraphQL",
    icon: <MdiGraphql />,
    colors: { text: "!hover:text-[#DD36A3]", hover: "!hover:bg-[#DD36A3]" },
    url: "https://graphql.org/"
  },
  {
    name: "SQL",
    icon: <MdiDatabaseSearch />,
    colors: { text: "!hover:text-[#FF7043]", hover: "!hover:bg-[#FF7043]" },
    url: "https://en.wikipedia.org/wiki/SQL"
  },
  {
    name: "MongoDB",
    icon: <CibMongodb />,
    colors: { text: "!hover:text-[#22C55E]", hover: "!hover:bg-[#22C55E]" },
    url: "https://www.mongodb.com/"
  }
]

const TechItem: Component<{
  item: Technology,
  bg: "primary" | "primary-dark"
}> = (props) => {
  return (
    <div>
      <a href={props.item.url} target="_blank" class="tech-item relative flex flex-col gap-2 mb-7">
        <div class="flex rounded-xl bg-primary mx-auto">
          <div class={`
            flex p-6 rounded-xl !text-xl text-accent ${props.bg == "primary" ? "bg-primary" : "bg-primary-dark"}
            transition-colors ${props.item.colors.text} ${props.item.colors.hover} !hover:bg-opacity-10
          `}>{props.item.icon}</div>
        </div>
        <p class="text-sm text-secondary font-mono text-center whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 -bottom-8">
          {props.item.name}
        </p>
      </a>
    </div>
  )
}

const TechPage: Component = () => {
  return (
    <main class="container max-w-4xl p-6">
      <a href="/" class="btn icon -m-l-3 my-0 !text-xl mb-6">
        <MdiArrowLeftThin />
      </a>
      <h1 class="text-4xl font-bold tracking-wider mb-2">Tech I Use</h1>
      <p class="font-mono text-secondary mb-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sequi iure earum placeat, labore iusto rem dolore temporibus praesentium quibusdam?</p>
      <div class="
        w-full grid gap-12 mb-6
        grid-cols-[repeat(auto-fill,minmax(84px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))]
      ">
        <For each={tech}>{item =>
          <TechItem item={item} bg="primary-dark" />
        }</For>
      </div>
    </main>
  )
}

export default TechPage
