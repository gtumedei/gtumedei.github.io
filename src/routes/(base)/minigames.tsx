import { A } from "@solidjs/router"
import { minigames, Minigames } from "content-collections"
import { animate, stagger } from "motion"
import { Component, For, onMount } from "solid-js"
import Meta from "~/components/meta"
import PageAvatar from "~/components/page-avatar-icon"
import TablerArrowNarrowRight from "~icons/tabler/arrow-narrow-right"
import TablerDeviceGamepad from "~icons/tabler/device-gamepad"

type Minigame = Minigames["items"][number]

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
        description="Killing time? Try some simple minigames I built. They're fun, just don't expect AAA production value."
      />
      <div class="lg:w-2/3 px-6">
        <PageAvatar class="mb-8" data-motion="image">
          <PageAvatar.Icon>
            <TablerDeviceGamepad />
          </PageAvatar.Icon>
        </PageAvatar>
        <h1 class="font-heading text-4xl sm:text-5xl tracking-wider mb-6" data-motion="heading">
          Minigames
        </h1>
        <p class="text-on-base/70 tall-lines" data-motion="heading">
          Here you can find a few lightweight minigames I created for fun. If you want a quick break
          or a tiny challenge, you're in the right place. And who knows, a new one might have popped
          out the next time you drop by.
        </p>
      </div>
      <div class="grid md:grid-cols-2 gap-6 px-6 py-20">
        <For each={minigames.items}>{(minigame) => <MinigameCard minigame={minigame} />}</For>
      </div>
    </>
  )
}

const MinigameCard: Component<{ minigame: Minigame }> = (props) => {
  return (
    <A
      href={`/minigames/${props.minigame.slug}`}
      class="flex flex-col gap-6 p-6 rounded-5 border border-on-base/10 group hover:bg-neutral/5 hover:border-transparent active:bg-neutral/5 active:border-transparent focus-ring transition-colors"
      data-motion="minigame-item"
    >
      <img src={props.minigame.imageUrl} alt="" class="w-36 h-36 rounded-3 shadow shadow-black/5" />
      <div class="px-0.5">
        <h2 class="text-lg font-medium mb-2">{props.minigame.name}</h2>
        <p class="md:text-sm text-on-base/70 tall-lines mb-4">{props.minigame.description}</p>
        <p class="flex items-center gap-1.5 md:text-sm font-medium text-accent">
          Try it out
          <TablerArrowNarrowRight class="text-base max-md:text-lg group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
        </p>
      </div>
    </A>
  )
}

export default MinigamesPage
