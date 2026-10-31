import { Listbox, useListCollection } from "@ark-ui/solid"
import { A, useNavigate } from "@solidjs/router"
import {
  Minigames,
  minigames,
  Pages,
  pages,
  personalLinks,
  Projects,
  projects,
} from "content-collections"
import Fuse from "fuse.js"
import { animate, stagger } from "motion"
import { Component, createEffect, createSignal, For, onMount } from "solid-js"
import { cn } from "tailwind-variants"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Kbd } from "~/components/ui/kbd"
import ContentIcon from "~/lib/content-icons"
import TablerArrowBack from "~icons/tabler/arrow-back"
import TablerChevronRight from "~icons/tabler/chevron-right"
import TablerSearch from "~icons/tabler/search"
import TablerWorldSearch from "~icons/tabler/world-search"
import TablerX from "~icons/tabler/x"

type SearchEntry = { value: string; label: string; search: string } & (
  | ({ type: "page" } & Pages["items"][number])
  | ({ type: "project" } & Projects["categories"][number]["items"][number])
  | ({ type: "minigame" } & Minigames["items"][number])
  | { type: "section"; pageTitle: string }
  | { type: "link" }
)

// Things to add: tech sections, easter egg
const allItems: SearchEntry[] = [
  // Pages
  ...pages.items.map<SearchEntry>((it) => ({
    ...it,
    value: it.path,
    label: it.title,
    search: it.title,
    type: "page",
  })),
  // Page sections
  {
    pageTitle: "Projects",
    value: "/projects#highlights",
    label: "Highlights",
    search: "Projects Highlights",
    type: "section",
  },
  ...projects.categories.map<SearchEntry>((c) => ({
    pageTitle: "Projects",
    value: `/projects#${c.name.toLowerCase()}`,
    label: c.name,
    search: `Projects ${c.name}`,
    type: "section",
  })),
  // Projects
  ...projects.categories
    .flatMap((c) => c.items)
    .map<SearchEntry>((it) => ({
      ...it,
      value: `/projects#${it.slug}`,
      label: it.name,
      search: `Projects ${it.name}`,
      type: "project",
    })),
  // Minigames
  ...minigames.items.map<SearchEntry>((it) => ({
    ...it,
    value: `/minigames/${it.slug}`,
    label: it.name,
    search: `Minigames ${it.name}`,
    type: "minigame",
  })),
  // Links
  ...personalLinks.items.map<SearchEntry>((it) => ({
    ...it,
    value: it.href,
    label: it.name,
    search: it.name,
    type: "link",
  })),
  // TODO: add easter egg
]

const rootItems = allItems.filter((it) => it.type == "page" && it.showInRootSearch)

const fuse = new Fuse(allItems, { keys: ["search"] })

const typeToString: Record<SearchEntry["type"], string> = {
  page: "Pages",
  project: "Projects",
  minigame: "Minigames",
  section: "Sections",
  link: "Link",
}

const SearchDialogContent: Component<{
  animate?: boolean
  onCloseClick?: () => void
}> = (props) => {
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
    rootItems.find((it) => it.value == location.pathname)?.value ?? rootItems[0]!.value
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
          props.onCloseClick?.()
        }}
        highlightedValue={highlightedValue()}
        onHighlightChange={({ highlightedValue }) => setHighlightedValue(highlightedValue)}
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
            {([group, items]) => (
              <Listbox.ItemGroup class="bg-base-100/90 dark:bg-base-200/90 flex flex-col gap-1 p-1 rounded-5 border border-on-base/10">
                <Listbox.ItemGroupLabel class="text-xs font-medium text-on-base/50 ml-3 mt-3 mb-1">
                  {typeToString[group as keyof typeof typeToString]}
                </Listbox.ItemGroupLabel>
                <For each={items}>
                  {(item) => (
                    <Listbox.Item
                      item={item}
                      highlightOnHover
                      asChild={(p) => <A {...p()} href={item.value} end activeClass="active" />}
                      class={cn(
                        "flex items-center gap-3 pl-3 py-2.5 pr-2 rounded-4 hover:bg-neutral/5 active:bg-neutral/5 data-highlighted:bg-neutral/5 not-data-disabled:cursor-pointer transition-colors duration-100 group",
                      )}
                    >
                      {item.type == "page" && (
                        <>
                          <div class="shrink-0 text-base opacity-70 group-[.active]:text-accent group-[.active]:opacity-100">
                            <ContentIcon icon={item.icon} />
                          </div>
                          <Listbox.ItemText class="text-sm font-medium">
                            {item.title}
                          </Listbox.ItemText>
                        </>
                      )}
                      {item.type == "section" && (
                        <Listbox.ItemText class="text-sm flex items-center gap-1">
                          <span class="opacity-70">{item.pageTitle}</span>
                          <TablerChevronRight class="size-4 inline-flex opacity-50" /> {item.label}
                        </Listbox.ItemText>
                      )}
                      {(item.type == "project" ||
                        item.type == "minigame" ||
                        item.type == "link") && (
                        <Listbox.ItemText class="text-sm">{item.label}</Listbox.ItemText>
                      )}
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

export default SearchDialogContent
