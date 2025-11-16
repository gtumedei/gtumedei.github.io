import { Link } from "@solidjs/meta"
import { useCurrentMatches } from "@solidjs/router"
import { animate } from "motion"
import { Component, Match, onMount, ParentComponent, Show, Switch } from "solid-js"
// import { Transition } from "solid-transition-group"
import cn from "~/lib/cn"
import { useTheme } from "~/lib/theme"

const wallpapers = {
  base: "/img-remote/braies.jpg",
  dottedMobile: "/img-remote/braies dotted mobile.jpg",
  dottedDesktop: "/img-remote/braies dotted.jpg",
  pixelatedMobile: "/img-remote/braies pixelated mobile.jpg",
  pixelatedDesktop: "/img-remote/braies pixelated.jpg",
}

const Wallpaper = () => {
  const { showWallpaper, style } = useTheme()

  return (
    /* <Transition
      appear
      enterClass="opacity-0"
      exitToClass="opacity-0"
      enterActiveClass="transition-opacity"
      exitActiveClass="transition-opacity"
      mode="outin"
    > */
    <>
      {/* Preload all wallpapers to have smoother animations */}
      {Object.values(wallpapers).map((src) => (
        <Link rel="prefetch" href={src} as="image" fetchpriority="high" />
      ))}
      <Show when={showWallpaper() == "on"}>
        <WallpaperContainer>
          <Switch>
            <Match when={style() == "minimalist"}>
              <WallpaperImage
                src={wallpapers.base}
                class={cn("h-full w-full object-cover mask-b-from-10%")}
              />
            </Match>
            <Match when={style() == "dotted"}>
              <WallpaperImage
                src={wallpapers.dottedMobile}
                class="md:hidden h-full w-full object-cover mask-b-from-10%"
              />
              <WallpaperImage
                src={wallpapers.dottedDesktop}
                class="max-md:hidden h-full w-full object-cover mask-b-from-10%"
              />
            </Match>
            <Match when={style() == "pixelated"}>
              <WallpaperImage
                src={wallpapers.pixelatedMobile}
                class="md:hidden h-full w-full object-cover mask-b-from-10%"
              />
              <WallpaperImage
                src={wallpapers.pixelatedDesktop}
                class="max-md:hidden h-full w-full object-cover mask-b-from-10%"
              />
            </Match>
          </Switch>
        </WallpaperContainer>
      </Show>
    </>
    /* </Transition> */
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

const WallpaperImage: Component<{ src: string; class?: string }> = (props) => {
  let img!: HTMLImageElement

  onMount(() => {
    animate([[img, { opacity: [0, 0.4] }, { duration: 0.4 }]])
  })

  return (
    <img
      ref={img}
      src={props.src}
      alt=""
      class={cn("opacity-40", props.class)}
      data-motion="wallpaper"
    />
  )
}

export default Wallpaper
