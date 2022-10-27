import type { Component, ParentComponent } from "solid-js"
import tooltip from "~/lib/tooltip"
import MdiArrowLeftTop from "~icons/mdi/arrow-left-top"
import MdiCardsDiamondOutline from "~icons/mdi/cards-diamond-outline"

tooltip

export const GameHeader: Component<{ title: string }> = (props) => {
  return (
    <header class="w-full flex items-center gap-3 p-2 rounded-xl border">
      <a href="/games" class="btn icon" use:tooltip={[() => "Back to Games", "bottom"]}>
        <MdiArrowLeftTop />
      </a>
      <h1 class="section-subheading flex-grow">{props.title}</h1>
      <a href="/" class="btn icon m-auto" use:tooltip={[() => "Go Home", "bottom"]}>
        <MdiCardsDiamondOutline />
      </a>
    </header>
  )
}

export const BoardContainer: ParentComponent = (props) => (
  <div class="w-full flex-grow relative">
    <div class="absolute-center portrait:w-full landscape:h-full aspect-square">
      {props.children}
    </div>
  </div>
)
