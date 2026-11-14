import { Dialog, useHotkey } from "@ark-ui/solid"
import { Component, Show, createSignal, onMount } from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "tailwind-variants"
import { Button } from "~/components/ui/button"
import { Kbd } from "~/components/ui/kbd"
import TablerCommand from "~icons/tabler/command"
import TablerSearch from "~icons/tabler/search"

// Lazy load search-dialog-content to prevent pulling in Fuse.js and all content collections on each page

const [open, _setOpen] = createSignal(false)
const setOpen = async (open: boolean) => {
  if (open) {
    if (!Content()) await loadContent()
    _setOpen(true)
  } else _setOpen(false)
}

const [Content, setContent] =
  createSignal<Component<{ animate?: boolean; onCloseClick?: () => void }>>()

const loadContent = () => import("./search-dialog-content").then((m) => setContent(() => m.default))

export const SearchTrigger: Component<{ variant: "base" | "neutral" }> = (props) => {
  useHotkey({ hotkey: "mod+K", action: () => setOpen(true) })

  onMount(() => {
    const idle = (cb: () => void) =>
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(cb)
        : window.setTimeout(cb, 2000)
    idle(() => loadContent())
  })

  return (
    <Button
      size="lg"
      variant={props.variant}
      class={cn("px-4 no-hover:pr-5 cursor-text!", props.variant == "base" && "header-pill")}
      onClick={() => setOpen(true)}
      onPointerEnter={() => loadContent()}
      onFocus={() => loadContent()}
    >
      <TablerSearch />
      <span class="text-sm">
        Search
        {props.variant == "neutral" && " website"}
      </span>
      <Kbd>
        <Kbd.Item variant={props.variant}>
          {navigator.platform.startsWith("Mac") ? <TablerCommand /> : "Ctrl"}
        </Kbd.Item>
        <Kbd.Item variant={props.variant}>K</Kbd.Item>
      </Kbd>
    </Button>
  )
}

export const SearchDialog = () => {
  const [animationTrigger, setAnimationTrigger] = createSignal(false)

  return (
    <Dialog.Root
      open={open()}
      onOpenChange={({ open }) => setOpen(open)}
      onEnterComplete={() => setAnimationTrigger(true)}
      lazyMount
      unmountOnExit
    >
      <Portal>
        <Dialog.Backdrop class="backdrop-blur-sm fixed top-0 left-0 z-50 h-screen w-screen data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Backdrop class="bg-linear-to-b from-base-300/70 via-base-300/60 to-base-300/10 dark:from-base-100/70 dark:via-base-100/60 dark:to-base-100/10 fixed top-0 left-0 z-50 h-screen w-screen pointer-events-auto data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=open]:slide-in-from-top data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top" />
        <Dialog.Positioner class="flex p-6 sm:py-12 fixed top-0 left-0 z-50 h-screen w-screen">
          <Dialog.Content class="w-full sm:max-w-md h-min mx-auto relative outline-none data-[state=open]:animate-in data-[state=open]:duration-100 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:duration-400 data-[state=closed]:fade-out-0">
            <Show when={Content()} keyed>
              {(Content) => (
                <Content animate={animationTrigger()} onCloseClick={() => setOpen(false)} />
              )}
            </Show>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
