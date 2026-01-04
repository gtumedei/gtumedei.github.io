import { createSignal, onCleanup, onMount } from "solid-js"
import { button } from "~/components/ui/button"
import { cn } from "tailwind-variants"
import TablerArrowBigDown from "~icons/tabler/arrow-big-down"
import TablerArrowBigUp from "~icons/tabler/arrow-big-up"

const RacingIconControls = () => {
  const dispatchKeyboardEvent = (key: string) => {
    const e = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      key,
    })
    document.body.dispatchEvent(e)
  }

  const [upActive, setUpActive] = createSignal(false)
  let upTimeout: NodeJS.Timeout | undefined = undefined
  const [downActive, setDownActive] = createSignal(false)
  let downTimeout: NodeJS.Timeout | undefined = undefined
  onMount(() => {
    const onKeydown = async (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (["w", "arrowup"].includes(key)) {
        clearTimeout(upTimeout)
        setUpActive(true)
        upTimeout = setTimeout(() => setUpActive(false), 200)
      }
      if (["s", "arrowdown"].includes(key)) {
        clearTimeout(downTimeout)
        setDownActive(true)
        downTimeout = setTimeout(() => setDownActive(false), 200)
      }
    }
    document.addEventListener("keydown", onKeydown)
    onCleanup(() => document.removeEventListener("keydown", onKeydown))
  })

  return (
    <div class="header-pill w-30.5 flex flex-col rounded-full absolute-center-x bottom-12">
      <button
        class="flex px-2 pt-2 pb-1 outline-none cursor-pointer group"
        onClick={() => dispatchKeyboardEvent("ArrowUp")}
      >
        <div
          class={cn(
            button({ variant: "subtle", size: "xl", shape: "circle" }),
            "text-xl group-hover:bg-accent/15 group-hover:text-accent mx-auto",
            upActive() && "bg-accent/15 text-accent"
          )}
        >
          <TablerArrowBigUp />
        </div>
      </button>
      <button
        class="flex px-2 pt-1 pb-2 outline-none cursor-pointer group"
        onClick={() => dispatchKeyboardEvent("ArrowDown")}
      >
        <div
          class={cn(
            button({ variant: "subtle", size: "xl", shape: "circle" }),
            "text-xl group-hover:bg-accent/15 group-hover:text-accent mx-auto",
            downActive() && "bg-accent/15 text-accent"
          )}
        >
          <TablerArrowBigDown />
        </div>
      </button>
    </div>
  )
}

export default RacingIconControls
