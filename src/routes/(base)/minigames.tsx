import { A } from "@solidjs/router"
import { animate, stagger } from "motion"
import { onMount } from "solid-js"
import Meta from "~/components/meta"
import PageHeadingIcon from "~/components/page-heading-icon"
import TablerArrowNarrowRight from "~icons/tabler/arrow-narrow-right"
import TablerClock from "~icons/tabler/clock"
import TablerDeviceGamepad from "~icons/tabler/device-gamepad"

const MinigamesPage = () => {
  onMount(() => {
    animate([
      [`[data-motion="image"]`, { opacity: 1, scale: [0.9, 1] }, { duration: 0.4 }],
      [
        `[data-motion="heading"]`,
        { opacity: 1, x: [-10, 0] },
        { duration: 0.4, delay: stagger(0.15), at: "<" },
      ],
      [
        `[data-motion="minigame-item"]`,
        { opacity: 1, scale: [0.95, 1], y: [10, 0] },
        { duration: 0.4, delay: stagger(0.15, { startDelay: 0.2 }), at: "<" },
      ],
    ])
  })

  return (
    <>
      <Meta
        title="Minigames"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, veniam?"
      />
      <div class="lg:w-2/3 px-6">
        <PageHeadingIcon data-motion="image">
          <TablerDeviceGamepad />
        </PageHeadingIcon>
        <h1 class="font-heading text-4xl sm:text-5xl tracking-wider mb-6" data-motion="heading">
          Minigames
        </h1>
        <p class="text-on-base/70 tall-lines" data-motion="heading">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus accusamus, tempora quod
          placeat cumque in repellendus aut ea voluptas officia exercitationem voluptates impedit
          minima eaque fugiat quia, dignissimos perspiciatis harum?
        </p>
      </div>
      <div class="grid md:grid-cols-2 gap-6 px-6 py-20">
        <A
          href="/minigames/color-guesser"
          class="flex flex-col gap-2 p-2 rounded-2xl border border-on-base/10 group hover:bg-on-base/5 hover:border-transparent transition-colors"
          data-motion="minigame-item"
        >
          <div class="w-full aspect-2/1 bg-on-base/5 rounded-xl" />
          <div class="p-4">
            <h2 class="text-lg font-medium mb-2">Color guesser</h2>
            <p class="text-sm text-on-base/70 tall-lines mb-4">
              Are you nerd enough to guess a color based on its RGB code? Let's find out! HSL is
              also available for the classy ones.
            </p>
            <p class="flex items-center gap-1.5 text-sm font-medium text-accent">
              Try it out
              <TablerArrowNarrowRight class="text-base group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </A>

        <div
          class="flex flex-col gap-2 p-2 rounded-2xl border border-dashed border-on-base/10"
          data-motion="minigame-item"
        >
          <div class="w-full aspect-2/1 flex bg-base-300 rounded-xl">
            <div class="flex flex-col items-center m-auto">
              <TablerClock class="text-2xl text-on-base/50 mb-1" />
              <p class="text-xl font-medium text-on-base/50">
                <span class="inline-block rotate-3 mr-3">Coming</span>
                <span class="inline-block -rotate-3">Soon</span>
              </p>
            </div>
          </div>
          <div class="p-4">
            <p class="text-sm text-on-base/70 tall-lines">
              More minigames might be coming soon! Or not, it really depends if I get inspired AND
              find the time to build them.
            </p>
          </div>
        </div>

        {/* <A
          href="/minigames/color-guesser"
          class="hover:bg-on-base/5 transition-colors duration-500 md:rounded-3xl p-6 group"
          data-motion="minigames"
        >
          <div class="w-full aspect-video flex bg-base-300 rounded-2xl mb-6 rotate-2 group-hover:rotate-0 transition-all relative overflow-hidden">
            <ColorGuesserBanner class="absolute inset-0 [&_rect]:transition-colors group-hover:[&_rect]:fill-accent" />
            <div class="h-full aspect-square bg-base-300 mask-[radial-gradient(circle,red,transparent_80%)] flex m-auto z-10">
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
        </div> */}
      </div>
    </>
  )
}

export default MinigamesPage
