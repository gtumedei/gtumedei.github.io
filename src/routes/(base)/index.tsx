import { A } from "@solidjs/router"
import { animate, stagger } from "motion"
import { onMount } from "solid-js"
import Meta from "~/components/meta"
import { button } from "~/components/ui/button"
import tooltip from "~/lib/directives/tooltip"
import TablerArrowNarrowRight from "~icons/tabler/arrow-narrow-right"
import TablerBrandGithub from "~icons/tabler/brand-github"
import TablerBrandLinkedin from "~icons/tabler/brand-linkedin"
import TablerBrandTelegram from "~icons/tabler/brand-telegram"
import TablerDeviceGamepad from "~icons/tabler/device-gamepad"
import TablerDownload from "~icons/tabler/download"
import TablerGrid3x3 from "~icons/tabler/grid-3x3"
import TablerMapPin from "~icons/tabler/map-pin"
import TablerTools from "~icons/tabler/tools"

const HomePage = () => {
  onMount(() => {
    animate([
      [`[data-motion="image"]`, { opacity: 1, scale: [0.9, 1] }, { duration: 0.4 }],
      [
        `[data-motion="hero"]`,
        { opacity: 1, x: [-10, 0] },
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
      <div class="w-full px-6">
        <div
          class="inline-flex bg-base-200 dark:bg-base-300 p-1.5 rounded-full border border-on-base/10 shadow shadow-black/5 mb-6"
          data-motion="image"
        >
          <img src="/profile.jpg" alt="Profile image" class="h-15 w-15 rounded-full" />
        </div>
        <h1
          class="font-serif text-4xl sm:text-5xl font-bold tracking-wider mb-1"
          data-motion="hero"
        >
          Gianni Tumedei
        </h1>
        <h2 class="text-lg font-mono text-on-base/70" data-motion="hero">
          @gtumedei
        </h2>
        <div class="flex gap-2 mt-6">
          <div class="max-sm:grow flex" data-motion="hero">
            <a href="/cv" class={button({ class: "grow" })}>
              Download CV <TablerDownload />
            </a>
          </div>
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
              title: "Location • Cesena (IT)",
            },
          ].map((item) => (
            <div data-motion="hero">
              <a
                href={item.href}
                target="_blank"
                class={button({ variant: "subtle", shape: "square", class: "sm:hidden" })}
                use:tooltip={[item.title, "bottom"]}
              >
                {item.icon()}
              </a>
              <a
                href={item.href}
                target="_blank"
                class={button({ variant: "ghost", shape: "square", class: "max-sm:hidden" })}
                use:tooltip={[item.title, "bottom"]}
              >
                {item.icon()}
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* <div class="relative">
        <div class="h-44 lg:h-72 w-px my-24" />
        <div class="w-screen flex gap-6 lg:gap-10 justify-center py-24 absolute-center overflow-hidden">
          <a
            href="#"
            class="shrink-0 h-44 w-44 lg:h-72 lg:w-72 bg-blue-200 rounded-2xl lg:rounded-3xl overflow-hidden rotate-3 hover:rotate-0 hover:scale-105 transition-transform"
          ></a>
          <a
            href="#"
            class="shrink-0 h-44 w-44 lg:h-72 lg:w-72 bg-orange-200 rounded-2xl lg:rounded-3xl -rotate-3 hover:rotate-0 hover:scale-105 transition-transform"
          ></a>
          <a
            href="#"
            class="shrink-0 h-44 w-44 lg:h-72 lg:w-72 bg-teal-200 rounded-2xl lg:rounded-3xl rotate-3 hover:rotate-0 hover:scale-105 transition-transform"
          ></a>
          <a
            href="#"
            class="shrink-0 h-44 w-44 lg:h-72 lg:w-72 bg-pink-200 rounded-2xl lg:rounded-3xl -rotate-3 hover:rotate-0 hover:scale-105 transition-transform"
          ></a>
          <a
            href="#"
            class="shrink-0 h-44 w-44 lg:h-72 lg:w-72 bg-slate-200 rounded-2xl lg:rounded-3xl rotate-3 hover:rotate-0 hover:scale-105 transition-transform"
          ></a>
        </div>
      </div> */}
      {/* <div class="relative">
        <div class="h-80 w-px my-24" />
        <div class="w-screen flex gap-4 justify-center py-24 absolute-center overflow-hidden">
          {[1, 2, 3, 4, 5].map(() => (
            <div class="shrink-0 h-80 w-60 rounded-2xl lg:rounded-3xl border border-on-base/10 relative overflow-hidden">
              <img
                src="https://jedvxusexliwihumabdp.supabase.co/storage/v1/object/public/gtumedei//mtt-build.png"
                alt=""
                class="h-full w-full object-cover"
              />
              <Button
                variant="subtle"
                shape="circle"
                class="bg-base-300/40 hover:bg-base-300/70 backdrop-blur-xl absolute top-3 right-3"
              >
                <TablerArrowUpRight />
              </Button>
            </div>
          ))}
        </div>
      </div> */}
      {/* <div class="relative">
        <div class="h-40 lg:h-80 w-px my-24" />
        <div class="w-screen flex gap-4 justify-center py-24 absolute-center overflow-hidden">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              class={cn(
                "shrink-0 h-40 w30 lg:h-80 lg:w-60 rounded-2xl lg:rounded-3xl border border-on-base/10 relative overflow-hidden",
                i % 2 == 0 ? "-translate-y-2" : "translate-y-2"
              )}
            >
              <img
                src="https://jedvxusexliwihumabdp.supabase.co/storage/v1/object/public/gtumedei//mtt-build.png"
                alt=""
                class="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div> */}
      <div class="grid md:grid-cols-2 gap-6 py-20">
        {[
          {
            title: "Projects",
            description:
              "I'm always creating stuff. You can find both my work and personal projects listed inside here.",
            href: "/projects",
            icon: () => <TablerGrid3x3 />,
            action: "Check them out",
          },
          {
            title: "Tech",
            description:
              "It's the longest page on this website. Maybe you'll find something interesting in it.",
            href: "/tech",
            icon: () => <TablerTools />,
            action: "Read more",
          },
          {
            title: "Minigames",
            description:
              "Just hanging around? You can play some minigames I built. Just do not expect too much, I'm not a game dev.",
            href: "/minigames",
            icon: () => <TablerDeviceGamepad />,
            action: "Play some",
          },
          {
            title: "Contact",
            description:
              "Wanna work together or just chat? Reaching out to me is easy and I reply pretty quickly most of the time.",
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
