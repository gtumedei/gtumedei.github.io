import { Component, For, JSX } from "solid-js"
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
  icon: JSX.Element
  colors: { text: string, hover: string }
  url: string
}

const tech: Technology[] = [
  {
    name: "TypeScript",
    icon: <MdiLanguageTypeScript />,
    colors: { text: "!group-hover:text-[#0284C7]", hover: "!group-hover:bg-[#0284C7]" },
    url: "https://www.typescriptlang.org/"
  },
  {
    name: "JavaScript",
    icon: <MdiLanguageJavaScript />,
    colors: { text: "!group-hover:text-[#EAB308]", hover: "!group-hover:bg-[#EAB308]" },
    url: "https://www.javascript.com/"
  },
  {
    name: "Vue.js",
    icon: <MdiVuejs />,
    colors: { text: "!group-hover:text-[#00C985]", hover: "!group-hover:bg-[#00C985]" },
    url: "https://vuejs.org/"
  },
  {
    name: "React",
    icon: <MdiReact />,
    colors: { text: "!group-hover:text-[#33DBFB]", hover: "!group-hover:bg-[#33DBFB]" },
    url: "https://reactjs.org/"
  },
  {
    name: "Svelte",
    icon: <CibSvelte/>,
    colors: { text: "!group-hover:text-[#DC2626]", hover: "!group-hover:bg-[#DC2626]" },
    url: "https://svelte.dev/"
  },
  /* {
    name: "Solid.js",
    icon: SolidjsIcon,
    colors: { text: "!group-hover:text-[#0EA5E9]", hover: "!group-hover:bg-[#0EA5E9]" },
    url: "https://www.solidjs.com/"
  }, */
  {
    name: "Electron",
    icon: <MdiElectronFramework />,
    colors: { text: "!group-hover:text-[#67E8F9]", hover: "!group-hover:bg-[#67E8F9]" },
    url: "https://www.electronjs.org/"
  },
  {
    name: "HTML",
    icon: <MdiLanguageHtml5 />,
    colors: { text: "!group-hover:text-[#EA580C]", hover: "!group-hover:bg-[#EA580C]" },
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
  },
  {
    name: "CSS",
    icon: <MdiLanguageCss3 />,
    colors: { text: "!group-hover:text-[#2563EB]", hover: "!group-hover:bg-[#2563EB]" },
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
  },
  {
    name: "PHP",
    icon: <MdiLanguagePhp />,
    colors: { text: "!group-hover:text-[#6D28D9]", hover: "!group-hover:bg-[#6D28D9]" },
    url: "https://www.php.net/"
  },
  {
    name: "Go",
    icon: <MdiLanguageGo />,
    colors: { text: "!group-hover:text-[#00E5FF]", hover: "!group-hover:bg-[#00E5FF]" },
    url: "https://go.dev/"
  },
  {
    name: "Flutter & Dart",
    icon: <CibFlutter />,
    colors: { text: "!group-hover:text-[#38BDF8]", hover: "!group-hover:bg-[#38BDF8]" },
    url: "https://flutter.dev/"
  },
  {
    name: "C, C++",
    icon: <MdiLanguageC />,
    colors: { text: "!group-hover:text-[#0369A1]", hover: "!group-hover:bg-[#0369A1]" },
    url: "https://www.cplusplus.com/"
  },
  {
    name: "Java",
    icon: <MdiLanguageJava />,
    colors: { text: "!group-hover:text-[#E11D48]", hover: "!group-hover:bg-[#E11D48]" },
    url: "https://www.java.com/"
  },
  {
    name: "Scala",
    icon: <CibScala />,
    colors: { text: "!group-hover:text-[#E11D48]", hover: "!group-hover:bg-[#E11D48]" },
    url: "https://www.scala-lang.org/"
  },
  {
    name: "Python",
    icon: <MdiLanguagePython />,
    colors: { text: "!group-hover:text-[#EAB308]", hover: "!group-hover:bg-[#EAB308]" },
    url: "https://www.python.org/"
  },
  {
    name: "Docker",
    icon: <MdiDocker />,
    colors: { text: "!group-hover:text-[#0EA5E9]", hover: "!group-hover:bg-[#0EA5E9]" },
    url: "https://www.docker.com/"
  },
  {
    name: "GraphQL",
    icon: <MdiGraphql />,
    colors: { text: "!group-hover:text-[#DD36A3]", hover: "!group-hover:bg-[#DD36A3]" },
    url: "https://graphql.org/"
  },
  {
    name: "SQL",
    icon: <MdiDatabaseSearch />,
    colors: { text: "!group-hover:text-[#FF7043]", hover: "!group-hover:bg-[#FF7043]" },
    url: "https://en.wikipedia.org/wiki/SQL"
  },
  {
    name: "MongoDB",
    icon: <CibMongodb />,
    colors: { text: "!group-hover:text-[#22C55E]", hover: "!group-hover:bg-[#22C55E]" },
    url: "https://www.mongodb.com/"
  }
]

const TechItem: Component<{
  item: Technology,
  bg: "primary" | "primary-dark"
}> = (props) => {
  return (
    <div>
      <a href={props.item.url} target="_blank" class="group relative flex flex-col gap-2">
        <div class="flex rounded-xl bg-primary mx-auto mb-7">
          <div class={`
            flex p-6 rounded-xl !text-xl text-accent ${props.bg == "primary" ? "bg-primary" : "bg-primary-dark"}
            transition-colors ${props.item.colors.text} ${props.item.colors.hover} !group-hover:bg-opacity-10
          `}>{props.item.icon}</div>
        </div>
        <p class="text-sm font-mono text-center whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 bottom-0">
          {props.item.name}
        </p>
      </a>
    </div>
  )
}

const TechPage: Component = () => {
  return (
    <>
      <h1 class="text-4xl font-bold tracking-wider mb-2">Tech I Use</h1>
      <p class="font-mono mb-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sequi iure earum placeat, labore iusto rem dolore temporibus praesentium quibusdam?</p>
      <div class="
        w-full grid gap-12 mb-6
        grid-cols-[repeat(auto-fill,minmax(84px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))]
      ">
        <For each={tech}>{item =>
          <TechItem item={item} bg="primary-dark" />
        }</For>
      </div>
    </>
  )
}

export default TechPage
