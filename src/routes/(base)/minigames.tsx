import { A } from "@solidjs/router"
import ColorGuesserBanner from "~/components/color-guesser-banner"
import Meta from "~/components/meta"
import { button } from "~/components/ui/button"
import { createTimeline, stagger } from "~/lib/motion"
import TablerArrowBackUp from "~icons/tabler/arrow-back-up"
import TablerColorSwatch from "~icons/tabler/color-swatch"

const MinigamesPage = () => {
  createTimeline([
    [
      `[data-motion="heading"]`,
      { opacity: 1, x: [-10, 0] },
      { duration: 0.4, delay: stagger(0.15) },
    ],
    [
      `[data-motion="minigames"]`,
      { opacity: 1, scale: [0.95, 1], y: [10, 0] },
      { duration: 0.4, delay: stagger(0.15, { start: 0.2 }), at: "<" },
    ],
  ])

  return (
    <>
      <Meta
        title="Minigames"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, veniam?"
      />
      <div class="lg:w-2/3 px-6">
        <A href="/" class={button({ variant: "raised", shape: "circle", class: "group" })}>
          <TablerArrowBackUp class="text-on-base/70 group-hover:text-on-base transition-colors" />
        </A>
        <h1
          class="font-serif text-4xl sm:text-5xl font-bold tracking-wider mt-8 mb-6"
          data-motion="heading"
        >
          Minigames
        </h1>
        <p class="text-on-base/70 tall-lines" data-motion="heading">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus accusamus, tempora quod
          placeat cumque in repellendus aut ea voluptas officia exercitationem voluptates impedit
          minima eaque fugiat quia, dignissimos perspiciatis harum?
        </p>
      </div>
      <div class="grid md:grid-cols-2 gap-y-6 py-20">
        <A
          href="/minigames/color-guesser"
          class="hover:bg-on-base/5 transition-colors duration-500 md:rounded-3xl p-6 group"
          data-motion="minigames"
        >
          <div class="w-full aspect-video flex bg-base-300 rounded-2xl mb-6 rotate-2 group-hover:rotate-0 transition-all relative overflow-hidden">
            <ColorGuesserBanner class="absolute inset-0 [&_rect]:transition-colors group-hover:[&_rect]:fill-accent" />
            <div class="h-full aspect-square bg-base-300 [mask-image:radial-gradient(circle,red,transparent_80%)] flex m-auto z-10">
              <TablerColorSwatch class="text-3xl m-auto" />
            </div>
          </div>
          <h2 class="text-lg font-medium group-hover:text-accent transition-colors mb-3">
            Color guesser
          </h2>
          <p class="text-sm text-on-base/70 tall-lines">
            Are you nerd enough to guess a color based on its RGB code? Let's find out! HSL is also
            available for the classy ones.
          </p>
        </A>
        <div class="md:grounded-3xl p-6" data-motion="minigames">
          <div class="w-full aspect-video p-1.5 rounded-2xl border-2 border-dashed border-on-base/10 mb-6 -rotate-1">
            <div class="h-full w-full bg-base-300 rounded-xl" />
          </div>
          <p class="text-sm text-on-base/70 tall-lines">
            More minigames might be coming soon! Or not, it really depends if I get inspired AND
            find the time to build them.
          </p>
        </div>
      </div>
    </>
  )
}

export default MinigamesPage
