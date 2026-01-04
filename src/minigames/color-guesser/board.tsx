import { Component, createSignal, For, Show } from "solid-js"
import OpacityTransition from "~/components/opacity-transition"
import cn from "~/lib/cn"
import TablerCheck from "~icons/tabler/check"
import TablerX from "~icons/tabler/x"
import { useColorGuesserGame } from "./core"

export const ColorGuesserBoard = () => {
  const ctx = useColorGuesserGame()

  return (
    <OpacityTransition>
      <Show when={ctx.game.colorGrid} keyed>
        {(colorGrid) => {
          const grid = ctx.game.difficulty?.grid // Make the grid size non-reactive to avoid bad looking animations on difficulty change
          return (
            <div
              class="h-full grid gap-3"
              style={`grid-template-columns: repeat(${grid}, minmax(0, 1fr));`}
            >
              <For each={colorGrid ?? []}>{(color) => <Tile color={color} />}</For>
            </div>
          )
        }}
      </Show>
    </OpacityTransition>
  )
}

const Tile: Component<{ color: string }> = (props) => {
  const [success, setSuccess] = createSignal(false)
  const [error, setError] = createSignal(false)

  const ctx = useColorGuesserGame()

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

  const onClick = async () => {
    const correct = ctx.gameActions.registerGuess(props.color)
    if (correct) {
      setSuccess(true)
      await sleep(500)
      setSuccess(false)
      ctx.gameActions.nextColor()
    } else {
      setError(true)
      await sleep(500)
      setError(false)
    }
  }

  return (
    <button
      class="group relative w-full h-full rounded-2xl cursor-pointer"
      style={`background-color: ${props.color};`}
      onClick={onClick}
    >
      <div
        class={cn(
          "bg-base-300 rounded-[20px] border border-on-base/20 shadow-md shadow-black/5 absolute -inset-1.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity -z-10",
          (success() || error()) && "opacity-100!"
        )}
      />
      <div
        class={cn(
          "bg-white/30 rounded-2xl absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity",
          (success() || error()) && "opacity-100!"
        )}
      >
        <TablerCheck
          class={cn(
            "absolute-center h-1/2 w-1/2 text-black/50 transition-opacity",
            success() ? "opacity-100" : "opacity-0"
          )}
        />
        <TablerX
          class={cn(
            "absolute-center h-1/2 w-1/2 text-black/50 transition-opacity",
            error() ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
    </button>
  )
}
