import { button } from "~/components/ui/button"
import cn from "~/lib/cn"
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

  return (
    <div class="header-pill w-30.5 flex flex-col rounded-full absolute-center-x bottom-12">
      <button
        class="flex px-2 pt-2 pb-1 outline-none cursor-pointer group"
        onClick={() => dispatchKeyboardEvent("ArrowUp")}
      >
        <div
          class={cn(
            button({ variant: "subtle", size: "xl", shape: "circle" }),
            "text-xl group-hover:bg-accent/15 group-hover:text-accent group-active:bg-accent/15 group-active:text-accent mx-auto"
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
            "text-xl group-hover:bg-accent/15 group-hover:text-accent group-active:bg-accent/15 group-active:text-accent mx-auto"
          )}
        >
          <TablerArrowBigDown />
        </div>
      </button>
    </div>
  )
}

export default RacingIconControls
