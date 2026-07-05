import { animate, stagger } from "motion"
import { Component, ComponentProps, createSignal, onMount, ParentComponent } from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "tailwind-variants"
import Meta from "~/components/meta"
import PageAvatar from "~/components/page-avatar-icon"
import { button, Button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import { FormField } from "~/components/ui/form-field"
import { Input } from "~/components/ui/input"
import { Loading } from "~/components/ui/loading"
import { Menu } from "~/components/ui/menu"
import { Popover } from "~/components/ui/popover"
import { Textarea } from "~/components/ui/textarea"
import { toast } from "~/components/ui/toast"
import { Toggle } from "~/components/ui/toggle"
import { useAchievements } from "~/lib/achievements"
import TablerBracketsAngle from "~icons/tabler/brackets-angle"
import TablerDots from "~icons/tabler/dots"
import TablerDownload from "~icons/tabler/download"
import TablerFileText from "~icons/tabler/file-text"
import TablerMail from "~icons/tabler/mail"
import TablerRocket from "~icons/tabler/rocket"
import TablerWorld from "~icons/tabler/world"

const ComponentsPage = () => {
  onMount(() => {
    animate([
      [`[data-motion="image"]`, { opacity: 1, scale: [0.9, 1] }, { duration: 0.4 }],
      [
        `[data-motion="heading"], [data-motion="section"]`,
        { opacity: 1, x: [-10, 0] },
        { duration: 0.4, delay: stagger(0.15), at: "<" },
      ],
    ])
  })

  const [disabled, setDisabled] = createSignal(false)

  const { completedAchievements, unlockAchievement } = useAchievements()

  return (
    <>
      <Meta
        title="Components"
        description="A showcase of the main UI components used throughout the website."
      />
      <div class="lg:w-2/3 px-6">
        <PageAvatar class="mb-8" data-motion="image">
          <PageAvatar.Icon>
            <TablerBracketsAngle />
          </PageAvatar.Icon>
        </PageAvatar>
        <h1 class="font-heading text-4xl sm:text-5xl tracking-wider mb-6" data-motion="heading">
          Components
        </h1>
        <p class="text-on-base/70 tall-lines mb-8" data-motion="heading">
          A showcase of the main UI components used throughout the website.
        </p>
        <Toggle
          checked={disabled()}
          onCheckedChange={({ checked }) => setDisabled(checked)}
          class="inline-flex"
          data-motion="heading"
        >
          Show disabled state
        </Toggle>
      </div>
      <div class="px-6 py-8 md:py-12">
        <ComponentSection heading="Button">
          <ComponentShowcase class="flex flex-wrap justify-center gap-3">
            <Button variant="base" disabled={disabled()}>
              Base
            </Button>
            <Button variant="neutral" disabled={disabled()}>
              Neutral
            </Button>
            <Button variant="destructive" disabled={disabled()}>
              Destructive
            </Button>
            <Button variant="subtle" disabled={disabled()}>
              Subtle
            </Button>
            <Button variant="ghost" disabled={disabled()}>
              Ghost
            </Button>
          </ComponentShowcase>
          <h3 class="text-base mt-8 mb-4">With Icon and Text</h3>
          <ComponentShowcase class="flex flex-wrap justify-center gap-3">
            <Button variant="base" disabled={disabled()}>
              Download CV <TablerDownload />
            </Button>
            <Button variant="base" disabled={disabled()}>
              <TablerDownload /> Download CV
            </Button>
          </ComponentShowcase>
          <h3 class="text-base mt-8 mb-4">Shapes</h3>
          <ComponentShowcase class="flex flex-wrap justify-center gap-3">
            <Button variant="base" shape="rounded" disabled={disabled()}>
              Download CV <TablerDownload />
            </Button>
            <Button variant="base" shape="circle" disabled={disabled()}>
              <TablerDownload />
            </Button>
            <Button variant="base" shape="rectangle" disabled={disabled()}>
              Download CV <TablerDownload />
            </Button>
            <Button variant="base" shape="square" disabled={disabled()}>
              <TablerDownload />
            </Button>
          </ComponentShowcase>
          <h3 class="text-base mt-8 mb-4">Sizes</h3>
          <ComponentShowcase class="flex flex-wrap justify-center items-center gap-3">
            {(
              [
                { size: "xs", label: "X-Small" },
                { size: "sm", label: "Small" },
                { size: "md", label: "Medium" },
                { size: "lg", label: "Large" },
                { size: "xl", label: "X-Large" },
              ] as const
            ).map((it) => (
              <Button variant="base" size={it.size} disabled={disabled()}>
                {it.label}
              </Button>
            ))}
          </ComponentShowcase>
          <h3 class="text-base mt-8 mb-4">Raised</h3>
          <ComponentShowcase class="flex justify-center">
            <Button variant="base" raised>
              With shadow
            </Button>
          </ComponentShowcase>
          <h3 class="text-base mt-8 mb-4">On Anchor Elements</h3>
          <ComponentShowcase class="flex flex-wrap justify-center gap-3">
            <Button
              variant="base"
              asChild={(p) => <a href="#" {...p()} />}
              data-disabled={disabled() ? "" : undefined}
            >
              Base
            </Button>
            <Button
              variant="neutral"
              asChild={(p) => <a href="#" {...p()} />}
              data-disabled={disabled() ? "" : undefined}
            >
              Neutral
            </Button>
            <Button
              variant="destructive"
              asChild={(p) => <a href="#" {...p()} />}
              data-disabled={disabled() ? "" : undefined}
            >
              Destructive
            </Button>
            <Button
              variant="subtle"
              asChild={(p) => <a href="#" {...p()} />}
              data-disabled={disabled() ? "" : undefined}
            >
              Subtle
            </Button>
            <Button
              variant="ghost"
              asChild={(p) => <a href="#" {...p()} />}
              data-disabled={disabled() ? "" : undefined}
            >
              Ghost
            </Button>
          </ComponentShowcase>
        </ComponentSection>
        <ComponentSection heading="Dialog">
          <ComponentShowcase class="flex justify-center gap-3">
            <Dialog lazyMount unmountOnExit>
              <Dialog.Trigger class={button()}>Show dialog</Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content class="w-full max-w-xs text-center">
                    <div class="flex bg-base-300 text-accent rounded-full p-4 mx-auto">
                      <TablerRocket class="text-2xl" />
                    </div>
                    <Dialog.Header class="gap-1.5">
                      <Dialog.Title>Message sent</Dialog.Title>
                      <Dialog.Description class="text-sm text-balance">
                        Thanks for reaching out! I'll get back to you as soon as possible.
                      </Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Actions class="grid grid-cols-1">
                      <Dialog.CloseTrigger class={button({ variant: "neutral" })}>
                        Ok
                      </Dialog.CloseTrigger>
                    </Dialog.Actions>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog>
          </ComponentShowcase>
        </ComponentSection>
        <ComponentSection heading="Text Field">
          <ComponentShowcase class="flex flex-col gap-4">
            <Input class="w-full" placeholder="Subject" disabled={disabled()} />
            <Textarea class="w-full" placeholder="Message" disabled={disabled()} />
          </ComponentShowcase>
          <h3 class="text-base mt-8 mb-4">With Leading Icon</h3>
          <ComponentShowcase class="flex gap-2">
            <div class="max-w-xs relative">
              <Input class="w-full pl-12 peer" disabled={disabled()} />
              <TablerMail class="absolute-center-y left-4 pointer-events-none peer-focus-visible:text-accent opacity-70 peer-focus-visible:opacity-100 peer-disabled:opacity-30 transition-all" />
            </div>
          </ComponentShowcase>
          <h3 class="text-base mt-8 mb-4">In Form Field</h3>
          <ComponentShowcase>
            <FormField>
              <FormField.Label>Username</FormField.Label>
              <Input class="max-w-xs" disabled={disabled()} />
              <FormField.Hint>This username is available.</FormField.Hint>
            </FormField>
          </ComponentShowcase>
        </ComponentSection>
        <ComponentSection heading="Loading">
          <ComponentShowcase class="flex justify-center">
            <Loading />
          </ComponentShowcase>
          <h3 class="text-base mt-8 mb-4">In Button</h3>
          <ComponentShowcase class="flex justify-center">
            <Button class="w-44" disabled>
              <Loading class="size-5 text-on-base" />
            </Button>
          </ComponentShowcase>
        </ComponentSection>
        <ComponentSection heading="Menu">
          <ComponentShowcase class="flex justify-center">
            <Menu positioning={{ placement: "bottom-end" }} lazyMount unmountOnExit>
              <Menu.Trigger
                asChild={(p) => <Button {...p()} variant="ghost" size="sm" shape="square" />}
              >
                <TablerDots />
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content class="min-w-40 origin-top-right z-15">
                    <Menu.ItemGroup>
                      <Menu.ItemGroupLabel>Project Links</Menu.ItemGroupLabel>
                      <Menu.Item value="website">
                        <TablerWorld /> Website
                      </Menu.Item>
                      <Menu.Item value="article">
                        <TablerFileText /> Article
                      </Menu.Item>
                      <Menu.Item value="code">
                        <TablerBracketsAngle /> Repository
                      </Menu.Item>
                    </Menu.ItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu>
          </ComponentShowcase>
        </ComponentSection>
        <ComponentSection heading="Popover">
          <ComponentShowcase class="flex justify-center">
            <Popover positioning={{ placement: "bottom" }} lazyMount unmountOnExit>
              <Popover.Trigger class={button()}>Reset progress</Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content class="max-w-64 p-5 origin-top">
                    <p class="text-sm text-on-base/70">
                      Are you sure you want to delete your achievements?
                    </p>
                    <div class="grid grid-cols-1 gap-2">
                      <Popover.CloseTrigger class={button({ variant: "destructive" })}>
                        Yes, let's start all over
                      </Popover.CloseTrigger>
                      <Popover.CloseTrigger class={button()}>
                        Actually, nevermind
                      </Popover.CloseTrigger>
                    </div>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover>
          </ComponentShowcase>
        </ComponentSection>
        <ComponentSection heading="Toast">
          <ComponentShowcase class="flex justify-center">
            <Button
              onClick={() =>
                completedAchievements().includes("DESIGN_SYSTEM_INSIDER")
                  ? toast({
                      title: "Congratulations!",
                      description: "You already unlocked the achievement.",
                      icon: () => <TablerRocket />,
                    })
                  : unlockAchievement("DESIGN_SYSTEM_INSIDER")
              }
            >
              Show toast
            </Button>
          </ComponentShowcase>
        </ComponentSection>
        <ComponentSection heading="Toggle">
          <ComponentShowcase>
            <Toggle disabled={disabled()}>Show Wallpaper</Toggle>
          </ComponentShowcase>
        </ComponentSection>
      </div>
    </>
  )
}

const ComponentSection: ParentComponent<{ heading: string }> = (props) => {
  return (
    <section
      class="flex flex-col md:grid md:grid-cols-5 gap-x-12 gap-y-8 py-12 md:py-8"
      data-motion="section"
    >
      <div>
        <h2 class="font-semibold max-md:text-xl">{props.heading}</h2>
      </div>
      <div class="col-span-3 max-w-xl prose">{props.children}</div>
    </section>
  )
}

const ComponentShowcase: Component<ComponentProps<"div">> = (props) => {
  return (
    <div {...props} class={cn("not-prose p-10 rounded-5 border border-on-base/10", props.class)} />
  )
}

export default ComponentsPage
