import { A } from "@solidjs/router"
import { Component, ParentComponent } from "solid-js"
import Seo from "~/components/seo"
import { button } from "~/components/ui/button"
import tech, { Technology } from "~/lib/content/tech"
import { createTimeline, stagger } from "~/lib/motion"
import TablerArrowBackUp from "~icons/tabler/arrow-back-up"
import TablerLink from "~icons/tabler/link"

const TechPage = () => {
  createTimeline([
    [`[data-motion]`, { opacity: 1, x: [-10, 0] }, { duration: 0.4, delay: stagger(0.15) }],
  ])

  return (
    <>
      <Seo
        title="Tech"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, veniam?"
      />
      <div class="lg:w-2/3 px-6">
        <A href="/" class={button({ variant: "raised", shape: "circle", class: "group" })}>
          <TablerArrowBackUp class="text-on-base/70 group-hover:text-on-base transition-colors" />
        </A>
        <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-wider mt-8 mb-6" data-motion>
          Tech
        </h1>
        <p class="text-on-base/70 tall-lines" data-motion>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus accusamus, tempora quod
          placeat cumque in repellendus aut ea voluptas officia exercitationem voluptates impedit
          minima eaque fugiat quia, dignissimos perspiciatis harum?
        </p>
      </div>
      <div class="space-y-16 px-6 py-20" data-motion>
        <TechSection heading="Hardware">
          <h4>M1 Pro Macbook Pro 14" (2021)</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <h4>Logitech MX Keys mini</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <h4>Logitech MX Anythere 3</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <h4>Google Pixel Buds Pro</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
        </TechSection>

        <TechSection heading="Software">
          <h4>Visual Studio Code</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://code.visualstudio.com/">code.visualstudio.com</TechAnchor>
          <h4>Warp</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://www.warp.dev/">warp.dev</TechAnchor>
          <h4>Notion</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://www.notion.so/">notion.so</TechAnchor>
          <h4>Figma</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://www.figma.com/">figma.com</TechAnchor>
          <h4>Affinity Photo & Designer</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://affinity.serif.com/">affinity.serif.com</TechAnchor>
        </TechSection>

        <TechSection heading="Stack">
          <h4>SolidJS</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://docs.solidjs.com/">solidjs.com</TechAnchor>
          <h4>Tailwind CSS</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://tailwindcss.com/">tailwindcss.com</TechAnchor>
          <h4>Ark UI</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://ark-ui.com/">ark-ui.com</TechAnchor>
          <h4>unplugin-icons</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://github.com/unplugin/unplugin-icons">github.com</TechAnchor>
          <h4>Payload</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://payloadcms.com/">payloadcms.com</TechAnchor>
          <h4>Drizzle</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://orm.drizzle.team/">orm.drizzle.team</TechAnchor>
          <h4>Turso</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://turso.tech/">turso.tech</TechAnchor>
          <h4>Lucia</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://lucia-auth.com/">lucia-auth.com</TechAnchor>
          <h4>Backblaze</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://www.backblaze.com/">backblaze.com</TechAnchor>
        </TechSection>

        <TechSection heading="Experience">
          <p>
            In no particular order, some tech I worked and tinkered with, from programming and
            templating languages, to frameworks, to databases.
          </p>
          <div class="not-prose grid gap-12 grid-cols-[repeat(auto-fill,minmax(84px,1fr))] mt-12">
            {tech.map((tech) => (
              <TechItem tech={tech} />
            ))}
          </div>
        </TechSection>
      </div>
    </>
  )
}

const TechSection: ParentComponent<{ heading: string }> = (props) => {
  return (
    <section class="flex flex-col md:grid md:grid-cols-5 gap-x-12 gap-y-8 md:border-l md:border-on-base/10">
      <div class="md:pl-6">
        <h2 class="font-semibold max-md:text-xl">{props.heading}</h2>
      </div>
      <div class="col-span-3 max-w-xl prose">{props.children}</div>
    </section>
  )
}

const TechAnchor: ParentComponent<{ href: string }> = (props) => {
  return (
    <div class="not-prose">
      <A
        href={props.href}
        target="_blank"
        class="inline-flex items-center gap-3 text-sm font-medium text-on-base/50 hover:text-accent transition-colors"
      >
        <TablerLink /> {props.children}
      </A>
    </div>
  )
}

const rotations = ["rotate-1", "rotate-2", "rotate-3", "-rotate-1", "-rotate-2", "-rotate-3"]

const TechItem: Component<{ tech: Technology }> = (props) => {
  return (
    <A
      href={props.tech.url}
      target="_blank"
      class="flex flex-col gap-2 relative group"
      style={{ "--color": props.tech.color }}
    >
      <div
        class={
          "h-18 w-18 flex justify-center items-center text-lg bg-base-300 rounded-lg mx-auto mb-7 group-hover:text-[--color] group-hover:rotate-0 transition-all " +
          rotations[Math.floor(Math.random() * rotations.length)]
        }
      >
        {props.tech.icon()}
      </div>
      <p class="font-medium text-sm text-center whitespace-nowrap group-hover:text-[--color] transition-colors absolute-center-x bottom-0">
        {props.tech.name}
      </p>
    </A>
  )
}

export default TechPage
