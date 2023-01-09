import type { Component, ParentComponent } from "solid-js"
import { BoardContainer } from "~/components/ui/game"
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

const AspectRatioConstraint: ParentComponent = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

const EmptyGame: Component = () => {
  return (
    <>
      <AspectRatioConstraint>
        <div class="h-full w-full bg-red-300" />
      </AspectRatioConstraint>
      <Toolbar />
    </>
  )
}

export default EmptyGame
