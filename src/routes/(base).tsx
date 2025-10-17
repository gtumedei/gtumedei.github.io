import { RadioGroup } from "@ark-ui/solid"
import { A, RouteSectionProps, useLocation } from "@solidjs/router"
import { createEffect, createSignal, For, Index, JSX } from "solid-js"
import { Portal } from "solid-js/web"
import { Button, button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import { Popover } from "~/components/ui/popover"
import { ProgressiveBlur } from "~/components/ui/progressive-blur"
import { createBreakpoints } from "~/lib/breakpoints"
import cn from "~/lib/cn"
import stickyOnScrollUp from "~/lib/directives/sticky-on-scroll-up"
import tooltip from "~/lib/directives/tooltip"
import { Accent, Theme, useTheme } from "~/lib/theme"
import TablerArrowBackUp from "~icons/tabler/arrow-back-up"
import TablerCopyright from "~icons/tabler/copyright"
import TablerDownload from "~icons/tabler/download"
import TablerMenu from "~icons/tabler/menu"
import TablerMoonStars from "~icons/tabler/moon-stars"
import TablerPalette from "~icons/tabler/palette"
import TablerSun from "~icons/tabler/sun"
import TablerSunMoon from "~icons/tabler/sun-moon"
import TablerX from "~icons/tabler/x"

const BaseLayout = (props: RouteSectionProps) => {
  return (
    <>
      <div class="bg-base-200 dark:bg-black/40 fixed inset-0 -z-10">
        <div class="container h-full xl:max-w-6xl flex flex-col bg-base-100 sm:border-x border-on-base/10 dark:border-on-base/5 mx-auto" />
      </div>
      <div class="container grow xl:max-w-6xl flex flex-col sm:border-x border-transparent mx-auto">
        <Header />
        <main class="grow flex flex-col pt-14 md:px-6 lg:px-10 xl:px-14">{props.children}</main>
        <Footer />
      </div>
    </>
  )
}

const Header = () => {
  const desktopMenuItems = [
    { label: "Projects", href: "/projects" },
    { label: "Tech", href: "/tech" },
    { label: "Minigames", href: "/minigames" },
    { label: "Contact", href: "/contact" },
  ]
  const mobileMenuItems = [{ label: "Home", href: "/", end: true }, ...desktopMenuItems]

  const breakpoints = createBreakpoints()

  const [menuDialogOpen, setMenuDialogOpen] = createSignal(false)

  const location = useLocation()
  createEffect(() => location.pathname && setMenuDialogOpen(false))

  stickyOnScrollUp
  return (
    <header
      use:stickyOnScrollUp
      class="flex gap-4 px-6 md:px-12 lg:px-16 xl:px-20 py-6 z-20 relative pointer-events-none [&>*]:pointer-events-auto"
    >
      <ProgressiveBlur gradient class="inset-0 z-[-1]" />
      {location.pathname == "/" ? (
        <A
          href="/cv"
          target="_self"
          class={cn(button({ size: "lg" }), "rounded-full pl-5 pr-4 shadow-md")}
        >
          <span class="text-sm">
            <span class="max-sm:hidden">Download </span>CV
          </span>
          <TablerDownload />
        </A>
      ) : (
        <A
          href="/"
          class={cn(
            button({ variant: "raised", size: "lg" }),
            "bg-base-100/90 dark:bg-base-200/90 rounded-full px-1.5 group"
          )}
        >
          <TablerArrowBackUp />
          <img
            src="/profile.jpg"
            alt=""
            class="h-8 w-8 rounded-full opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </A>
      )}
      {location.pathname != "/" && (
        <Button
          variant="raised"
          size="lg"
          class="md:hidden bg-base-100/90 dark:bg-base-200/90 px-4 rounded-full ml-auto group"
          onClick={() => setMenuDialogOpen(true)}
        >
          <span class="text-sm">Menu</span>
          <TablerMenu class="text-on-base/70 group-hover:text-on-base transition-colors" />
        </Button>
      )}
      {!breakpoints.md && (
        <Dialog
          open={menuDialogOpen()}
          onOpenChange={({ open }) => setMenuDialogOpen(open)}
          lazyMount
          unmountOnExit
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner class="flex flex-col gap-6 pt-6 px-6">
              <div class="w-full max-w-md flex mx-auto pointer-events-none">
                <Dialog.CloseTrigger
                  class={cn(
                    button({ variant: "raised", shape: "circle", size: "lg" }),
                    "bg-base-100/90 dark:bg-base-200/90 ml-auto pointer-events-auto group"
                  )}
                >
                  <TablerX class="text-base text-on-base/70 group-hover:text-on-base transition-colors" />
                </Dialog.CloseTrigger>
              </div>
              <Dialog.Content class="w-full max-w-md py-3 mt-0 overflow-visible origin-top-right data-[state=open]:zoom-in-90 data-[state=closed]:zoom-in-90">
                <nav class="flex">
                  <ul class="w-full flex flex-col divide-y divide-on-base/10 font-medium">
                    <For each={mobileMenuItems}>
                      {(item) => (
                        <li>
                          <A
                            href={item.href}
                            class="flex py-3 hover:text-accent transition-colors relative after:[content:''] after:h-8 after:w-0.5 after:bg-gradient-to-b after:from-transparent after:via-accent/50 after:to-transparent after:absolute-center-y after:-left-6 after:opacity-0 after:transition-opacity"
                            activeClass="text-accent after:opacity-100"
                            end={"end" in item}
                          >
                            {item.label}
                          </A>
                        </li>
                      )}
                    </For>
                  </ul>
                </nav>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog>
      )}
      {location.pathname != "/" && (
        <div class="max-md:hidden bg-base-100/90 dark:bg-base-200/90 rounded-full border border-on-base/10 shadow-md shadow-black/3 mx-auto">
          <nav class="flex">
            <ul class="text-sm font-medium flex justify-center px-3">
              <For each={desktopMenuItems}>
                {(item) => (
                  <li>
                    <A
                      href={item.href}
                      class="inline-flex px-3.5 py-3 hover:text-accent transition-colors relative overflow-hidden after:[content:''] after:h-0.5 after:w-12 after:bg-gradient-to-r after:from-transparent after:via-accent/50 after:to-transparent after:absolute-center-x after:bottom-0 after:opacity-0 after:transition-opacity"
                      activeClass="text-accent after:opacity-100"
                    >
                      {item.label}
                    </A>
                  </li>
                )}
              </For>
            </ul>
          </nav>
        </div>
      )}
      {location.pathname == "/" && <div class="mx-auto" />}
      <ThemeSwitcher />
    </header>
  )
}

const ThemeSwitcher = () => {
  const { theme, setTheme, accent, setAccent } = useTheme()

  const themes: {
    value: Theme
    label: string
    icon: () => JSX.Element
  }[] = [
    {
      value: "light",
      label: "Light theme",
      icon: () => <TablerSun />,
    },
    {
      value: "dark",
      label: "Dark theme",
      icon: () => <TablerMoonStars />,
    },
    {
      value: "system",
      label: "System theme",
      icon: () => <TablerSunMoon />,
    },
  ]

  const accents: {
    value: Accent
    label: string
    bgClass: string
  }[] = [
    {
      value: "blue",
      label: "Blue accent",
      bgClass: "bg-accent-blue",
    },
    {
      value: "orange",
      label: "Orange accent",
      bgClass: "bg-accent-orange",
    },
    {
      value: "teal",
      label: "Teal accent",
      bgClass: "bg-accent-teal",
    },
    {
      value: "pink",
      label: "Pink accent",
      bgClass: "bg-accent-pink",
    },
  ]

  tooltip
  return (
    <Popover positioning={{ placement: "bottom-end" }} lazyMount unmountOnExit>
      <Popover.Trigger
        class={cn(
          button({ variant: "raised", shape: "circle", size: "lg" }),
          "bg-base-100/90 dark:bg-base-200/90"
        )}
      >
        <TablerPalette />
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content class="p-5 origin-top-right">
          <RadioGroup.Root value={theme()} onValueChange={({ value }) => setTheme(value as Theme)}>
            <RadioGroup.Label class="inline-flex text-sm font-medium mb-2">Theme</RadioGroup.Label>
            <div class="grid grid-cols-3 gap-2">
              <RadioGroup.Indicator class="h-14 w-14 bg-base-300 rounded-lg left-[var(--left)] pointer-events-none" />
              <Index each={themes}>
                {(t) => (
                  <RadioGroup.Item
                    value={t().value}
                    asChild={(props) => <label {...props()} use:tooltip={[t().label, "bottom"]} />}
                  >
                    <RadioGroup.ItemControl
                      class={cn(
                        button({ variant: "ghost", shape: "square" }),
                        "h-14 border-on-base/10 cursor-pointer [&>*]:z-10",
                        t().value == theme() && "text-accent"
                      )}
                    >
                      {t().icon()}
                    </RadioGroup.ItemControl>
                    <RadioGroup.ItemHiddenInput />
                  </RadioGroup.Item>
                )}
              </Index>
            </div>
          </RadioGroup.Root>
          <RadioGroup.Root
            value={accent()}
            onValueChange={({ value }) => setAccent(value as Accent)}
          >
            <RadioGroup.Label class="inline-flex text-sm font-medium mb-2">Accent</RadioGroup.Label>
            <div class="grid grid-cols-4 gap-2">
              <RadioGroup.Indicator class="h-10 w-10 bg-base-300 rounded-lg left-[var(--left)] pointer-events-none" />
              <Index each={accents}>
                {(a) => (
                  <RadioGroup.Item
                    value={a().value}
                    asChild={(props) => <label {...props()} use:tooltip={[a().label, "bottom"]} />}
                  >
                    <RadioGroup.ItemControl
                      class={cn(
                        button({ variant: "ghost", shape: "square" }),
                        "border-on-base/10 cursor-pointer [&>*]:z-10"
                      )}
                    >
                      <div
                        class={`h-3 w-3 rounded-full border border-on-accent/30 ${a().bgClass}`}
                      />
                    </RadioGroup.ItemControl>
                    <RadioGroup.ItemHiddenInput />
                  </RadioGroup.Item>
                )}
              </Index>
            </div>
          </RadioGroup.Root>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  )
}

const Footer = () => {
  const location = useLocation()

  const pages = [
    { href: "/projects", label: "Projects" },
    { href: "/tech", label: "Tech" },
    { href: "/minigames", label: "Minigames" },
    { href: "/contact", label: "Contact" },
  ]
  const prevWebsites = [{ href: "#", label: "v1 Website" }]

  return (
    <footer class="text-sm flex max-sm:flex-col justify-between max-sm:items-center gap-6 px-6 md:px-12 lg:px-16 xl:px-20 py-12 border-t border-on-base/10">
      <nav class="flex">
        <ul class="font-medium flex flex-wrap max-sm:justify-center gap-4">
          <For each={location.pathname == "/" ? prevWebsites : pages}>
            {(item) => (
              <li>
                <A href={item.href} class="hover:text-accent transition-colors">
                  {item.label}
                </A>
              </li>
            )}
          </For>
        </ul>
      </nav>
      <p class="text-on-base/50 max-sm:text-center inline-flex items-center">
        <TablerCopyright class="text-sm mr-1.5" /> 2021 - {new Date().getFullYear()} Gianni Tumedei
      </p>
    </footer>
  )
}

export default BaseLayout
