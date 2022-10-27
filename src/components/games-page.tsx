import { Component, For, JSX } from "solid-js"
import { stagger } from "motion"
import { createTimeline } from "~/lib/motion"
import MdiEyedropperVariant from "~icons/mdi/eyedropper-variant"
import MdiCards from "~icons/mdi/cards"

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
    icon: () => <MdiEyedropperVariant />,
    href: "/games/color-guesser",
    available: false
  },
  {
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
  }
]

const GameItem: Component<{
  game: Game
  class?: string
}> = (props) => {
  return (
    <a href={props.game.href} class={`
      group relative flex flex-col gap-2 items-center rounded-xl p-2 transition-colors
      border hover:border-accent ${props.class ?? ""}
    `}>
      <div class="
        w-full flex justify-center items-center bg-primary-dark group-hover:bg-accent-10
        text-3xl text-accent rounded-lg px-6 py-18 transition-colors
      ">{props.game.icon}</div>
      <div class="w-full p-2">
        <h2 class="text-xl font-bold tracking-wider mb-1">{props.game.name}</h2>
        <p class="text-sm font-mono">{props.game.description}</p>
      </div>
      {!props.game.available && <span class="absolute top-1 left-1 badge">Coming soon(ish)</span>}
    </a>
  )
}

const TechPage: Component = () => {

  createTimeline([
    [".motion-1", { opacity: 1, x: [-10, 0] }, { duration: 0.4, delay: stagger(0.15) }],
    [".motion-2", { opacity: 1, scale: [0.95, 1], y: [10, 0] }, { duration: 0.4, delay: stagger(0.15, { start: 0.2 }), at: "<" }]
  ])

  return (
    <>
      <h1 class="motion-1 text-4xl font-bold tracking-wider mb-2">Games</h1>
      <p class="motion-1 font-mono mb-12">
        This page is a work in progress. Things are going to be added soon(ish).
      </p>
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <For each={games}>{game =>
          <GameItem game={game} class="motion-2" />
        }</For>
      </div>
    </>
  )
}

export default TechPage
