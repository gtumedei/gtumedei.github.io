import { Component, createSignal, For, mergeProps } from "solid-js"
import AspectRatio from "~/components/ui/aspect-ratio"
import tooltip from "~/lib/tooltip"
import MdiCog from "~icons/mdi/cog"
import MdiEllipse from "~icons/mdi/ellipse"
import MdiTeddyBear from "~icons/mdi/teddy-bear"

tooltip

const Toolbar = () => {
  return (
    <div class="w-full flex items-center p-2 rounded-xl border">
      <p class="ml-3 flex-grow">99 moves</p>
      <button class="btn btn-icon" use:tooltip={["Game Settings", "top"]}>
        <MdiCog />
      </button>
    </div>
  )
}

const Card: Component<{ icon: string }> = () => {
  const [face,  setFace] = createSignal<"up" | "down">("down")

  return (
    <button
      class={`
        aspect-square bg-primary-focus rounded-xl p-2 border hover:border-accent transition-colors
        ${face() == "up" ? "!border-accent-20" : ""}
      `}
      onClick={() => setFace(f => f == "up" ? "down" : "up")}
    >
      {face() == "up"
        ? <div class="h-full w-full flex">
            <MdiTeddyBear class="text-6xl text-accent m-auto" />
          </div>
        : <div class="h-full w-full flex rounded-lg border border-dashed">
            <MdiEllipse class="text-4xl opacity-20 rotate-90 m-auto" />
          </div>
      }
    </button>
  )
}

const Board: Component<{ cardCount?: number }> = (props) => {
  const allProps = mergeProps({ cardCount: 16 }, props)

  return (
    <div class="grid grid-cols-4 gap-3">
      <For each={new Array(allProps.cardCount)}>{() =>
        <Card icon="a" />
      }</For>
    </div>
  )
}

const MemoryGame: Component = () => {
  return (
    <>
      <AspectRatio w={1} h={1}>
        <Board />
      </AspectRatio>
      <Toolbar />
    </>
  )
}

export default MemoryGame
