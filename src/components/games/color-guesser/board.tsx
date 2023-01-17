import { Component, createSignal, Show, For } from "solid-js"
import { Transition } from "solid-transition-group"
import { useColorGuesserCtx } from "~/lib/games/color-guesser/core"
import MdiCheck from "~icons/mdi/check"
import MdiClose from "~icons/mdi/close"

export const Tile: Component<{ color: string }> = (props) => {
  const [success, setSuccess] = createSignal(false)
  const [error, setError] = createSignal(false)

  const ctx = useColorGuesserCtx()

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

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
      class="group relative w-full h-full rounded-lg"
      style={`background-color: ${props.color};`}
      onClick={onClick}
    >
      <div class={`
        absolute -inset-1.5 card border-accent pointer-events-none
        bg-white-12 opacity-0 group-hover:opacity-100 transition-all
        ${success() ? "!opacity-100 !bg-white-50" : ""}
        ${error() ? "!opacity-100 !bg-white-50" : ""}
      `}>
        <MdiCheck class={`absolute-center h-1/2 w-1/2 text-black-54 ${success() ? "opacity-100" : "opacity-0"} transition-opacity`} />
        <MdiClose class={`absolute-center h-1/2 w-1/2 text-black-54 ${error() ? "opacity-100" : "opacity-0"} transition-opacity`} />
      </div>
    </button>
  )
}

export const Board = () => {
  const ctx = useColorGuesserCtx()

  return (
    <Transition
      enterClass="opacity-0" exitToClass="opacity-0"
      enterActiveClass="transition-opacity" exitActiveClass="transition-opacity"
      mode="outin"
    >
      <Show when={ctx.game.colorGrid} keyed>{(colorGrid) => {
        const grid = ctx.game.difficulty?.grid // Make the grid size non-reactive to avoid bad looking animations on difficulty change
        return (
          <div class="h-full grid gap-3" style={`grid-template-columns: repeat(${grid}, minmax(0, 1fr));`}>
            <For each={colorGrid ?? []}>{(color) => <Tile color={color} />}</For>
          </div>
        )
      }
      }</Show>
    </Transition>
  )
}