import { useCurrentMatches } from "@solidjs/router"
import { Show } from "solid-js"
import { cn } from "tailwind-variants"
import Grainient from "~/components/grainient"
import OpacityTransition from "~/components/opacity-transition"
import { useTheme } from "~/lib/theme"
import { useThemeColors } from "~/lib/theme/colors"

const Wallpaper = () => {
  const matches = useCurrentMatches()
  const mask = () =>
    ["/", "/*notFound"].includes(matches().at(-1)?.route.originalPath ?? "") ? "sm" : "lg"

  const { showWallpaper, style } = useTheme()
  const colors = useThemeColors()

  const overlayMode = () =>
    (
      ({
        minimalist: "none",
        dotted: "dotted",
        pixelated: "pixelated",
      }) as const
    )[style()]

  return (
    <div class="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        class={cn(
          "container h-120 md:h-128 lg:h-132 mx-auto",
          mask() == "lg" && "mask-linear-210 mask-linear-from-10% mask-linear-to-80%",
        )}
      >
        <OpacityTransition>
          <Show when={showWallpaper() == "on"}>
            <div class="w-full h-full">
              <Grainient
                overlayMode={overlayMode()}
                color1={colors.accent}
                color2={colors.base100}
                color3={colors.accent}
                class="w-full h-full opacity-30 mask-b-from-10%"
              />
            </div>
          </Show>
        </OpacityTransition>
      </div>
    </div>
  )
}

export default Wallpaper
