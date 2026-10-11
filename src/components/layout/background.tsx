import { useCurrentMatches } from "@solidjs/router"
import { createMemo, Match, Switch } from "solid-js"
import { cn } from "tailwind-variants"
import { Aurora } from "~/components/backgrounds/aurora"
import Grainient from "~/components/backgrounds/grainient"
import OpacityTransition from "~/components/opacity-transition"
import { useTheme } from "~/lib/theme"
import { useThemeColors } from "~/lib/theme/colors"

const Background = () => {
  const matches = useCurrentMatches()
  const mask = () =>
    ["/", "/*notFound"].includes(matches().at(-1)?.route.originalPath ?? "") ? "sm" : "lg"

  const { background, style } = useTheme()
  const colors = useThemeColors()

  const overlayMode = () =>
    (
      ({
        minimalist: "grain",
        dotted: "dotted",
        pixelated: "pixelated",
      }) as const
    )[style()]

  const backgroundColors = createMemo(() => {
    switch (colors.accent) {
      case colors.blueAccent:
        return {
          aurora: [colors.blueAccent, colors.orangeAccent, colors.blueAccent],
          grainient: [colors.orangeAccent, colors.base100, colors.blueAccent],
        }
      case colors.orangeAccent:
        return {
          aurora: [colors.blueAccent, colors.pinkAccent, colors.orangeAccent],
          grainient: [colors.blueAccent, colors.base100, colors.orangeAccent],
        }
      case colors.tealAccent:
        return {
          aurora: [colors.tealAccent, colors.blueAccent, colors.tealAccent],
          grainient: [colors.pinkAccent, colors.base100, colors.tealAccent],
        }
      case colors.pinkAccent:
        return {
          aurora: [colors.pinkAccent, colors.blueAccent, colors.pinkAccent],
          grainient: [colors.blueAccent, colors.base100, colors.pinkAccent],
        }
      default:
        throw new Error()
    }
  })

  return (
    <>
      <div class="fixed inset-0 group-data-scroll-lock/body:right-[revert] group-data-scroll-lock/body:w-[calc(100vw-var(--scrollbar-width))] -z-10">
        <div class="container h-full bg-base-100 sm:border-x border-on-base/10 dark:border-on-base/5 mx-auto" />
      </div>
      <div
        class="absolute inset-0 group-data-scroll-lock/body:right-[revert] group-data-scroll-lock/body:w-[calc(100vw-var(--scrollbar-width))] -z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div
          class={cn(
            "container h-120 md:h-128 lg:h-132 mx-auto",
            mask() == "lg" && "mask-linear-210 mask-linear-from-10% mask-linear-to-80%",
          )}
        >
          <OpacityTransition>
            <Switch>
              <Match when={background() == "aurora"}>
                <div class="w-full h-full">
                  <Aurora
                    colorStops={backgroundColors().aurora}
                    bgColor={colors.base100}
                    overlayMode={overlayMode()}
                    class="w-full h-full opacity-30 mask-b-from-10%"
                  />
                </div>
              </Match>
              <Match when={background() == "gradient"}>
                <div class="w-full h-full">
                  <Grainient
                    overlayMode={overlayMode()}
                    color1={backgroundColors().grainient[0]}
                    color2={backgroundColors().grainient[1]}
                    color3={backgroundColors().grainient[2]}
                    class="w-full h-full opacity-30 mask-b-from-10%"
                  />
                </div>
              </Match>
            </Switch>
          </OpacityTransition>
        </div>
      </div>
    </>
  )
}

export default Background
