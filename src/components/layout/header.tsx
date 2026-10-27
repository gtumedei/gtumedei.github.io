import { A, useLocation } from "@solidjs/router"
import { cn } from "tailwind-variants"
import {
  AccentSwitcher,
  BackgroundSwitcher,
  StyleSwitcher,
  SuperModeSwitcher,
  ThemeSwitcher,
} from "~/components/layout/theming"
import { SearchTrigger } from "~/components/search"
import { button } from "~/components/ui/button"
import { Popover } from "~/components/ui/popover"
import { ProgressiveBlur } from "~/components/ui/progressive-blur"
import stickyOnScrollUp from "~/lib/directives/sticky-on-scroll-up"
import { overlayProps } from "~/lib/overlay-props"
import TablerArrowBackUp from "~icons/tabler/arrow-back-up"
import TablerPalette from "~icons/tabler/palette"

const Header = () => {
  const location = useLocation()

  stickyOnScrollUp
  return (
    <header
      use:stickyOnScrollUp
      class="flex gap-4 px-6 md:px-12 lg:px-16 xl:px-20 py-6 z-20 relative pointer-events-none *:pointer-events-auto group/header"
    >
      <ProgressiveBlur
        class="inset-0 z-[-1]"
        blurWrapperClass="opacity-0 group-data-sticky/header:opacity-100 transition-opacity"
      />

      {location.pathname == "/" ? (
        <div class="grow" />
      ) : (
        <>
          <A
            href="/"
            class={cn(button({ size: "lg", raised: true }), "header-pill px-1.5 mr-auto group")}
          >
            <TablerArrowBackUp />
            <img
              src="/profile.png"
              alt=""
              class="h-8 w-8 bg-neutral/10 rounded-full opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </A>
          <SearchTrigger variant="base" />
        </>
      )}

      <Popover positioning={{ placement: "bottom-end" }} {...overlayProps()}>
        <Popover.Trigger
          class={cn(button({ variant: "base", shape: "circle", size: "lg" }), "header-pill")}
        >
          <TablerPalette />
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content class="p-5">
            <ThemeSwitcher labelClass="mb-2" />
            <AccentSwitcher labelClass="mb-2" />
            <StyleSwitcher labelClass="mb-2" />
            <BackgroundSwitcher labelClass="mb-2" />
            <SuperModeSwitcher class="mt-1" />
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    </header>
  )
}

export default Header
