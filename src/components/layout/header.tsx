import { Dialog, DialogOpenChangeDetails } from "@ark-ui/solid"
import { A, useLocation } from "@solidjs/router"
import { animate, stagger } from "motion"
import { Component, createEffect, createSignal, JSX } from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "tailwind-variants"
import {
  AccentSwitcher,
  StyleSwitcher,
  SuperModeSwitcher,
  ThemeSwitcher,
  WallpaperSwitcher,
} from "~/components/layout/theming"
import { Button, button } from "~/components/ui/button"
import { Popover } from "~/components/ui/popover"
import { ProgressiveBlur } from "~/components/ui/progressive-blur"
import { createBreakpoints } from "~/lib/breakpoints"
import stickyOnScrollUp from "~/lib/directives/sticky-on-scroll-up"
import TablerArrowBackUp from "~icons/tabler/arrow-back-up"
import TablerBrandTelegram from "~icons/tabler/brand-telegram"
import TablerDeviceGamepad from "~icons/tabler/device-gamepad"
import TablerDownload from "~icons/tabler/download"
import TablerGrid3x3 from "~icons/tabler/grid-3x3"
import TablerMenu from "~icons/tabler/menu"
import TablerPalette from "~icons/tabler/palette"
import TablerTools from "~icons/tabler/tools"
import TablerX from "~icons/tabler/x"

type MenuItem = {
  label: string
  href: string
  icon: () => JSX.Element
  end?: true
}

const desktopMenuItems: MenuItem[] = [
  {
    label: "Projects",
    href: "/projects",
    icon: () => (
      <div class="size-8 grid place-content-center text-lg">
        <TablerGrid3x3 />
      </div>
    ),
  },
  {
    label: "Tech",
    href: "/tech",
    icon: () => (
      <div class="size-8 grid place-content-center text-lg">
        <TablerTools />
      </div>
    ),
  },
  {
    label: "Minigames",
    href: "/minigames",
    icon: () => (
      <div class="size-8 grid place-content-center text-lg">
        <TablerDeviceGamepad />
      </div>
    ),
  },
  {
    label: "Contact",
    href: "/contact",
    icon: () => (
      <div class="size-8 grid place-content-center text-lg">
        <TablerBrandTelegram />
      </div>
    ),
  },
]
const mobileMenuItems: MenuItem[] = [
  {
    label: "Home",
    href: "/",
    end: true,
    icon: () => (
      <img src="/profile.jpg" alt="" class="size-8 rounded-full border border-on-base/10" />
    ),
  },
  ...desktopMenuItems,
]

const Header = () => {
  const breakpoints = createBreakpoints()

  const [menuDialogOpen, setMenuDialogOpen] = createSignal(false)

  const location = useLocation()
  createEffect(() => location.pathname && setMenuDialogOpen(false))

  stickyOnScrollUp
  return (
    <header
      use:stickyOnScrollUp
      class="flex gap-4 px-6 md:px-12 lg:px-16 xl:px-20 py-6 z-20 relative pointer-events-none *:pointer-events-auto group/header"
    >
      <ProgressiveBlur
        gradient
        class="inset-0 z-[-1]"
        gradientClass="opacity-0 group-data-sticky/header:opacity-100 transition-opacity"
        blurWrapperClass="opacity-0 group-data-sticky/header:opacity-100 transition-opacity"
      />
      {location.pathname == "/" ? (
        <A
          href="/cv"
          target="_self"
          class={cn(
            button({ variant: "neutral", size: "lg", raised: true }),
            "backdrop-blur-xs pl-4",
          )}
        >
          <TablerDownload />
          <span class="text-sm">
            <span class="max-sm:hidden">Download </span>CV
          </span>
        </A>
      ) : (
        <A href="/" class={cn(button({ size: "lg", raised: true }), "header-pill px-1.5 group")}>
          <TablerArrowBackUp />
          <img
            src="/profile.jpg"
            alt=""
            class="h-8 w-8 rounded-full opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </A>
      )}
      {location.pathname != "/" && (
        <>
          <Button
            size="lg"
            class="md:hidden header-pill px-4 ml-auto"
            onClick={() => setMenuDialogOpen(true)}
          >
            <span class="text-sm">Menu</span>
            <TablerMenu />
          </Button>
          {!breakpoints.md && (
            <MobileNavDialog
              open={menuDialogOpen()}
              onOpenChange={({ open }) => setMenuDialogOpen(open)}
            />
          )}
        </>
      )}
      {location.pathname != "/" ? <DesktopNav /> : <div class="mx-auto" />}
      <Popover positioning={{ placement: "bottom-end" }} lazyMount unmountOnExit>
        <Popover.Trigger
          class={cn(button({ variant: "base", shape: "circle", size: "lg" }), "header-pill")}
        >
          <TablerPalette />
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content class="p-5 origin-top-right">
            <ThemeSwitcher labelClass="mb-2" />
            <AccentSwitcher labelClass="mb-2" />
            <StyleSwitcher labelClass="mb-2" />
            <WallpaperSwitcher class="mt-1" />
            <SuperModeSwitcher class="mt-1" />
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    </header>
  )
}

