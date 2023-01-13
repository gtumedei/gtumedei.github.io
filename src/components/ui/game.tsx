import { type Component, /* createSignal, mergeProps, onMount, */ type ParentComponent } from "solid-js"
import tooltip from "~/lib/tooltip"
import MdiArrowLeftTop from "~icons/mdi/arrow-left-top"
import MdiCardsDiamondOutline from "~icons/mdi/cards-diamond-outline"

tooltip

export const GameHeader: Component<{ title: string }> = (props) => {
  return (
    <header class="w-full flex items-center gap-3 p-2 rounded-xl border">
      <a href="/games" class="btn btn-icon" use:tooltip={[() => "Back to Games", "bottom"]}>
        <MdiArrowLeftTop />
      </a>
      <h1 class="section-subheading flex-grow">{props.title}</h1>
      <a href="/" class="btn btn-icon m-auto" use:tooltip={[() => "Go Home", "bottom"]}>
        <MdiCardsDiamondOutline />
      </a>
    </header>
  )
}

export const BoardContainer: ParentComponent = (props) => (
  <div class="w-full flex-grow relative">
    <div class="absolute-center w-[min(calc(100vw-3rem),calc(100vh-13.85rem))] aspect-square">
      {props.children}
    </div>
  </div>
)

/* export const BoardContainer: ParentComponent<{
  aspectClass?: string
  excessSpace?: string
}> = (passedProps) => {
  const props = mergeProps({ aspectClass: "aspect-square", excessSpace: "12.85rem" }, passedProps)

  let container!: HTMLDivElement
  const [fullDimension, setFullDimension] = createSignal<"h-full" | "w-full">("h-full")

  // Constraint height for portrait aspect ratios, width for landscape ones
  const ratioRegex = /aspect-\[(\d*)\/(\d*)\]/gm
  const matches = ratioRegex.exec(props.aspectClass) ?? []
  const style = matches.length == 3 && +matches[1] < +matches[2]
    ? `height: min(calc(100vw - 3rem), calc(100vh - ${props.excessSpace}))`
    : `width: min(calc(100vw - 3rem), calc(100vh - ${props.excessSpace}))`

  onMount(() => {
    const { clientHeight, clientWidth } = container
    setFullDimension(clientWidth < clientHeight ? "w-full" : "h-full")
    console.log(clientHeight, clientWidth, fullDimension())
  })

  return (
    <div ref={container} class="w-full flex-grow relative">
      <div
        class={`absolute-center ${props.aspectClass} ${fullDimension()}`}
      >{props.children}</div>
    </div>
  )
} */
