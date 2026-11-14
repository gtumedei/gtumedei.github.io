import { useCurrentMatches } from "@solidjs/router"
import { createMemo, Match, Switch } from "solid-js"
import { cn } from "tailwind-variants"
import { Aurora } from "~/components/backgrounds/aurora"
import Grainient from "~/components/backgrounds/grainient"
import { OpacityTransition } from "~/components/transitions"
import { useTheme } from "~/lib/theme"
import { useThemeColors } from "~/lib/theme/colors"

const Background = () => {
  const matches = useCurrentMatches()
  const mask = () =>
    ["/", "/*notFound"].includes(matches().at(-1)?.route.originalPath ?? "") ? "sm" : "lg"

  const { background, style, actualTheme } = useTheme()
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
    const combos = {
      [colors.blueAccent]: {
        light: ["#d946ef", "#3b82f6", "#06b6d4"],
        dark: ["#f0abfc", "#93c5fd", "#67e8f9"],
      },
      [colors.orangeAccent]: {
        light: ["#eab308", "#f97316", "#f43f5e"],
        dark: ["#fde047", "#fdba74", "#fda4af"],
      },
      [colors.tealAccent]: {
        light: ["#22c55e", "#14b8a6", "#8b5cf6"],
        dark: ["#86efac", "#5eead4", "#c4b5fd"],
      },
      [colors.pinkAccent]: {
        light: ["#6366f1", "#ec4899", "#ef4444"],
        dark: ["#a5b4fc", "#f9a8d4", "#fca5a5"],
      },
    }
    return combos[colors.accent]![actualTheme()]
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
          {/* <img
            src="/bg17.jpeg"
            alt=""
            class="w-full h-full object-cover object-center opacity-50 mask-b-from-10%"
          /> */}
          <OpacityTransition>
            <Switch>
              <Match when={background() == "aurora"}>
                <div class="w-full h-full">
                  <Aurora
                    colorStops={[...backgroundColors()]}
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
                    color1={backgroundColors()[0]}
                    color2={backgroundColors()[1]}
                    color3={backgroundColors()[2]}
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
