import Meta from "~/components/meta"
import { createTimeline, stagger } from "~/lib/motion"
import TablerLink from "~icons/tabler/link"

const ProjectsPage = () => {
  createTimeline([
    [
      `[data-motion="heading"]`,
      { opacity: 1, x: [-10, 0] },
      { duration: 0.4, delay: stagger(0.15) },
    ],
    [
      `[data-motion="projects"]`,
      { opacity: 1, scale: [0.95, 1], y: [10, 0] },
      { duration: 0.4, delay: stagger(0.15, { start: 0.4 }), at: "<" },
    ],
  ])

  return (
    <>
      <Meta
        title="Projects"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, veniam?"
      />
      <div class="lg:w-2/3 px-6 mt-4 mb-20">
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
        <h2 class="font-semibold text-xl px-6 mb-6" data-motion="heading">
          Work
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map(() => (
            <a
              href="#"
              target="_blank"
              class="flex flex-col hover:bg-on-base/5 transition-colors duration-500 md:rounded-3xl p-6 group"
              data-motion="projects"
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
      <div class="mb-20">
        <h2 class="font-semibold text-xl px-6 mb-6" data-motion="heading">
          Personal
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <a
              href="#"
              target="_blank"
              class="flex flex-col hover:bg-on-base/5 transition-colors duration-500 md:rounded-3xl p-6 group"
              data-motion="projects"
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
