import { Component, For } from "solid-js"
import MdiApplicationBrackets from "~icons/mdi/application-brackets"
import MdiGithub from "~icons/mdi/github"
import MdiLinkedin from "~icons/mdi/linkedin"
import MdiListBox from "~icons/mdi/list-box"
import MdiMapMarker from "~icons/mdi/map-marker"
import MdiSend from "~icons/mdi/send"

const HomePage: Component = () => {

  const links = [
    { href: "#", icon: <MdiGithub />, title: "GitHub" },
    { href: "#", icon: <MdiLinkedin />, title: "LinkedIn" },
    { href: "#", icon: <MdiMapMarker />, title: "Location" },
  ]

  const pages = [
    { href: "/tech", icon: <MdiApplicationBrackets />, title: "Tech I Use", subtitle: "See what I like" },
    { href: "/portfolio", icon: <MdiListBox />, title: "Portfolio", subtitle: "Check out my work" },
    { href: "/contact", icon: <MdiSend />, title: "Contact", subtitle: "Get in touch" }
  ]

  return (
    <div class="w-full grid md:grid-cols-2 gap-6 md:m-auto md:pb-90px">
      <div class="flex flex-col justify-center pl-2 md:p-0 mt-12 mb-6 md:m-0">
        <img src="/profile.jpg" class="h-18 w-18 rounded-full shadow-lg mb-6" alt="Profile image" />
        <h1 class="text-4xl font-bold tracking-wider mb-1">Gianni Tumedei</h1>
        <h2 class="font-mono text-secondary">@gtumedei</h2>
        <div class="flex mt-6 mb-0 -m-l-3">
          <For each={links} >{link =>
            <a href={link.href} class="btn icon !text-lg" title={link.title}>
              {link.icon}
            </a>
          }</For>
        </div>
      </div>
      <div class="flex flex-col gap-6 justify-center">
        <For each={pages} >{page =>
          <a href={page.href} class="flex gap-6 items-center bg-primary-dark rounded-xl p-2">
            <div class="flex rounded-lg bg-primary p-6 text-xl text-accent">
              {page.icon}
            </div>
            <div class="flex-grow">
              <h3 class="text-xl font-bold tracking-wider mb-1">{page.title}</h3>
              <p class="text-sm text-secondary font-mono">{page.subtitle}</p>
            </div>
          </a>
        }</For>
      </div>
    </div>
  )
}

export default HomePage
