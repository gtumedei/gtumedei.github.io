import { A } from "@solidjs/router"
import { ParentComponent } from "solid-js"
import { button } from "~/components/ui/button"
import TablerArrowBackUp from "~icons/tabler/arrow-back-up"
import TablerLink from "~icons/tabler/link"

const TechPage = () => {
  return (
    <>
      <div class="lg:w-2/3 px-6">
        <A href="/" class={button({ variant: "raised", shape: "circle", class: "group" })}>
          <TablerArrowBackUp class="text-on-base/70 group-hover:text-on-base transition-colors" />
        </A>
        <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-wider mt-8 mb-6">Tech</h1>
        <p class="text-on-base/70 tall-lines">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus accusamus, tempora quod
          placeat cumque in repellendus aut ea voluptas officia exercitationem voluptates impedit
          minima eaque fugiat quia, dignissimos perspiciatis harum?
        </p>
      </div>
      <div class="space-y-16 px-6 py-20">
        <TechSection heading="Setup">
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
        </TechSection>
        <TechSection heading="Software">
          <h4>Visual Studio Code</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="#">code.visualstudio.com</TechAnchor>
          <h4>Warp</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="#">warp.dev</TechAnchor>
        </TechSection>
        <TechSection heading="Tech stack">
          <h4>SolidJS</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <h4>Astro</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
        </TechSection>
        <TechSection heading="Experience">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quo pariatur sed vitae
            unde corporis?
          </p>
          <div class="not-prose grid gap-12 grid-cols-[repeat(auto-fill,minmax(84px,1fr))] mt-12">
            {new Array(20).fill(null).map(() => (
              <TechItem />
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
        class="flex items-center gap-3 text-sm font-medium hover:text-accent transition-colors"
      >
        <TablerLink /> {props.children}
      </A>
    </div>
  )
}

const rotations = ["rotate-1", "rotate-2", "rotate-3", "-rotate-1", "-rotate-2", "-rotate-3"]

const TechItem = () => {
  return (
    <A href="#" target="_blank" class="flex flex-col gap-2 relative group">
      <div
        class={
          "h-18 w-18 flex bg-base-300 rounded-lg mx-auto mb-7 group-hover:bg-accent/10 group-hover:text-accent group-hover:rotate-0 transition-all " +
          rotations[Math.floor(Math.random() * rotations.length)]
        }
      >
        <span class="m-auto">IC</span>
      </div>
      <p class="font-medium text-sm text-center whitespace-nowrap group-hover:text-accent transition-colors absolute-center-x bottom-0">
        tech name
      </p>
    </A>
  )
}

export default TechPage
