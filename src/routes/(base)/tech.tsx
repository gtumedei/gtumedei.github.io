import { A } from "@solidjs/router"
import { animate, inView, stagger } from "motion"
import { Component, createSignal, onMount, ParentComponent } from "solid-js"
import { Portal } from "solid-js/web"
import Meta from "~/components/meta"
import PageHeadingIcon from "~/components/page-heading-icon"
import { button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import { useAchievements } from "~/lib/achievements"
import cn from "~/lib/cn"
import tech, { Technology } from "~/lib/content/tech"
import TablerArrowUpRight from "~icons/tabler/arrow-up-right"
import TablerLink from "~icons/tabler/link"
import TablerStarFilled from "~icons/tabler/star-filled"
import TablerTools from "~icons/tabler/tools"

const TechPage = () => {
  onMount(() => {
    animate([
      [`[data-motion="image"]`, { opacity: 1, scale: [0.9, 1] }, { duration: 0.4 }],
      [
        `[data-motion="heading"], [data-motion="section"]`,
        { opacity: 1, x: [-10, 0] },
        { duration: 0.4, delay: stagger(0.15), at: "<" },
      ],
    ])
    inView(`[data-motion="tech"]`, (elem) => {
      animate(elem, { opacity: 1, x: [-10, 0] }, { duration: 0.4, delay: 0.3 })
      animate(
        `[data-motion="tech-item"]`,
        { opacity: 1, x: [-10, 0] },
        { duration: 0.4, delay: stagger(0.05) }
      )
    })
  })

  const techWithStar = (tech as (Technology | "star")[]).toSpliced(14, 0, "star")

  return (
    <>
      <Meta
        title="Tech"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, veniam?"
      />
      <div class="lg:w-2/3 px-6">
        <PageHeadingIcon data-motion="image">
          <TablerTools />
        </PageHeadingIcon>
        <h1
          class="font-serif text-4xl sm:text-5xl font-bold tracking-wider mb-6"
          data-motion="heading"
        >
          Tech
        </h1>
        <p class="text-on-base/70 tall-lines" data-motion="heading">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus accusamus, tempora quod
          placeat cumque in repellendus aut ea voluptas officia exercitationem voluptates impedit
          minima eaque fugiat quia, dignissimos perspiciatis harum?
        </p>
      </div>
      <div class="px-6 py-8 md:py-12 max-md:divide-y divide-on-base/10">
        <TechSection heading="Hardware">
          <h4>M1 Pro Macbook Pro 14" (2021)</h4>
          <p>
            Might be one of the best pieces of tech I ever bought. Apple Silicon is some kind of
            wizardry: crazy performance, long battery life, low temperatures, dead silent fans, and
            I could go on. Working on this thing is simply a pleasure.
          </p>
          <h4>Logitech MX Keys Mini</h4>
          <p>
            This keyboard has the perfect layout for me (I'm left-handed, so I don't use numpads). I
            also might have a problem because I like the feel of clicky laptop keyboards more than
            most mechanical keyboards. I know, I'm weird, but the MX Keys Mini has just that feel.
          </p>
          <h4>Logitech MX Anywhere 3</h4>
          <p>
            The best mouse to take around with you, period. Except maybe for the 3S with those
            silent buttons... I have to resist, it's not enough to switch. It's not.
          </p>
          <h4>Google Pixel Buds Pro</h4>
          <p>
            I didn't use to believe in wireless earbuds. Yeah no wires is nice, but it's another
            thing to charge, plus it's not the best experience when switching among multiple
            devices. Until I was gifted these: long battery life + multipoint Bluetooth = I no
            longer miss the headphone jack.
          </p>
        </TechSection>

        <TechSection heading="Software">
          <h4>Visual Studio Code</h4>
          <p>
            Yeah, I know, Electron JavaScript memory hog blah blah. But name another editor that
            offers a good dev experience with so many languages AND is open source AND cross
            platform.
          </p>
          <TechAnchor href="https://code.visualstudio.com/">code.visualstudio.com</TechAnchor>
          <h4>Warp</h4>
          <p>
            Honestly, I dislike this terminal in many ways. Like I don't need the AI features and I
            hate that it used to require an account. I just use it for the autocompletion, nice UI,
            and editor-like input.
          </p>
          <TechAnchor href="https://www.warp.dev/">warp.dev</TechAnchor>
          <h4>Notion</h4>
          <p>
            Note taking with Notion is incredible, on desktop. Mobile is a bit of a mixed bag, at
            least on Android, but still ahead of anything else I tried.
          </p>
          <TechAnchor href="https://www.notion.so/">notion.so</TechAnchor>
          <h4>Figma</h4>
          <p>
            It's awesome and I use it for all my design work. The desktop app requires a background
            process to load custom fonts{" "}
            <a
              href="https://forum.figma.com/t/stop-automatically-adding-figmaagent-to-login-items/43826"
              target="_blank"
              class="!text-on-base"
            >
              <TablerArrowUpRight class="inline-flex text-sm relative bottom-1" />
            </a>
            . Seriously Figma? Besides that, it's a really awesome tool.
          </p>
          <TechAnchor href="https://www.figma.com/">figma.com</TechAnchor>
          <h4>Affinity Photo & Designer</h4>
          <p>
            Snagged the whole suite at a discount and although I'm no expert it has come in handy
            plenty of times for some quick and dirty graphics work.
          </p>
          <TechAnchor href="https://affinity.serif.com/">affinity.serif.com</TechAnchor>
        </TechSection>

        <TechSection heading="Stack">
          <h4>SolidJS</h4>
          <p>
            Hands down the best frontend framework in my opinion. Performant, minimal, JSX-based,
            easily composable, and it's starting to have a great ecosystem of libraries. There
            aren't many cases where I wouldn't pick Solid for a new project.
          </p>
          <TechAnchor href="https://docs.solidjs.com/">solidjs.com</TechAnchor>
          <h4>Astro</h4>
          <p>
            For content-driven websites, Astro is my go-to. It's awesome to work with and they are
            adding more and more opt-in features that make it really hard not to choose this
            framework.
          </p>
          <TechAnchor href="https://astro.build/">astro.build</TechAnchor>
          <h4>SolidStart</h4>
          <p>
            The best example of how to build a meta framework for the web. For more dynamic websites
            and web apps, Solid Start is the way to go. Oh, by the way, it also happens to be what
            powers this website!
          </p>
          <TechAnchor href="https://docs.solidjs.com/solid-start">start.solidjs.com</TechAnchor>
          <h4>Wails</h4>
          <p>
            I started looking into Wails because I wanted to write some Go, but I quickly realized I
            had found my new favorite way to build cross-platform desktop apps. Use Go to interact
            with the OS, slap a Vite + SolidJS project on top and you've got an awesome and
            performant app you also had fun building.
          </p>
          <TechAnchor href="https://wails.io/">wails.io</TechAnchor>
          <h4>Tailwind CSS</h4>
          <p>
            Tailwind is so awesome I <em>almost</em> don't write regular CSS anymore. Embrace it and
            you won't look back.
          </p>
          <TechAnchor href="https://tailwindcss.com/">tailwindcss.com</TechAnchor>
          <h4>Ark UI</h4>
          <p>
            This library is so underrated. It has everything needed to build complex, fully
            accessible user interfaces with SolidJS (and React, Vue, Svelte).
          </p>
          <TechAnchor href="https://ark-ui.com/">ark-ui.com</TechAnchor>
          <h4>unplugin-icons</h4>
          <p>
            Need an icon on your web project? This is the library you are looking for. Works with
            pretty much any framework and has an awesome website where you can search all the icons{" "}
            <a href="https://icones.js.org/" target="_blank" class="!text-on-base">
              <TablerArrowUpRight class="inline-flex text-sm relative bottom-1" />
            </a>
            .
          </p>
          <TechAnchor href="https://github.com/unplugin/unplugin-icons">github.com</TechAnchor>
          <h4>Payload</h4>
          <p>
            No CMS comes even close to what Payload has to offer. My only gripe is that it forces me
            to use React for a tight integration.
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
          <h4>Better Auth</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, tempora doloremque?
            Earum illum consequuntur maxime, repellat sequi dolorem officia.
          </p>
          <TechAnchor href="https://www.better-auth.com/">better-auth.com</TechAnchor>
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
          <div class="not-prose flex gap-3 flex-wrap mt-12" data-motion="tech">
            {techWithStar.map((techOrStar) =>
              techOrStar == "star" ? <SuperStarButton /> : <TechItem tech={techOrStar} />
            )}
          </div>
        </TechSection>
      </div>
    </>
  )
}

const TechSection: ParentComponent<{ heading: string }> = (props) => {
  return (
    <section
      class="flex flex-col md:grid md:grid-cols-5 gap-x-12 gap-y-8 py-12 md:py-8"
      data-motion="section"
    >
      <div class="md:pl-6 md:border-l md:border-on-base/10">
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

const TechItem: Component<{ tech: Technology }> = (props) => {
  return (
    <A
      href={props.tech.url}
      target="_blank"
      class="h-8 flex items-center gap-2 px-3 rounded-full relative group"
      style={{
        "--color-light": props.tech.color.light,
        "--color-dark": props.tech.color.dark,
      }}
      data-motion="tech-item"
    >
      <div class="bg-base-300 rounded-full absolute inset-0 -z-10" />
      <div class="group-hover:text-[var(--color-light)] group-hover:dark:text-[var(--color-dark)] transition-colors">
        {props.tech.icon()}
      </div>
      <p class="font-medium text-sm whitespace-nowrap group-hover:text-[var(--color-light)] dark:group-hover:text-[var(--color-dark)] transition-colors">
        {props.tech.name}
      </p>
    </A>
  )
}

const SuperStarButton = () => {
  const { completedAchievements, unlockAchievement } = useAchievements()
  const isCompleted = () => completedAchievements().includes("SUPER_STAR")

  const [open, _setOpen] = createSignal(false)
  const setOpen = (open: boolean) => {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => _setOpen(open))
    } else {
      _setOpen(open)
    }
  }

  return (
    <Dialog
      open={open()}
      onOpenChange={({ open }) => setOpen(open)}
      closeOnEscape={false}
      closeOnInteractOutside={false}
    >
      <Dialog.Trigger
        class={cn(
          "w-11 h-8 bg-base-300 hover:bg-amber-400/10 hover:dark:bg-amber-200/10 flex items-center gap-2 px-3 rounded-full cursor-pointer relative transition-colors group",
          isCompleted() && "bg-amber-400/10 dark:bg-amber-200/10 pointer-events-none"
        )}
        data-motion="tech-item"
      >
        <TablerStarFilled
          class={cn(
            "group-hover:text-amber-400 group-hover:dark:text-amber-200 group-hover:scale-125 transition-all [view-transition-name:star] [animation-duration:1s]",
            isCompleted() && "text-amber-400 dark:text-amber-200",
            open() && "hidden"
          )}
        />
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content class="w-full max-w-sm text-center">
            <div class="w-32 h-32 bg-base-300 flex rounded-full mx-auto relative">
              <div class="bg-gradient-to-b from-accent-orange/30 via-accent-pink/30 to-accent-blue/30 blur-md rounded-full absolute inset-0" />
              <div class="bg-gradient-to-b from-accent-orange via-accent-pink to-accent-blue rounded-full absolute inset-0" />
              <div class="bg-base-300/95 backdrop-blur-md rounded-full absolute inset-px" />
              <div class="bg-amber-400/10 dark:bg-amber-200/5 rounded-full absolute inset-px" />
              <TablerStarFilled
                class={cn(
                  "text-6xl text-amber-400 dark:text-amber-200 absolute-center [view-transition-name:star] [animation-duration:1s]",
                  !open() && "hidden"
                )}
              />
            </div>
            <Dialog.Header class="gap-2.5 mt-1">
              <Dialog.Title>You found the hidden Star!</Dialog.Title>
              <Dialog.Description class="text-sm text-balance space-y-1">
                <p>
                  A new toggle has appeared in the theme switcher: use it to turn your Super Mode on
                  and off.
                </p>
                <p>And then... wah-hoo! Move your cursor and feel the power sparkle!</p>
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Actions class="grid grid-cols-1">
              <Dialog.CloseTrigger
                class={button()}
                onClick={async () => {
                  await new Promise((r) => setTimeout(r, 500))
                  unlockAchievement("SUPER_STAR")
                }}
              >
                Awesome!
              </Dialog.CloseTrigger>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
      <style>{`
      ::view-transition-group(star) {
        animation-duration: 0.5s;
        animation-timing-function: ease-in-out;
      }
      `}</style>
    </Dialog>
  )
}

export default TechPage