const DesktopNav = () => {
  return (
    <div class="max-md:hidden header-pill mx-auto">
      <nav class="flex">
        <ul class="text-sm font-medium flex justify-center px-3 group/nav">
          {desktopMenuItems.map((item) => (
            <li>
              <A
                href={item.href}
                class={cn(
                  "inline-flex px-3.5 py-3 relative outline-none",
                  "before:[content:''] before:rounded-full before:border before:border-transparent focus-visible:before:border-neutral/20 hover:before:bg-neutral/5 before:transition-all before:absolute before:-inset-x-2 before:inset-y-1 focus-visible:before:ring focus-visible:before:ring-neutral/10",
                )}
                activeClass="text-accent before:bg-neutral/5! group-hover/nav:before:bg-transparent! group-hover/nav:hover:before:bg-neutral/5!"
              >
                {item.label}
              </A>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

const MobileNavDialog: Component<{
  open: boolean
  onOpenChange: (details: DialogOpenChangeDetails) => void
}> = (props) => {
  createEffect(async () => {
    if (!props.open) return
    await new Promise((r) => setTimeout(r, 300))
    animate([
      [
        `[data-motion="menu-item"]`,
        { opacity: 1, x: [-6, 0] },
        { duration: 0.3, delay: stagger(0.1), at: "<" },
      ],
    ])
  })

  return (
    <Dialog.Root open={props.open} onOpenChange={props.onOpenChange} lazyMount unmountOnExit>
      <Portal>
        <Dialog.Backdrop class="backdrop-blur-xs fixed top-0 left-0 z-50 h-screen w-screen data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Backdrop class="bg-linear-to-b from-base-100/90 via-base-100/80 to-base-100/10 fixed top-0 left-0 z-50 h-screen w-screen data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=open]:slide-in-from-top data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top" />
        <Dialog.Positioner class="fixed top-0 left-0 w-screen h-screen flex z-50">
          <Dialog.Content class="w-full h-min pb-20 relative data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=closed]:fade-out-0">
            <div class="flex justify-end px-6.5 py-6">
              <Dialog.CloseTrigger
                asChild={(p) => <Button {...p()} variant="subtle" size="lg" shape="circle" />}
              >
                <TablerX />
              </Dialog.CloseTrigger>
            </div>
            <nav>
              <ul class="flex flex-col gap-2 px-6 py-2.5">
                {mobileMenuItems.map((item) => (
                  <li>
                    <A
                      href={item.href}
                      class={cn(
                        "h-12 flex justify-between items-center pl-3 pr-2 relative",
                        "before:[content:''] before:rounded-full before:border before:border-transparent focus-visible:before:border-neutral/20 hover:before:bg-neutral/5 before:transition-all before:absolute before:inset-0 focus-visible:before:ring focus-visible:before:ring-neutral/10",
                      )}
                      activeClass="before:bg-neutral/5! [&_svg]:text-accent"
                      end={"end" in item}
                      data-motion="menu-item"
                    >
                      <span class="font-medium">{item.label}</span>
                      {item.icon()}
                    </A>
                  </li>
                ))}
              </ul>
            </nav>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default Header
