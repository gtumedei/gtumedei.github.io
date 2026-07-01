import { Portal } from "solid-js/web"
import { button } from "~/components/ui/button"
import { Popover } from "~/components/ui/popover"
import TablerArrowBigDownFilled from "~icons/tabler/arrow-big-down-filled"
import TablerArrowBigLeftFilled from "~icons/tabler/arrow-big-left-filled"
import TablerArrowBigRightFilled from "~icons/tabler/arrow-big-right-filled"
import TablerArrowBigUpFilled from "~icons/tabler/arrow-big-up-filled"
import TablerDeviceGamepad3Filled from "~icons/tabler/device-gamepad-3-filled"

const KonamiJoypadPopover = () => {
  return (
    <Popover positioning={{ placement: "top" }} lazyMount unmountOnExit>
      <Popover.Trigger class={button({ variant: "subtle", size: "xs", shape: "circle" })}>
        <TablerDeviceGamepad3Filled class="text-lg" />
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content class="p-0 rounded-2xl border border-on-base/20 overflow-hidden">
            <KonamiJoypad />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover>
  )
}

const KonamiJoypad = () => {
  const dispatchKeyboardEvent = (key: string) => {
    const e = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      key,
    })
    document.body.dispatchEvent(e)
  }

  return (
    <div class="bg-base-200 [--ks:calc((100vw-2rem)/10)] sm:[--ks:48px]">
      <div class="h-[calc(var(--ks)*3.5)] flex">
        <div class="w-[calc(var(--ks)*3)] relative">
          <div class="h-[calc(var(--ks)*2)] w-[calc(var(--ks)*2)] absolute-center-x bottom-[calc(var(--ks)*0.5)]">
            <div class="h-[calc(var(--ks)*2)] w-[calc(var(--ks)*0.75)] bg-neutral rounded-sm absolute-center" />
            <div class="h-[calc(var(--ks)*0.75)] w-[calc(var(--ks)*2)] bg-neutral rounded-sm absolute-center" />
            <div class="flex flex-col items-center absolute inset-0">
              <button
                class="h-[calc(var(--ks)*0.75)] w-[calc(var(--ks)*0.75)] flex cursor-pointer group"
                onClick={() => dispatchKeyboardEvent("ArrowUp")}
              >
                <TablerArrowBigUpFilled class="text-[calc(var(--ks)*0.4)] leading-[calc(var(--ks)*0.4)] text-on-neutral/20 group-hover:text-on-neutral/50 transition-colors mx-auto mt-[calc(var(--ks)*0.1)] mb-auto" />
              </button>
              <div class="w-full flex justify-between">
                <button
                  class="h-[calc(var(--ks)*0.75)] w-[calc(var(--ks)*0.75)] flex cursor-pointer group"
                  onClick={() => dispatchKeyboardEvent("ArrowLeft")}
                >
                  <TablerArrowBigLeftFilled class="text-[calc(var(--ks)*0.4)] leading-[calc(var(--ks)*0.4)] text-on-neutral/20 group-hover:text-on-neutral/50 transition-colors ml-[calc(var(--ks)*0.1)] mr-auto my-auto" />
                </button>
                <button
                  class="h-[calc(var(--ks)*0.75)] w-[calc(var(--ks)*0.75)] flex cursor-pointer group"
                  onClick={() => dispatchKeyboardEvent("ArrowRight")}
                >
                  <TablerArrowBigRightFilled class="text-[calc(var(--ks)*0.4)] leading-[calc(var(--ks)*0.4)] text-on-neutral/20 group-hover:text-on-neutral/50 transition-colors ml-auto mr-[calc(var(--ks)*0.1)] my-auto" />
                </button>
              </div>
              <button
                class="h-[calc(var(--ks)*0.75)] w-[calc(var(--ks)*0.75)] flex cursor-pointer group"
                onClick={() => dispatchKeyboardEvent("ArrowDown")}
              >
                <TablerArrowBigDownFilled class="text-[calc(var(--ks)*0.4)] leading-[calc(var(--ks)*0.4)] text-on-neutral/20 group-hover:text-on-neutral/50 transition-colors mx-auto mt-auto mb-[calc(var(--ks)*0.1)]" />
              </button>
            </div>
          </div>
        </div>
        <div class="w-[calc(var(--ks)*3)] flex flex-col gap-[calc(var(--ks)*0.1875)]">
          <div class="h-[calc(var(--ks)*0.45)] w-full bg-accent-orange rounded-b-sm" />
          <div class="h-[calc(var(--ks)*0.45)] w-full bg-accent-pink rounded-sm" />
          <div class="h-[calc(var(--ks)*0.45)] w-full bg-accent-blue rounded-sm relative">
            <div class="w-full grid grid-cols-2 text-center text-xs sm:text-sm font-bold text-on-accent/70 absolute-center">
              <span class="cursor-default">SELECT</span>
              <span class="cursor-default">START</span>
            </div>
          </div>
          <div class="grow w-full flex justify-evenly items-center bg-neutral rounded-sm">
            <button class="h-[calc(var(--ks)*0.375)] w-(--ks) bg-on-neutral/70 hover:bg-on-neutral/50 transition-colors rounded-sm border border-neutral/20 cursor-pointer" />
            <button class="h-[calc(var(--ks)*0.375)] w-(--ks) bg-on-neutral/70 hover:bg-on-neutral/50 transition-colors rounded-sm border border-neutral/20 cursor-pointer" />
          </div>
          <div class="h-[calc(var(--ks)*0.45)] w-full bg-accent-teal rounded-t-sm" />
        </div>
        <div class="w-[calc(var(--ks)*4)] relative">
          <div class="flex gap-2 absolute-center-x bottom-[calc(var(--ks)*0.5)]">
            <div class="flex bg-neutral rounded-sm p-[calc(var(--ks)*0.1)] relative">
              <button
                class="h-(--ks) w-(--ks) bg-on-neutral/70 hover:bg-on-neutral/50 transition-colors rounded-full border border-on-neutral/20 shadow-sm cursor-pointer"
                onClick={() => dispatchKeyboardEvent("b")}
              />
              <span class="text-xs sm:text-sm font-bold text-accent absolute bottom-0 right-0 translate-y-full cursor-default">
                B
              </span>
            </div>
            <div class="flex bg-neutral rounded-sm p-[calc(var(--ks)*0.1)] relative">
              <button
                class="h-(--ks) w-(--ks) bg-on-neutral/70 hover:bg-on-neutral/50 transition-colors rounded-full border border-on-neutral/20 shadow-sm cursor-pointer"
                onClick={() => dispatchKeyboardEvent("a")}
              />
              <span class="text-xs sm:text-sm font-bold text-accent absolute bottom-0 right-0 translate-y-full cursor-default">
                A
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KonamiJoypadPopover
