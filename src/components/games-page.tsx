import { Component, For, JSX } from "solid-js"
import { stagger } from "motion"
import { createTimeline } from "~/composables/motion"
import MdiEyedropperVariant from "~icons/mdi/eyedropper-variant"
import MdiCards from "~icons/mdi/cards"

type Game = {
  name: string
  description: string
  icon: () => JSX.Element
  href: string
}

const games: Game[] = [
  {
    name: "Color Guesser",
    description: "Can you guess a color based on its code?",
    icon: () => <MdiEyedropperVariant />,
    href: "/games/color-guesser"
  },
  {
    name: "Memory",
    description: "Just a minimalist memory game.",
    icon: () => <MdiCards />,
    href: "/games/memory"
  }
]

const GameItem: Component<{
  game: Game
  class?: string
}> = (props) => {
  return (
    <a href={props.game.href} class={`
      group flex flex-col gap-2 items-center rounded-xl p-2 transition-colors
      border border-typography-hover hover:border-accent ${props.class ?? ""}
    `}>
      <div class="
        w-full flex justify-center items-center bg-primary-dark group-hover:bg-accent-10
        text-3xl text-accent rounded-xl px-6 py-18 transition-colors
      ">{props.game.icon}</div>
      <div class="w-full p-2">
        <h2 class="text-xl font-bold tracking-wider mb-1">{props.game.name}</h2>
        <p class="text-sm font-mono">{props.game.description}</p>
      </div>
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
