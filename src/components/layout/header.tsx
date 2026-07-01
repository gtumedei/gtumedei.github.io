import { Dialog, DialogOpenChangeDetails } from "@ark-ui/solid"
import { A, useLocation } from "@solidjs/router"
import { Component, createEffect, createSignal, For } from "solid-js"
import { Portal } from "solid-js/web"
import ThemeSwitcher from "~/components/layout/theme-switcher"
import { Button, button } from "~/components/ui/button"
import { dialog } from "~/components/ui/dialog"
import { ProgressiveBlur } from "~/components/ui/progressive-blur"
import { createBreakpoints } from "~/lib/breakpoints"
import { cn } from "tailwind-variants"
import stickyOnScrollUp from "~/lib/directives/sticky-on-scroll-up"
import TablerArrowBackUp from "~icons/tabler/arrow-back-up"
import TablerDownload from "~icons/tabler/download"
import TablerMenu from "~icons/tabler/menu"
import TablerX from "~icons/tabler/x"

type MenuItem = {
  label: string
  href: string
  end?: true
}

const desktopMenuItems: MenuItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Tech", href: "/tech" },
  { label: "Minigames", href: "/minigames" },
  { label: "Contact", href: "/contact" },
]
const mobileMenuItems: MenuItem[] = [{ label: "Home", href: "/", end: true }, ...desktopMenuItems]

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
          class={cn(button({ size: "lg" }), "backdrop-blur-xs rounded-full pl-4 shadow-md")}
        >
          <TablerDownload />
          <span class="text-sm">
            <span class="max-sm:hidden">Download </span>CV
          </span>
        </A>
      ) : (
        <A
          href="/"
          class={cn(button({ variant: "raised", size: "lg" }), "header-pill px-1.5 group")}
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
        <>
          <Button
            variant="raised"
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
      <ThemeSwitcher />
    </header>
  )
}

const DesktopNav = () => {
  return (
    <div class="max-md:hidden header-pill mx-auto">
      <nav class="flex">
        <ul class="text-sm font-medium flex justify-center px-3">
          <For each={desktopMenuItems}>
            {(item) => (
              <li>
                <A
                  href={item.href}
                  class={cn(
                    "inline-flex px-3.5 py-3 relative outline-none",
                    "before:[content:''] before:rounded-full before:border before:border-transparent focus-visible:before:border-neutral/20 hover:before:bg-on-base/5 [&.active]:before:bg-transparent before:transition-all before:absolute before:-inset-x-2 before:inset-y-1 focus-visible:before:ring focus-visible:before:ring-neutral/10",
                    "after:[content:''] after:h-0.5 after:w-12 after:bg-linear-to-r after:from-transparent after:via-accent/50 after:to-transparent after:absolute-center-x after:bottom-0 after:opacity-0 after:transition-opacity",
                  )}
                  activeClass="active text-accent after:opacity-100"
                >
                  {item.label}
                </A>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </div>
  )
}

const MobileNavDialog: Component<{
  open: boolean
  onOpenChange: (details: DialogOpenChangeDetails) => void
}> = (props) => {
  return (
    <Dialog.Root open={props.open} onOpenChange={props.onOpenChange} lazyMount unmountOnExit>
      <Portal>
        <Dialog.Backdrop class={dialog().backdrop()} />
        <Dialog.Positioner class="fixed top-0 left-0 w-screen h-screen flex z-50">
          <div class="container gap-4 p-6 mx-auto group">
            <Dialog.CloseTrigger
              class={cn(
                button({ variant: "raised", shape: "circle", size: "lg" }),
                "bg-base-100/90 dark:bg-base-200/90 ml-auto group-data-[state=open]:animate-in pointer-events-auto",
              )}
            >
              <TablerX />
            </Dialog.CloseTrigger>
            <Dialog.Content class="w-full sm:max-w-md bg-base-100 dark:bg-base-200 flex flex-col gap-6 px-6 py-3 rounded-3xl border border-on-base/10 shadow-md shadow-black/5 ml-auto origin-top-right data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90 data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-90">
              <nav class="flex">
                <ul class="w-full flex flex-col divide-y divide-on-base/10 font-medium">
                  <For each={mobileMenuItems}>
                    {(item) => (
                      <li>
                        <A
                          href={item.href}
                          class={cn(
                            "flex py-3 relative outline-none",
                            "before:[content:''] before:rounded-full before:border before:border-transparent focus-visible:before:border-neutral/20 hover:before:bg-on-base/5 [&.active]:before:bg-transparent before:transition-all before:absolute before:-inset-x-2 before:inset-y-1 focus-visible:before:ring focus-visible:before:ring-neutral/10",
                            "after:[content:''] after:h-8 after:w-0.5 after:bg-linear-to-b after:from-transparent after:via-accent/50 after:to-transparent after:absolute-center-y after:-left-6 after:opacity-0 after:transition-opacity",
                          )}
                          activeClass="active text-accent after:opacity-100"
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
          </div>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default Header
