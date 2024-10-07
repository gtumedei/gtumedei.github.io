import { A } from "@solidjs/router"
import Seo from "~/components/seo"
import { button } from "~/components/ui/button"
import tooltip from "~/lib/directives/tooltip"
import { createTimeline, stagger } from "~/lib/motion"
import TablerArrowNarrowRight from "~icons/tabler/arrow-narrow-right"
import TablerBrandGithub from "~icons/tabler/brand-github"
import TablerBrandLinkedin from "~icons/tabler/brand-linkedin"
import TablerBrandTelegram from "~icons/tabler/brand-telegram"
import TablerCpu from "~icons/tabler/cpu"
import TablerDeviceGamepad from "~icons/tabler/device-gamepad"
import TablerDownload from "~icons/tabler/download"
import TablerGrid3x3 from "~icons/tabler/grid-3x3"
import TablerMapPin from "~icons/tabler/map-pin"

const HomePage = () => {
  createTimeline([
    [`[data-motion="image"]`, { opacity: 1, x: [-10, 0], rotate: [3, -3] }, { duration: 0.4 }],
    [
      `[data-motion="hero"]`,
      { opacity: 1, x: [-10, 0] },
      { duration: 0.4, delay: stagger(0.15), at: "<" },
    ],
    [
      `[data-motion="menu"]`,
      { opacity: 1, scale: [0.95, 1], y: [10, 0] },
      { duration: 0.4, delay: stagger(0.15, { start: 0.2 }), at: "<" },
    ],
  ])

  tooltip
  return (
    <>
      <Seo description="My personal website." />
      <div class="w-full px-6">
        <img
          src="/profile.jpg"
          alt="Profile image"
          class="h-40 w-40 rounded-xl -rotate-3 mb-8"
          data-motion="image"
        />
        <h1
          class="font-serif text-4xl sm:text-5xl font-bold tracking-wider mb-1"
          data-motion="hero"
        >
          Gianni Tumedei
        </h1>
        <h2 class="font-mono text-on-base/70" data-motion="hero">
          @gtumedei
        </h2>
        <div class="flex mt-6">
          <div class="flex" data-motion="hero">
            <a href="/cv" class={button({ theme: "accent", class: "mr-2" })}>
              Download CV <TablerDownload />
            </a>
          </div>
          {[
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
          ].map((item) => (
            <a
              href={item.href}
              target="_blank"
              class={button({ variant: "ghost", shape: "square" })}
              use:tooltip={[item.title, "bottom"]}
              data-motion="hero"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-y-6 py-20">
        {[
          {
            title: "Projects",
            description:
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
            href: "/projects",
            icon: () => <TablerGrid3x3 />,
            action: "Check them out",
          },
          {
            title: "Tech",
            description:
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
            href: "/tech",
            icon: () => <TablerCpu />,
            action: "Read more",
          },
          {
            title: "Minigames",
            description:
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
            href: "/minigames",
            icon: () => <TablerDeviceGamepad />,
            action: "Play some",
          },
          {
            title: "Contact",
            description:
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
            href: "/contact",
            icon: () => <TablerBrandTelegram />,
            action: "Get in touch",
          },
        ].map((item) => (
          <A
            href={item.href}
            class="flex flex-col hover:bg-on-base/5 transition-colors duration-500 md:rounded-3xl p-6 group"
            data-motion="menu"
          >
            <div class="flex gap-4 items-center mb-3">
              {item.icon()}
              <h2 class="text-lg font-semibold">{item.title}</h2>
            </div>
            <p class="text-sm text-on-base/70 tall-lines mb-4">{item.description}</p>
            <p class="flex items-center gap-1.5 text-sm font-medium text-accent">
              {item.action}
              <TablerArrowNarrowRight class="text-base group-hover:translate-x-1 transition-transform" />
            </p>
          </A>
        ))}
      </div>
    </>
  )
}

export default HomePage
