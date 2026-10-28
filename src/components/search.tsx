import { Dialog, Listbox, useHotkey, useListCollection } from "@ark-ui/solid"
import { A, useNavigate } from "@solidjs/router"
import { pages } from "content-collections"
import Fuse from "fuse.js"
import { animate, stagger } from "motion"
import { Component, createEffect, createSignal, For, onMount } from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "tailwind-variants"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Kbd } from "~/components/ui/kbd"
import ContentIcon from "~/lib/content-icons"
import TablerArrowBack from "~icons/tabler/arrow-back"
import TablerCommand from "~icons/tabler/command"
import TablerSearch from "~icons/tabler/search"
import TablerWorldSearch from "~icons/tabler/world-search"
import TablerX from "~icons/tabler/x"

const [open, setOpen] = createSignal(false)

export const SearchTrigger: Component<{ variant: "base" | "neutral" }> = (props) => {
  useHotkey({ hotkey: "mod+K", action: () => setOpen(true) })

  return (
    <Button
      size="lg"
      variant={props.variant}
      class={cn("px-4 no-hover:pr-5 cursor-text!", props.variant == "base" && "header-pill")}
      onClick={() => setOpen(true)}
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
          <Dialog.Content class="w-full sm:max-w-md h-min mx-auto relative data-[state=open]:animate-in data-[state=open]:duration-100 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:duration-400 data-[state=closed]:fade-out-0">
            <SearchForm animate={animationTrigger()} onCloseClick={() => setOpen(false)} />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const SearchForm: Component<{ animate?: boolean; onCloseClick?: () => void }> = (props) => {
  // Things to add: homepage links, projects sections, projects items, tech sections, tech items, minigames, 404 page, easter egg
  const allItems = pages.items.map((it) => ({ ...it, value: it.path, type: "page" }))
  const rootItems = allItems.filter((it) => it.showInRootSearch)

  const fuse = new Fuse(allItems, {
    keys: [
      { name: "title", weight: 0.8 },
      { name: "description", weight: 0.2 },
    ],
  })

  const [query, setQuery] = createSignal("")

  const { collection, set: setItems } = useListCollection({
    initialItems: rootItems,
    groupBy: (it) => it.type,
  })

  createEffect(() => {
    const q = query()
    setItems(q == "" ? rootItems : fuse.search(q).map((res) => res.item))
  })

  const navigate = useNavigate()

  const initialHighlightedValue =
    rootItems.find((it) => it.path == location.pathname)?.path ?? rootItems[0]!.path
  const [highlightedValue, setHighlightedValue] = createSignal<string | null>(
    initialHighlightedValue,
  )
  // Required due to an Ark UI quirk where the data-highlighted property is not set upon first mounting the component
  onMount(async () => {
    await new Promise((r) => setTimeout(r, 0))
    setHighlightedValue(null)
    setHighlightedValue(initialHighlightedValue)
  })

  createEffect(() => {
    if (props.animate) {
      animate([
        [
          `[data-motion="search"]`,
          { opacity: 1, y: [10, 0], filter: ["blur(3px)", "blur(0)"] },
          { duration: 0.2, delay: stagger(0.1) },
        ],
      ])
    }
  })

  return (
    <>
      <Listbox.Root
        collection={collection()}
        value={[]}
        onValueChange={({ value }) => {
          navigate(value[0]!)
          setOpen(false)
        }}
        highlightedValue={highlightedValue()}
        onHighlightChange={({ highlightedValue }) => setHighlightedValue(highlightedValue)}
        loopFocus
      >
        <div class="relative mb-3" data-motion="search">
          <Listbox.Input
            asChild={(p) => <Input {...p()} variant="unstyled" size="lg" />}
            class="w-full pl-12 text-sm bg-base-100/90 dark:bg-base-200/90 border-on-base/10!"
            placeholder="Search anything"
            autoHighlight
            onInput={(e) => setQuery(e.target.value)}
          />
          <TablerSearch class="absolute-center-y left-4 pointer-events-none opacity-70" />
          <Button
            variant="ghost"
            size="sm"
            shape="circle"
            class="absolute-center-y right-2"
            onClick={props.onCloseClick}
          >
            <TablerX />
          </Button>
        </div>
        <Listbox.Content
          class="flex flex-col gap-3 py-6 -my-3 max-h-[calc(100vh-13rem)] overflow-y-auto no-scrollbars mask-y-from-[calc(100%-1.5rem)]"
          data-motion="search"
        >
          <For each={collection().group()}>
            {([region, items]) => (
              <Listbox.ItemGroup class="bg-base-100/90 dark:bg-base-200/90 flex flex-col gap-1 p-1 rounded-5 border border-on-base/10">
                <Listbox.ItemGroupLabel class="text-xs font-medium text-on-base/50 ml-3.5 mt-3 mb-1">
                  {region == "page" ? "Pages" : "Sections"}
                </Listbox.ItemGroupLabel>
                <For each={items}>
                  {(item) => (
                    <Listbox.Item
                      item={item}
                      highlightOnHover
                      asChild={(p) => <A {...p()} href={item.path} end activeClass="active" />}
                      class={cn(
                        "flex gap-3 pl-3 py-2.5 pr-2 rounded-4 hover:bg-neutral/5 active:bg-neutral/5 data-highlighted:bg-neutral/5 not-data-disabled:cursor-pointer transition-colors duration-100 group",
                      )}
                    >
                      <div
                        class={cn(
                          "shrink-0 text-base opacity-70 group-[.active]:text-accent group-[.active]:opacity-100",
                          item.type == "page" && "mt-0.5",
                        )}
                      >
                        <ContentIcon icon={item.icon} />
                      </div>
                      <div>
                        <Listbox.ItemText
                          class={cn("font-medium mb-0.5", item.type == "section" && "text-sm")}
                        >
                          {item.title}
                        </Listbox.ItemText>
                        {item.description && (
                          <p class="text-sm text-on-base/70 tall-lines">{item.description}</p>
                        )}
                        {/* {item.page && <p class="text-sm text-on-base/70">{item.page}</p>} */}
                      </div>
                    </Listbox.Item>
                  )}
                </For>
              </Listbox.ItemGroup>
            )}
          </For>
          <Listbox.Empty class="bg-base-100/90 dark:bg-base-200/90 flex flex-col justify-center items-center px-4 py-12 rounded-5 border border-on-base/10">
            <div class="size-8 flex bg-neutral/5 rounded-4 mb-1">
              <TablerWorldSearch class="text-on-base/70 m-auto" />
            </div>
            <span class="text-sm text-on-base/70">No results</span>
          </Listbox.Empty>
        </Listbox.Content>
        <div
          class="no-hover:hidden h-10 flex justify-between items-center gap-2 bg-base-100/90 dark:bg-base-200/90 px-4 border border-on-base/10 rounded-full mt-3"
          data-motion="search"
        >
          <div class="flex items-center gap-1.5">
            <Kbd.Item>Esc</Kbd.Item>
            <p class="text-sm">Close</p>
          </div>
          <div class="flex items-center gap-1.5">
            <p class="text-sm">Open</p>
            <Kbd.Item>
              <TablerArrowBack />
            </Kbd.Item>
          </div>
        </div>
      </Listbox.Root>
    </>
  )
}
