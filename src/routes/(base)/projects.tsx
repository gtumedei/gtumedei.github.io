import { Carousel } from "@ark-ui/solid"
import { animate, stagger } from "motion"
import { Component, For, Index, onMount } from "solid-js"
import { Portal } from "solid-js/web"
import Meta from "~/components/meta"
import PageHeadingIcon from "~/components/page-heading-icon"
import { Button } from "~/components/ui/button"
import { Menu } from "~/components/ui/menu"
import { useAchievements } from "~/lib/achievements"
import { useAchievementsProgress } from "~/lib/achievements/progress"
import { createBatchedInViewAnimation } from "~/lib/animation"
import projectCategories, { Project } from "~/lib/content/projects"
import TablerArrowNarrowLeft from "~icons/tabler/arrow-narrow-left"
import TablerArrowNarrowRight from "~icons/tabler/arrow-narrow-right"
import TablerBracketsAngle from "~icons/tabler/brackets-angle"
import TablerDots from "~icons/tabler/dots"
import TablerFileText from "~icons/tabler/file-text"
import TablerGrid3x3 from "~icons/tabler/grid-3x3"
import TablerLink from "~icons/tabler/link"
import TablerWorld from "~icons/tabler/world"

const ProjectsPage = () => {
  onMount(() => {
    animate([
      [`[data-motion="image"]`, { opacity: 1, scale: [0.9, 1] }, { duration: 0.4 }],
      [
        `[data-motion="heading"]`,
        { opacity: 1, x: [-10, 0] },
        { duration: 0.4, delay: stagger(0.15), at: "<" },
      ],
      [
        `[data-motion="project-highlight"]`,
        { opacity: 1, y: [10, 0] },
        { duration: 0.4, delay: stagger(0.15) },
      ],
    ])
  })
  createBatchedInViewAnimation(`[data-motion="section-heading"], [data-motion="project-item"]`)

  const pageCount = 6

  return (
    <>
      <Meta
        title="Projects"
        description="I'm always building stuff. You can find my research, freelance, and personal projects listed inside here."
      />
      <div class="lg:w-2/3 px-6 mb-20">
        <PageHeadingIcon data-motion="image">
          <TablerGrid3x3 />
        </PageHeadingIcon>
        <h1 class="font-heading text-4xl sm:text-5xl mb-6" data-motion="heading">
          Projects
        </h1>
        <p class="text-on-base/70 tall-lines" data-motion="heading">
          This page collects the projects I've poured time into, from research and work to personal
          experiments. Check out what I created, modified, broke, or rebuilt along the way.
        </p>
      </div>
      <Carousel.Root
        slideCount={pageCount}
        spacing="1.5rem"
        padding="var(--group-padding)"
        autoSize
        class="flex flex-col pb-8 mb-12"
      >
        <div class="flex justify-between mx-6 mb-11 -mt-0.5">
          <h2 class="inline-block font-semibold text-xl" data-motion="heading">
            Highlights
          </h2>
          <div class="flex gap-1" data-motion="heading">
            <Carousel.PrevTrigger
              asChild={(p) => (
                <Button {...p()} variant="ghost" size="xs" shape="square" class="text-base" />
              )}
            >
              <TablerArrowNarrowLeft />
            </Carousel.PrevTrigger>
            <Carousel.NextTrigger
              asChild={(p) => (
                <Button {...p()} variant="ghost" size="xs" shape="square" class="text-base" />
              )}
            >
              <TablerArrowNarrowRight />
            </Carousel.NextTrigger>
          </div>
        </div>
        <div class="max-w-screen md:-mx-6 lg:-mx-10 xl:-mx-14 [--group-padding:1.5rem] md:[--group-padding:3rem] lg:[--group-padding:4rem] xl:[--group-padding:5rem]">
          <Carousel.Control>
            <Carousel.ItemGroup>
              <Index each={Array.from({ length: pageCount })}>
                {(_, index) => (
                  <Carousel.Item index={index} class="snap-always">
                    <div
                      class="w-[calc(100vw-4.5rem)] max-sm:max-w-96 sm:w-80 flex flex-col justify-end p-2 rounded-3xl border border-on-base/10 relative"
                      data-motion="project-highlight"
                    >
                      <div class="aspect-4/3 bg-base-300 rounded-2xl mb-2" />
                      {/* <img
                        src="/go-droid-transparent.png"
                        alt=""
                        class="aspect-4/3 rounded-2xl mb-2"
                      /> */}
                      <div class="p-4">
                        <h3 class="text-lg font-medium mb-3">Project name</h3>
                        <p class="md:text-sm text-on-base/70 tall-lines mb-4">
                          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!
                        </p>
                        <div class="flex justify-between gap-6">
                          <a
                            href="#"
                            class="min-w-0 flex items-center gap-3 md:text-sm font-medium text-on-base/50 hover:text-accent active:text-accent transition-colors"
                          >
                            <TablerLink class="shrink-0" />
                            <span class="truncate">domain.com</span>
                          </a>
                          {/* <ProjectLinksMenu links={[]} /> */}
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>
                )}
              </Index>
            </Carousel.ItemGroup>
          </Carousel.Control>
        </div>
      </Carousel.Root>
      <For each={projectCategories}>
        {(category) => (
          <div class="mx-6 max-md:not-last:border-b border-on-base/10 pb-8 mb-20">
            <h2 class="inline-block font-semibold text-xl mb-6" data-motion="section-heading">
              {category.name}
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 -mx-6">
              <For each={category.projects}>{(project) => <ProjectItem project={project} />}</For>
            </div>
          </div>
        )}
      </For>
    </>
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
    <div class="md:rounded-3xl group relative" data-motion="project-item">
      <a
        href={mainUrl()}
        target="_blank"
        class="flex flex-col group-hover:bg-on-base/5 group-active:bg-on-base/5 transition-colors duration-500 md:rounded-3xl p-6 focus-ring"
        onAuxClick={(e) => {
          if (e.button == 1) onOpen()
        }}
        onClick={onOpen}
      >
        <div class="bg-base-200 dark:bg-base-300 p-1.5 rounded-full border border-on-base/10 shadow shadow-black/5 mr-auto mb-6">
          {props.project.iconUrl != "#" ? (
            <img src={props.project.iconUrl} alt="" class="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div class="w-8 h-8 flex rounded-full bg-on-base" />
          )}
        </div>
        <h3 class="text-lg font-medium mb-3">{props.project.name}</h3>
        <p class="md:text-sm text-on-base/70 tall-lines mb-4">{props.project.description}</p>
        <div class="h-5" />
      </a>
      <div class="flex justify-between gap-6 absolute inset-x-6 bottom-6 cursor-pointer">
        <p class="min-w-0 inline-flex items-center gap-3 md:text-sm font-medium text-on-base/50 group-hover:text-accent group-active:text-accent transition-colors">
          <TablerLink class="shrink-0" />
          <span class="truncate">{getHostname(mainUrl())}</span>
        </p>
        {otherLinks().length > 0 && <ProjectLinksMenu links={otherLinks()} />}
      </div>
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
            class="text-on-base/50 -my-2 -mr-2"
          />
        )}
      >
        <TablerDots />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content class="min-w-40 origin-top-right z-15">
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Project Links</Menu.ItemGroupLabel>
              <For each={props.links}>
                {(link) => (
                  <Menu.Item value={link.url} class="max-md:text-base">
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
