import { animate, inView, stagger } from "motion"
import { onCleanup, onMount } from "solid-js"
import Meta from "~/components/meta"
import PageHeadingIcon from "~/components/page-heading-icon"
import TablerGrid3x3 from "~icons/tabler/grid-3x3"
import TablerLink from "~icons/tabler/link"

const ProjectsPage = () => {
  onMount(() => {
    // Animate hero
    animate([
      [`[data-motion="image"]`, { opacity: 1, scale: [0.9, 1] }, { duration: 0.4 }],
      [
        `[data-motion="heading"]`,
        { opacity: 1, x: [-10, 0] },
        { duration: 0.4, delay: stagger(0.15), at: "<" },
      ],
    ])
    // Animate section headings
    inView(
      `[data-motion="section-heading"]`,
      (elem) => {
        animate(elem, { opacity: 1, x: [-10, 0] }, { duration: 0.4, delay: 0.3 })
      },
      { amount: "all" }
    )
    // Animate project cards
    let firstBatchLoaded = false
    const observer = new IntersectionObserver(
      (entries) => {
        let delayCount = 0 // Reset delay for each batch of elements entering together
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(
              entry.target,
              { opacity: 1, scale: [0.95, 1], y: [10, 0] },
              {
                duration: 0.4,
                delay: delayCount * 0.15 + (firstBatchLoaded ? 0 : 0.4),
                ease: "easeOut",
              }
            )
            delayCount++ // Increase delay for this batch
            observer.unobserve(entry.target) // Only animate once
          }
        })
        firstBatchLoaded = true
      },
      { threshold: 0.5 } // Trigger when 50% visible
    )
    document
      .querySelectorAll(`[data-motion="project-item"]`)
      .forEach((elem) => observer.observe(elem))
    onCleanup(() => observer.disconnect())
  })

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
      <div class="mb-20">
        <h2 class="font-semibold text-xl px-6 mb-6" data-motion="section-heading">
          Work & Research
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map(() => (
            <a
              href="#"
              target="_blank"
              class="flex flex-col hover:bg-on-base/5 transition-colors duration-500 md:rounded-3xl p-6 group"
              data-motion="project-item"
            >
              <div class="bg-base-200 dark:bg-base-300 p-1.5 rounded-full border border-on-base/10 shadow shadow-black/5 mr-auto mb-6">
                <div class="h-8 w-8 rounded-full bg-on-base" />
              </div>
              <h3 class="font-medium mb-3">Project name</h3>
              <p class="text-sm text-on-base/70 tall-lines mb-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!
              </p>
              <p class="flex items-center gap-3 text-sm font-medium text-on-base/50 group-hover:text-accent transition-colors">
                <TablerLink /> github.com
              </p>
            </a>
          ))}
        </div>
      </div>
      <div class="mb-20">
        <h2 class="font-semibold text-xl px-6 mb-6" data-motion="section-heading">
          Personal
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <a
              href="#"
              target="_blank"
              class="flex flex-col hover:bg-on-base/5 transition-colors duration-500 md:rounded-3xl p-6 group"
              data-motion="project-item"
            >
              <div class="bg-base-300 p-1.5 rounded-full border border-on-base/10 shadow shadow-black/5 mr-auto mb-6">
                <div class="h-8 w-8 rounded-full bg-on-base" />
              </div>
              <h3 class="font-medium mb-3">Project name</h3>
              <p class="text-sm text-on-base/70 tall-lines mb-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!
              </p>
              <p class="flex items-center gap-3 text-sm font-medium text-on-base/50 group-hover:text-accent transition-colors">
                <TablerLink /> github.com
              </p>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProjectsPage
