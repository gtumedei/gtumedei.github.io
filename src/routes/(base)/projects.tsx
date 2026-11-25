import { A, useLocation } from "@solidjs/router"
import { projects, Projects } from "content-collections"
import { animate, stagger } from "motion"
import { Component, createMemo, For, onMount, Show } from "solid-js"
import { Portal } from "solid-js/web"
import Meta from "~/components/meta"
import { Button } from "~/components/ui/button"
import { Menu } from "~/components/ui/menu"
import { useAchievements } from "~/lib/achievements"
import { useAchievementsProgress } from "~/lib/achievements/progress"
import { createBatchedInViewAnimation, horizontalHeadingAnimation } from "~/lib/animation"
import ContentIcon from "~/lib/content-icons"
import TablerBracketsAngle from "~icons/tabler/brackets-angle"
import TablerDots from "~icons/tabler/dots"
import TablerFileText from "~icons/tabler/file-text"
import TablerGrid3x3 from "~icons/tabler/grid-3x3"
import TablerLink from "~icons/tabler/link"
import TablerStack2 from "~icons/tabler/stack-2"
import TablerWorld from "~icons/tabler/world"

type Project = Projects["categories"][number]["items"][number]

const ProjectsPage = () => {
  const location = useLocation()
  const filter = createMemo(() => {
    const hash = location.hash.substring(1)
    if (projects.categories.map((c) => c.slug).includes(hash)) return hash
    return "all"
  })

  let firstGridMount = true

  onMount(() => {
    animate([
      horizontalHeadingAnimation(),
      [
        `[data-motion="project-highlight"]`,
        { opacity: 1, y: [10, 0], filter: ["blur(3px)", "blur(0)"] },
        { duration: 0.4, delay: stagger(0.15, { startDelay: 0.3 }), at: "<" },
      ],
    ])
  })

  return (
    <>
      <Meta
        title="Projects"
        description="I'm always building stuff. You can find my research, freelance, and personal projects listed inside here."
      />
      <div class="lg:w-2/3 px-6 mb-14">
        <h1 class="font-heading text-4xl sm:text-5xl mb-6" data-motion="heading">
          Projects
        </h1>
        <p class="text-on-base/70 tall-lines mb-8" data-motion="heading">
          Here are most of the things I've spent time on, whether it's something I created,
          modified, broke, or rebuilt along the way.
        </p>
        <div
          class="min-w-0 flex gap-2 px-6 -mx-6 overflow-x-auto no-scrollbars"
          data-motion="heading"
        >
          <Button
            asChild={(p) => <A {...p()} href="/projects" />}
            size="xs"
            variant={filter() == "all" ? "neutral" : "base"}
            class="pr-4"
          >
            <TablerStack2 /> All
          </Button>
          <For each={projects.categories}>
            {(category) => (
              <Button
                asChild={(p) => <A {...p()} href={`/projects#${category.slug}`} />}
                size="xs"
                variant={filter() == category.slug ? "neutral" : "base"}
                class="pr-4"
              >
                <ContentIcon icon={category.icon} /> {category.name}
              </Button>
            )}
          </For>
        </div>
      </div>
      {/* Re-render and re-animate the whole grid when the filter changes */}
      <Show when={filter()} keyed>
        {(filter) => {
          const startDelay = firstGridMount ? 0.4 : 0
          firstGridMount = false
          return <ProjectsGrid filter={filter} startDelay={startDelay} />
        }}
      </Show>
    </>
  )
}

const ProjectsGrid: Component<{ filter: string; startDelay: number }> = (props) => {
  createBatchedInViewAnimation(`[data-motion="section-heading"], [data-motion="project-item"]`, {
    startDelay: props.startDelay,
  })

  return (
    <div class="mx-6 max-md:not-last:border-b border-on-base/10 max-md:pb-10 mb-16 md:mb-14">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 -mx-6">
        <For
          each={projects.categories
            .filter((c) => props.filter == "all" || props.filter == c.slug)
            .flatMap((c) => c.items)}
        >
          {(project) => <ProjectItem project={project} />}
        </For>
      </div>
    </div>
  )
}

const ProjectItem: Component<{ project: Project }> = (props) => {
  const mainUrl = () => props.project.links?.[0]?.url ?? ""

  const otherLinks = () => (props.project.links ? props.project.links.slice(1) : [])

  const { unlockAchievement } = useAchievements()
  const { progress, setProgress } = useAchievementsProgress()
  const onOpen = () => {
    if (progress.deepDiver.clickedLinks.includes(mainUrl())) return
    setProgress("deepDiver", "clickedLinks", (v) => [...v, mainUrl()])
    if (progress.deepDiver.clickedLinks.length == 5) unlockAchievement("DEEP_DIVER")
  }

  return (
    <div class="md:rounded-5 relative" data-motion="project-item">
      <a
        id={props.project.slug}
        href={mainUrl()}
        target="_blank"
        class="size-full flex flex-col hover:bg-neutral/5 active:bg-neutral/5 transition-colors duration-500 md:rounded-5 p-6 focus-ring scroll-m-12 group"
        onAuxClick={(e) => {
          if (e.button == 1) onOpen()
        }}
        onClick={onOpen}
      >
        <div class="bg-base-200 dark:bg-base-300 p-1.5 rounded-full border border-on-base/10 shadow shadow-black/5 mr-auto mb-6">
          {props.project.iconUrl != "#" ? (
            <img
              src={props.project.iconUrl}
              alt=""
              class="w-8 h-8 rounded-full border border-on-base/5 object-cover"
            />
          ) : (
            <div class="size-8 flex rounded-full bg-neutral/10">
              <TablerGrid3x3 class="text-on-base/70 m-auto" />
            </div>
          )}
        </div>
        <h3 class="text-lg font-medium mb-3">{props.project.name}</h3>
        <p class="md:text-sm text-on-base/70 tall-lines mb-4">{props.project.description}</p>
        <p class="min-w-0 inline-flex items-center gap-3 md:text-sm font-medium text-on-base/50 group-hover:text-accent group-active:text-accent transition-colors pr-8">
          <TablerLink class="shrink-0" />
          <span class="truncate">{getHostname(mainUrl())}</span>
        </p>
      </a>
      {otherLinks().length > 0 && <ProjectLinksMenu links={otherLinks()} />}
    </div>
  )
}

const ProjectLinksMenu: Component<{ links: Project["links"] }> = (props) => {
  return (
    <Menu positioning={{ placement: "bottom-end" }} lazyMount unmountOnExit>
      <Menu.Trigger
        asChild={(p) => (
          <Button
            {...p()}
            variant="ghost"
            size="sm"
            shape="square"
            class="text-on-base/50 -my-2 -mr-2 data-[state=open]:bg-neutral/5 absolute bottom-6 right-6"
          />
        )}
      >
        <TablerDots />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content class="min-w-40 z-15">
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Project Links</Menu.ItemGroupLabel>
              <For each={props.links}>
                {(link) => (
                  <Menu.Item
                    value={link.url}
                    asChild={(p) => <a {...p()} href={link.url} target="_blank" />}
                    class="max-md:text-base"
                  >
                    {link.type == "website" && <TablerWorld />}
                    {link.type == "article" && <TablerFileText />}
                    {link.type == "code" && <TablerBracketsAngle />}
                    {getHostname(link.url)}
                  </Menu.Item>
                )}
              </For>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu>
  )
}

const getHostname = (urlString: string) => {
  try {
    const url = new URL(urlString)
    return url.hostname
  } catch {
    return urlString
  }
}

export default ProjectsPage
