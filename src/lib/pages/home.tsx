import { For } from "solid-js"
import tooltip from "~/lib/directives/tooltip"
import { createTimeline, stagger } from "~/lib/motion"
tooltip
import TablerApps from "~icons/tabler/apps"
import TablerBrandGithub from "~icons/tabler/brand-github"
import TablerBrandLinkedin from "~icons/tabler/brand-linkedin"
import TablerBrandTelegram from "~icons/tabler/brand-telegram"
import TablerDeviceGamepad2 from "~icons/tabler/device-gamepad-2"
import TablerDownload from "~icons/tabler/download"
import TablerMapPin from "~icons/tabler/map-pin"

const HomePage = () => {
  const links = [
    {
      href: "https://github.com/gtumedei",
      icon: <TablerBrandGithub />,
      title: "GitHub • @gtumedei",
    },
    {
      href: "https://www.linkedin.com/in/gianni-tumedei-7171961b8/",
      icon: <TablerBrandLinkedin />,
      title: "LinkedIn • @giannitumedei",
    },
    {
      href: "https://goo.gl/maps/knzcetCBj6cHLAAW7",
      icon: <TablerMapPin />,
      title: "Location • Cesena (IT)",
    },
  ]

  const pages = [
    {
      href: "/tech",
      icon: <TablerApps />,
      title: "Tech I Use",
      subtitle: "See what I like",
    },
    {
      href: "/contact",
      icon: <TablerBrandTelegram />,
      title: "Contact",
      subtitle: "Get in touch with me",
    },
    {
      href: "/games",
      icon: <TablerDeviceGamepad2 />,
      title: "Play some games",
      subtitle: "Wait, what?",
    },
  ]

  createTimeline([
    [".motion-1", { opacity: 1, x: [-10, 0] }, { duration: 0.4, delay: stagger(0.15) }],
    [".motion-2", { opacity: 1, y: [-10, 0] }, { duration: 0.4, delay: stagger(0.15), at: "<" }],
    [
      ".motion-3",
      { opacity: 1, scale: [0.95, 1], y: [10, 0] },
      { duration: 0.4, delay: stagger(0.15, { start: 0.2 }), at: "<" },
    ],
  ])

  return (
    <div class="w-full grid md:grid-cols-2 gap-6 md:m-auto">
      <div class="flex flex-col justify-center my-12 md:m-0">
        <div class="flex flex-col justify-center pl-2">
          <img
            src="/profile.jpg"
            class="motion-1 h-18 w-18 rounded-full shadow-lg mb-6"
            alt="Profile image"
          />
          <h1 class="motion-1 section-heading mb-1">Gianni Tumedei</h1>
          <h2 class="motion-1 font-mono">@gtumedei</h2>
          <div class="flex mt-1 mb-6 -ml-3">
            <For each={links}>
              {(link) => (
                <div class="motion-2">
                  <a
                    href={link.href}
                    target="_blank"
                    class="btn btn-icon"
                    use:tooltip={[link.title, "bottom"]}
                  >
                    {link.icon}
                  </a>
                </div>
              )}
            </For>
          </div>
        </div>
        <div class="flex flex-wrap gap-3">
          <a href="/cv" class="motion-1 btn btn-accent">
            Download CV
            <TablerDownload />
          </a>
        </div>
      </div>
      <div class="flex flex-col gap-6 justify-center">
        <For each={pages}>
          {(page) => (
            <a
              href={page.href}
              class="motion-3 card flex gap-6 items-center p-2 transition-colors hover:border-accent focus:border-accent outline-none group"
            >
              <div class="flex bg-primary-focus rounded-lg p-6 group-hover:bg-accent-10 group-hover:text-accent group-focus:bg-accent-10 group-focus:text-accent transition-colors">
                {page.icon}
              </div>
              <div class="flex-grow">
                <h3 class="section-subheading mb-1">{page.title}</h3>
                <p class="text-sm">{page.subtitle}</p>
              </div>
            </a>
          )}
        </For>
      </div>
    </div>
  )
}

export default HomePage
