import { Component, For, JSX } from "solid-js"
import cn from "~/lib/cn"
import { createTimeline, stagger } from "~/lib/motion"
import TablerChevronRight from "~icons/tabler/chevron-right"
import TablerColorSwatch from "~icons/tabler/color-swatch"
import TablerHourglass from "~icons/tabler/hourglass"

type Game = {
  name: string
  description: string
  icon: () => JSX.Element
  href: string
  available: boolean
}

const games: Game[] = [
  {
    name: "Color Guesser",
    description: "Can you guess a color based on its code?",
    icon: () => <TablerColorSwatch />,
    href: "/games/color-guesser",
    available: true,
  },
  /* {
    name: "Memory",
    description: "Just a minimalist memory game.",
    icon: () => <MdiCards />,
    href: "/games/memory",
    available: false
  },
  {
    name: "Px Art",
    description: "Make pixel art images. Is this even a game?",
    icon: () => (
      <svg width="32" height="32" viewBox="0 0 24 24">
        <path fill="currentColor" d="M4 3H2v18h20V3H4zm16 2v14H4V5h16zm-6 4h-2v2h-2v2H8v2H6v2h2v-2h2v-2h2v-2h2v2h2v2h2v-2h-2v-2h-2V9zM8 7H6v2h2V7z"/>
      </svg>
    ),
    href: "/games/px-art",
    available: false
  } */
]

const GameItem: Component<{
  game: Game
  class?: string
}> = (props) => {
  return (
    <a
      href={props.game.href}
      class={cn(
        "card group relative flex flex-col items-center gap-2 p-2 transition-colors outline-none hover:border-accent focus:border-accent",
        props.class
      )}
    >
      <div class=" w-full flex justify-center items-center bg-base-focus text-xl rounded-lg px-6 py-18 group-hover:bg-accent/10 group-hover:text-accent group-focus:bg-accent/10 group-focus:text-accent transition-colors">
        {props.game.icon()}
      </div>
      <div class="w-full p-2">
        <h2 class="section-subheading mb-1">{props.game.name}</h2>
        <p class="text-sm">{props.game.description}</p>
      </div>
      {!props.game.available && <span class="absolute top-1 left-1 badge">Coming soon(ish)</span>}
    </a>
  )
}

const GamesPage = () => {
  createTimeline([
    [".motion-1", { opacity: 1, x: [-10, 0] }, { duration: 0.4, delay: stagger(0.15) }],
    [
      ".motion-2",
      { opacity: 1, scale: [0.95, 1], y: [10, 0] },
      { duration: 0.4, delay: stagger(0.15, { start: 0.2 }), at: "<" },
    ],
  ])

  return (
    <>
      <h1 class="motion-1 section-heading mt-9 mb-2">Games</h1>
      <p class="motion-1 mb-12">
        These are just some minigames I make for fun whenever I feel like to. Enjoy them! Oh and by
        the way, do not hesitate to{" "}
        <a href="/contact" class="link">
          contact me
          <TablerChevronRight class="inline-block relative -top-px" />
        </a>{" "}
        if something is broken.
      </p>
      <div class="grid gap-6 md:grid-cols-2">
        <For each={games}>{(game) => <GameItem game={game} class="motion-2" />}</For>
        <div class="card relative flex flex-col items-center gap-2 p-2 motion-2">
          <div
            class="
            w-full flex justify-center items-center border border-dashed
            text-xl rounded-lg px-6 py-18
          "
          >
            <TablerHourglass />
          </div>
          <div class="w-full p-2">
            <p class="text-sm">
              More games coming soon! That is, when I find the time to create them :)
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default GamesPage
