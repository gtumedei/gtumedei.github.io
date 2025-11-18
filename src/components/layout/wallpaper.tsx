import { Link } from "@solidjs/meta"
import { useCurrentMatches } from "@solidjs/router"
import { Match, ParentComponent, Show, Switch } from "solid-js"
import { Transition } from "solid-transition-group"
import cn from "~/lib/cn"
import { useTheme } from "~/lib/theme"

const wallpapers = {
  base: "/img-remote/braies.jpg",
  dottedMobile: "/img-remote/braies dotted mobile.svg",
  dottedDesktop: "/img-remote/braies dotted.svg",
  pixelatedMobile: "/img-remote/braies pixelated mobile.png",
  pixelatedDesktop: "/img-remote/braies pixelated.png",
}

const Wallpaper = () => {
  const { showWallpaper, style } = useTheme()

  return (
    <>
      {/* Preload all wallpapers to have smoother animations */}
      {Object.values(wallpapers).map((src) => (
        <Link rel="prefetch" href={src} as="image" fetchpriority="high" />
      ))}
      <WallpaperContainer>
        <Transition
          appear
          enterClass="opacity-0"
          exitToClass="opacity-0"
          enterActiveClass="transition-opacity"
          exitActiveClass="transition-opacity"
          mode="outin"
        >
          <Show when={showWallpaper() == "on"}>
            <Switch>
              <Match when={style() == "minimalist"}>
                <div class="w-full h-full">
                  <img
                    src={wallpapers.base}
                    alt=""
                    class={cn("h-full w-full object-cover opacity-50 mask-b-from-10%")}
                  />
                </div>
              </Match>
              <Match when={style() == "dotted"}>
                <div class="w-full h-full">
                  <img
                    src={wallpapers.dottedMobile}
                    alt=""
                    class="md:hidden h-full w-full object-cover opacity-50 mask-b-from-10%"
                  />
                  <img
                    src={wallpapers.dottedDesktop}
                    alt=""
                    class="max-md:hidden h-full w-full object-cover opacity-50 mask-b-from-10%"
                  />
                </div>
              </Match>
              <Match when={style() == "pixelated"}>
                <div class="w-full h-full">
                  <img
                    src={wallpapers.pixelatedMobile}
                    alt=""
                    class="md:hidden h-full w-full object-cover opacity-50 mask-b-from-10% [image-rendering:pixelated]"
                  />
                  <img
                    src={wallpapers.pixelatedDesktop}
                    alt=""
                    class="max-md:hidden h-full w-full object-cover opacity-50 mask-b-from-10% [image-rendering:pixelated]"
                  />
                </div>
              </Match>
            </Switch>
          </Show>
        </Transition>
      </WallpaperContainer>
    </>
  )
}

const WallpaperContainer: ParentComponent = (props) => {
  const matches = useCurrentMatches()
  const mask = () =>
    ["/", "/*notFound"].includes(matches().at(-1)?.route.originalPath ?? "") ? "sm" : "lg"

  return (
    <div class="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        class={cn(
          "container h-120 md:h-128 lg:h-132 mx-auto",
          mask() == "lg" && "mask-linear-210 mask-linear-from-10% mask-linear-to-80%"
        )}
      >
        {props.children}
      </div>
    </div>
  )
}

export default Wallpaper
