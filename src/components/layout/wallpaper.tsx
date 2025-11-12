import { ClientOnly } from "@ark-ui/solid"
import { useCurrentMatches } from "@solidjs/router"
import { Match, ParentComponent, Show, Switch } from "solid-js"
import { Transition } from "solid-transition-group"
import cn from "~/lib/cn"
import { useTheme } from "~/lib/theme"

const Wallpaper = () => {
  const { showWallpaper, style } = useTheme()

  return (
    <ClientOnly>
      <Transition
        enterClass="opacity-0"
        exitToClass="opacity-0"
        enterActiveClass="transition-opacity duration-150"
        exitActiveClass="transition-opacity duration-150"
        mode="outin"
      >
        <Show when={showWallpaper() == "on"}>
          <Switch>
            <Match when={style() == "minimalist"}>
              <WallpaperWrapper>
                <img
                  src="/img-remote/braies.jpg"
                  alt=""
                  class={cn("h-full w-full object-cover opacity-40 mask-b-from-10%")}
                />
              </WallpaperWrapper>
            </Match>
            <Match when={style() == "dotted"}>
              <WallpaperWrapper>
                <img
                  src="/img-remote/braies dotted mobile.jpg"
                  alt=""
                  class="md:hidden h-full w-full object-cover opacity-40 mask-b-from-10%"
                />
                <img
                  src="/img-remote/braies dotted.jpg"
                  alt=""
                  class="max-md:hidden h-full w-full object-cover opacity-40 mask-b-from-10%"
                />
              </WallpaperWrapper>
            </Match>
            <Match when={style() == "pixelated"}>
              <WallpaperWrapper>
                <img
                  src="/img-remote/braies pixelated mobile.jpg"
                  alt=""
                  class="md:hidden h-full w-full object-cover opacity-40 mask-b-from-10%"
                />
                <img
                  src="/img-remote/braies pixelated.jpg"
                  alt=""
                  class="max-md:hidden h-full w-full object-cover opacity-40 mask-b-from-10%"
                />
              </WallpaperWrapper>
            </Match>
          </Switch>
        </Show>
      </Transition>
    </ClientOnly>
  )
}

const WallpaperWrapper: ParentComponent = (props) => {
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
