import type { Component } from "solid-js"
import AspectRatio from "~/components/ui/aspect-ratio"
import tooltip from "~/lib/tooltip"
import MdiMenu from "~icons/mdi/menu"

tooltip

const Toolbar = () => {
  return (
    <div class="w-full flex items-center p-2 rounded-xl border">
      <p class="ml-3 flex-grow">99 moves</p>
      <button class="btn btn-icon" use:tooltip={[() => "Game Settings", "top"]}>
        <MdiMenu />
      </button>
    </div>
  )
}

const EmptyGame: Component = () => {
  return (
    <>
      <AspectRatio w={1} h={1}>
        <div class="h-full w-full bg-red-300" />
      </AspectRatio>
      <Toolbar />
    </>
  )
}

export default EmptyGame
