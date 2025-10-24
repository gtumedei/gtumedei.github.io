import { Portal } from "solid-js/web"
import { button } from "~/components/ui/button"
import { Popover } from "~/components/ui/popover"
import TablerArrowBigDownFilled from "~icons/tabler/arrow-big-down-filled"
import TablerArrowBigLeftFilled from "~icons/tabler/arrow-big-left-filled"
import TablerArrowBigRightFilled from "~icons/tabler/arrow-big-right-filled"
import TablerArrowBigUpFilled from "~icons/tabler/arrow-big-up-filled"
import TablerDeviceGamepad3Filled from "~icons/tabler/device-gamepad-3-filled"

const KonamiJoypadPopover = () => {
  const dispatchKeyboardEvent = (key: string) => {
    const e = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      key,
    })
    document.body.dispatchEvent(e)
  }

  return (
    <Popover positioning={{ placement: "top" }} lazyMount unmountOnExit>
      <Popover.Trigger class={button({ variant: "subtle", size: "xs", shape: "circle" })}>
        <TablerDeviceGamepad3Filled class="text-lg" />
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content class="bg-gradient-to-b from-base-200 to-base-300 p-0 border-2 border-on-base/20 origin-top">
            <div class="h-[120px] flex">
              <div class="w-[100px] relative">
                <div class="h-16 w-16 absolute-center-x bottom-5.5">
                  <div class="h-16 w-6 bg-neutral rounded-sm absolute-center"></div>
                  <div class="h-6 w-16 bg-neutral rounded-sm absolute-center"></div>
                  <div class="flex flex-col items-center absolute inset-0">
                    <button
                      class="h-6 w-6 flex cursor-pointer group"
                      onClick={() => dispatchKeyboardEvent("ArrowUp")}
                    >
                      <TablerArrowBigUpFilled class="text-xs text-on-neutral/20 group-hover:text-on-neutral/50 transition-colors mx-auto mt-1 mb-auto" />
                    </button>
                    <div class="w-full flex justify-between">
                      <button
                        class="h-6 w-6 flex cursor-pointer group"
                        onClick={() => dispatchKeyboardEvent("ArrowLeft")}
                      >
                        <TablerArrowBigLeftFilled class="text-xs text-on-neutral/20 group-hover:text-on-neutral/50 transition-colors ml-1 mr-auto my-auto" />
                      </button>
                      <button
                        class="h-6 w-6 flex cursor-pointer group"
                        onClick={() => dispatchKeyboardEvent("ArrowRight")}
                      >
                        <TablerArrowBigRightFilled class="text-xs text-on-neutral/20 group-hover:text-on-neutral/50 transition-colors ml-auto mr-1 my-auto" />
                      </button>
                    </div>
                    <button
                      class="h-6 w-6 flex cursor-pointer group"
                      onClick={() => dispatchKeyboardEvent("ArrowDown")}
                    >
                      <TablerArrowBigDownFilled class="text-xs text-on-neutral/20 group-hover:text-on-neutral/50 transition-colors mx-auto mt-auto mb-1" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-[100px] flex flex-col gap-1.5">
                <div class="h-4 w-full bg-neutral/20 rounded-b-sm" />
                <div class="h-4 w-full bg-neutral/20 rounded-sm" />
                <div class="h-4 w-full bg-neutral/20 rounded-sm relative">
                  <div class="w-full grid grid-cols-2 text-center text-xs font-bold text-red-500 absolute-center">
                    <span class="cursor-default">SELECT</span>
                    <span class="cursor-default">START</span>
                  </div>
                </div>
                <div class="grow w-full flex justify-evenly items-center bg-neutral rounded-sm">
                  <button class="h-3 w-8 bg-on-neutral hover:bg-on-neutral/90 transition-colors rounded-sm border border-neutral/20 cursor-pointer" />
                  <button class="h-3 w-8 bg-on-neutral hover:bg-on-neutral/90 transition-colors rounded-sm border border-neutral/20 cursor-pointer" />
                </div>
                <div class="h-4 w-full bg-neutral/20 rounded-t-sm" />
              </div>
              <div class="w-[132px] relative">
                <div class="flex gap-1 absolute-center-x bottom-4.5">
                  <div class="flex bg-neutral rounded-sm p-1 relative">
                    <button
                      class="h-8 w-8 bg-red-500 hover:bg-red-600 transition-colors rounded-full border border-on-neutral/10 shadow-sm cursor-pointer"
                      onClick={() => dispatchKeyboardEvent("b")}
                    />
                    <span class="text-xs font-bold text-red-500 absolute bottom-0 right-0 translate-y-full cursor-default">
                      B
                    </span>
                  </div>
                  <div class="flex bg-neutral rounded-sm p-1 relative">
                    <button
                      class="h-8 w-8 bg-red-500 hover:bg-red-600 transition-colors rounded-full border border-on-neutral/10 shadow-sm cursor-pointer"
                      onClick={() => dispatchKeyboardEvent("a")}
                    />
                    <span class="text-xs font-bold text-red-500 absolute bottom-0 right-0 translate-y-full cursor-default">
                      A
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover>
  )
}

export default KonamiJoypadPopover
