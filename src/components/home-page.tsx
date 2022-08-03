import { Component, For } from "solid-js"
import { stagger } from "motion"
import { createTimeline } from "~/composables/motion"
import tooltip from "~/composables/tooltip"
import MdiApplicationBrackets from "~icons/mdi/application-brackets"
import MdiGithub from "~icons/mdi/github"
import MdiLinkedin from "~icons/mdi/linkedin"
import MdiListBox from "~icons/mdi/list-box"
import MdiMapMarker from "~icons/mdi/map-marker"
import MdiSend from "~icons/mdi/send"

tooltip

const HomePage: Component = () => {

  const links = [
    { href: "https://github.com/gtumedei", icon: <MdiGithub />, title: "GitHub • @gtumedei" },
    { href: "https://www.linkedin.com/in/gianni-tumedei-7171961b8/", icon: <MdiLinkedin />, title: "LinkedIn • @giannitumedei" },
    { href: "https://goo.gl/maps/knzcetCBj6cHLAAW7", icon: <MdiMapMarker />, title: "Location • Cesena (IT)" },
  ]

  const pages = [
    { href: "/tech", icon: <MdiApplicationBrackets />, title: "Tech I Use", subtitle: "See what I like" },
    { href: import.meta.env.CV_URL, icon: <MdiListBox />, title: "Portfolio", subtitle: "Check out my work", target: "_blank" },
    { href: "/contact", icon: <MdiSend />, title: "Contact", subtitle: "Get in touch with me" }
  ]

  createTimeline([
    [".motion-1", { opacity: 1, x: [-10, 0] }, { duration: 0.4, delay: stagger(0.15) }],
    [".motion-2", { opacity: 1, y: [-10, 0] }, { duration: 0.4, delay: stagger(0.15), at: "<" }],
    [".motion-3", { opacity: 1, scale: [0.95, 1], y: [10, 0] }, { duration: 0.4, delay: stagger(0.15), at: "<" }]
  ])

  return (
    <div class="w-full grid md:grid-cols-2 gap-6 md:m-auto">
      <div class="flex flex-col justify-center pl-2 md:p-0 mt-12 mb-6 md:m-0">
        <img src="/profile.jpg" class="motion-1 h-18 w-18 rounded-full shadow-lg mb-6" alt="Profile image" />
        <h1 class="motion-1 text-4xl font-bold tracking-wider mb-1">Gianni Tumedei</h1>
        <h2 class="motion-1 font-mono">@gtumedei</h2>
        <div class="flex mt-3 mb-0 -m-l-3">
          <For each={links} >{link =>
            <div class="motion-2">
              <a
                href={link.href} target="_blank"
                class="btn icon !text-lg"
                aria-label={link.title}
                use:tooltip={[() => link.title, "bottom"]}
              >{link.icon}</a>
            </div>
          }</For>
        </div>
      </div>
      <div class="flex flex-col gap-6 justify-center">
        <For each={pages} >{page =>
          <a href={page.href} target={page.target ?? "_self"} class="
            motion-3 group flex gap-6 items-center rounded-xl p-2 transition-colors
            border border-typography-hover hover:border-accent
          ">
            <div class="flex bg-primary-dark group-hover:bg-accent-10 text-xl text-accent rounded-xl p-6 transition-colors">
              {page.icon}
            </div>
            <div class="flex-grow">
              <h3 class="text-xl font-bold tracking-wider mb-1">{page.title}</h3>
              <p class="text-sm font-mono">{page.subtitle}</p>
            </div>
          </a>
        }</For>
      </div>
    </div>
  )
}

export default HomePage
