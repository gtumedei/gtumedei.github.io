import { A } from "@solidjs/router"
import { pages } from "content-collections"
import { animate } from "motion"
import { onMount } from "solid-js"
import Meta from "~/components/meta"
import PageAvatar from "~/components/page-avatar-icon"
import { SearchTrigger } from "~/components/search"
import { button } from "~/components/ui/button"
import { Keymaster } from "~/lib/achievements/helpers"
import {
  headingImageAnimation,
  homepageNavAnimation,
  verticalHeadingAnimation,
} from "~/lib/animation"
import ContentIcon from "~/lib/content-icons"
import tooltip from "~/lib/directives/tooltip"
import TablerArrowNarrowRight from "~icons/tabler/arrow-narrow-right"
import TablerBrandGithub from "~icons/tabler/brand-github"
import TablerFileDescription from "~icons/tabler/file-description"
import TablerMapPin from "~icons/tabler/map-pin"

const HomePage = () => {
  onMount(() => {
    animate([headingImageAnimation(), verticalHeadingAnimation(), homepageNavAnimation()])
  })

  tooltip
  return (
    <>
      <Meta description="My personal website." />
      <section class="w-full flex flex-col items-center text-center px-6 mt-auto">
        <Keymaster>
          <PageAvatar class="h-full w-full backface-hidden absolute inset-0" data-motion="image">
            <img src="/profile.png" alt="Profile image" class="bg-neutral/5 rounded-full" />
          </PageAvatar>
        </Keymaster>
        <h1 class="font-heading text-4xl sm:text-5xl mb-1.5" data-motion="heading">
          Gianni Tumedei
        </h1>
        <h2 class="text-xl text-on-base/70" data-motion="heading">
          @gtumedei
        </h2>
        <div class="flex flex-wrap justify-center gap-3 mt-6">
          <div data-motion="heading">
            <SearchTrigger variant="neutral" />
          </div>
          <div class="flex gap-3">
            {[
              {
                href: "https://github.com/gtumedei",
                icon: () => <TablerBrandGithub />,
                title: "GitHub • @gtumedei",
              },
              {
                href: "/cv",
                icon: () => <TablerFileDescription />,
                title: "Download CV",
              },
              {
                href: "https://goo.gl/maps/knzcetCBj6cHLAAW7",
                icon: () => <TablerMapPin />,
                title: "Based in Cesena (IT)",
              },
            ].map((item) => (
              <div class="rounded-2.5 backdrop-blur-xs" data-motion="heading">
                <a
                  href={item.href}
                  target="_blank"
                  class={button({ variant: "subtle", shape: "circle", size: "lg" })}
                  use:tooltip={[item.title, "bottom"]}
                >
                  {item.icon()}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section class="grid md:grid-cols-2 gap-6 py-20 mb-auto">
        {pages.items
          .filter((it) => it.showInHomepage)
          .map((it) => (
            <A
              href={it.path}
              class="flex flex-col hover:bg-neutral/5 active:bg-neutral/5 transition-colors duration-500 md:rounded-5 p-6 group focus-ring"
              data-motion="nav"
            >
              <div class="size-11 flex justify-center items-center bg-base-200/90 text-accent p-1.5 rounded-full border border-on-base/10 shadow shadow-black/3 mb-6">
                <ContentIcon icon={it.icon} />
              </div>
              <h2 class="font-heading text-2xl mb-3">{it.title}</h2>
              <p class="md:text-sm text-on-base/70 tall-lines mb-4">{it.description}</p>
              <p class="flex items-center gap-1.5 md:text-sm font-medium text-on-base/50 group-hover:text-accent group-active:text-accent transition-colors">
                {it.cta}
                <TablerArrowNarrowRight class="text-base max-md:text-lg group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
              </p>
            </A>
          ))}
      </section>
    </>
  )
}

export default HomePage
