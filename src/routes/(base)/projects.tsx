import { animate, stagger } from "motion"
import { Component, For, onMount } from "solid-js"
import Meta from "~/components/meta"
import PageHeadingIcon from "~/components/page-heading-icon"
import { useAchievements } from "~/lib/achievements"
import { useAchievementsProgress } from "~/lib/achievements/helpers"
import { createBatchedInViewAnimation } from "~/lib/animation"
import projectCategories, { Project } from "~/lib/content/projects"
import TablerGrid3x3 from "~icons/tabler/grid-3x3"
import TablerLink from "~icons/tabler/link"

const ProjectsPage = () => {
  onMount(() => {
    animate([
      [`[data-motion="image"]`, { opacity: 1, scale: [0.9, 1] }, { duration: 0.4 }],
      [
        `[data-motion="heading"]`,
        { opacity: 1, x: [-10, 0] },
        { duration: 0.4, delay: stagger(0.15), at: "<" },
      ],
    ])
  })
  createBatchedInViewAnimation(`[data-motion="section-heading"], [data-motion="project-item"]`)

  return (
    <>
      <Meta
        title="Projects"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, veniam?"
      />
      <div class="lg:w-2/3 px-6 mb-20">
        <PageHeadingIcon data-motion="image">
          <TablerGrid3x3 />
        </PageHeadingIcon>
        <h1
          class="font-serif text-4xl sm:text-5xl font-bold tracking-wider mb-6"
          data-motion="heading"
        >
          Projects
        </h1>
        <p class="text-on-base/70 tall-lines" data-motion="heading">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus accusamus, tempora quod
          placeat cumque in repellendus aut ea voluptas officia exercitationem voluptates impedit
          minima eaque fugiat quia, dignissimos perspiciatis harum?
        </p>
      </div>
      <For each={projectCategories}>
        {(category) => (
          <div class="mb-20">
            <h2 class="inline-block font-semibold text-xl px-6 mb-6" data-motion="section-heading">
              {category.name}
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3">
              <For each={category.projects}>{(project) => <ProjectItem project={project} />}</For>
            </div>
          </div>
        )}
      </For>
    </>
  )
}

const ProjectItem: Component<{ project: Project }> = (props) => {
  const hostname = () => {
    try {
      const url = new URL(props.project.url)
      return url.hostname
    } catch {
      return props.project.url
    }
  }

  const { unlockAchievement } = useAchievements()
  const { progress, setProgress } = useAchievementsProgress()

  return (
    <a
      href={props.project.url}
      target="_blank"
      class="flex flex-col hover:bg-on-base/5 transition-colors duration-500 md:rounded-3xl p-6 group"
      data-motion="project-item"
      onClick={() => {
        if (progress.deepDiver.clickedLinks.includes(props.project.url)) return
        setProgress("deepDiver", "clickedLinks", (v) => [...v, props.project.url])
        if (progress.deepDiver.clickedLinks.length == 5) unlockAchievement("DEEP_DIVER")
      }}
    >
      <div class="bg-base-200 dark:bg-base-300 p-1.5 rounded-full border border-on-base/10 shadow shadow-black/5 mr-auto mb-6">
        <div class="h-8 w-8 rounded-full bg-on-base" />
      </div>
      <h3 class="font-medium mb-3">{props.project.name}</h3>
      <p class="text-sm text-on-base/70 tall-lines mb-4">{props.project.description}</p>
      <p class="flex items-center gap-3 text-sm font-medium text-on-base/50 group-hover:text-accent transition-colors">
        <TablerLink /> {hostname()}
      </p>
    </a>
  )
}

export default ProjectsPage
