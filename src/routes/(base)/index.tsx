import { A } from "@solidjs/router"
import { animate, stagger } from "motion"
import { onMount } from "solid-js"
import { cn } from "tailwind-variants"
import Meta from "~/components/meta"
import { button } from "~/components/ui/button"
import { Keymaster } from "~/lib/achievements/helpers"
import tooltip from "~/lib/directives/tooltip"
import TablerArrowNarrowRight from "~icons/tabler/arrow-narrow-right"
import TablerBrandGithub from "~icons/tabler/brand-github"
import TablerBrandLinkedin from "~icons/tabler/brand-linkedin"
import TablerBrandTelegram from "~icons/tabler/brand-telegram"
import TablerDeviceGamepad from "~icons/tabler/device-gamepad"
import TablerGrid3x3 from "~icons/tabler/grid-3x3"
import TablerMapPin from "~icons/tabler/map-pin"
import TablerTools from "~icons/tabler/tools"

const HomePage = () => {
  onMount(() => {
    animate([
      [`[data-motion="image"]`, { opacity: 1, scale: [0.9, 1] }, { duration: 0.4 }],
      [
        `[data-motion="hero"]`,
        { opacity: 1, y: [10, 0] },
        { duration: 0.4, delay: stagger(0.15), at: "<" },
      ],
      [
        `[data-motion="menu"]`,
        { opacity: 1, scale: [0.95, 1], y: [10, 0] },
        { duration: 0.4, delay: stagger(0.15, { startDelay: 0.2 }), at: "<" },
      ],
    ])
  })

  tooltip
  return (
    <>
      <Meta description="My personal website." />
      <section class="w-full flex flex-col items-center text-center px-6 mt-auto">
        <Keymaster data-motion="image">
          <div class="flex bg-base-200/90 group-data-wallpaper/html:bg-base-300/60 backdrop-blur-xs p-2 rounded-full border border-on-base/10 shadow shadow-black/3 backface-hidden absolute inset-0 transition-colors">
            <img src="/profile.jpg" alt="Profile image" class="rounded-full" />
          </div>
        </Keymaster>
        <h1 class="font-heading text-4xl sm:text-5xl mb-1.5" data-motion="hero">
          Gianni Tumedei
        </h1>
        <h2 class="text-xl text-on-base/60 tracking-wide" data-motion="hero">
          @gtumedei
        </h2>
        <div class="flex gap-3 mt-6">
          {[
            {
              href: "https://github.com/gtumedei",
              icon: () => <TablerBrandGithub />,
              title: "GitHub • @gtumedei",
            },
            {
              href: "https://www.linkedin.com/in/gianni-tumedei-7171961b8/",
              icon: () => <TablerBrandLinkedin />,
              title: "LinkedIn • @giannitumedei",
            },
            {
              href: "https://goo.gl/maps/knzcetCBj6cHLAAW7",
              icon: () => <TablerMapPin />,
              title: "Based in Cesena (IT)",
            },
          ].map((item) => (
            <div data-motion="hero">
              <a
                href={item.href}
                target="_blank"
                class={cn(
                  button({ variant: "subtle", shape: "square", size: "lg" }),
                  "backdrop-blur-xs",
                )}
                use:tooltip={[item.title, "bottom"]}
              >
                {item.icon()}
              </a>
            </div>
          ))}
        </div>
      </section>
      <section class="grid md:grid-cols-2 gap-6 py-20 mb-auto">
        {[
          {
            title: "Projects",
            description:
              "I'm always building stuff. You can find my research, freelance, and personal projects listed inside here.",
            href: "/projects",
            icon: () => <TablerGrid3x3 />,
            action: "Check them out",
          },
          {
            title: "Tech",
            description:
              "A long, wandering page of tools and tech I enjoy using. Check it out, you might discover something useful.",
            href: "/tech",
            icon: () => <TablerTools />,
            action: "Read more",
          },
          {
            title: "Minigames",
            description:
              "Killing time? Try some simple minigames I built. They're fun, just don't expect AAA production value.",
            href: "/minigames",
            icon: () => <TablerDeviceGamepad />,
            action: "Play some",
          },
          {
            title: "Contact",
            description:
              "Want to work together or just talk? Reaching out is easy, and I usually reply pretty fast.",
            href: "/contact",
            icon: () => <TablerBrandTelegram />,
            action: "Get in touch",
          },
        ].map((item) => (
          <A
            href={item.href}
            class="flex flex-col hover:bg-on-base/5 transition-colors duration-500 md:rounded-3xl p-6 group focus-ring"
            data-motion="menu"
          >
            <div class="flex gap-4 items-center mb-3">
              {item.icon()}
              <h2 class="text-lg font-semibold">{item.title}</h2>
            </div>
            <p class="md:text-sm text-on-base/70 tall-lines mb-4">{item.description}</p>
            <p class="flex items-center gap-1.5 md:text-sm font-medium text-accent">
              {item.action}
              <TablerArrowNarrowRight class="text-base max-md:text-lg group-hover:translate-x-1 transition-transform" />
            </p>
          </A>
        ))}
      </section>
    </>
  )
}

export default HomePage
