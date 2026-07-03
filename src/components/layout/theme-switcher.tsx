import { RadioGroup } from "@ark-ui/solid"
import { Index, JSX, Show } from "solid-js"
import { button } from "~/components/ui/button"
import { Popover } from "~/components/ui/popover"
import { Toggle } from "~/components/ui/toggle"
import { useAchievements } from "~/lib/achievements"
import { cn } from "tailwind-variants"
import { Achievement } from "~/lib/content/achievements"
import { createWebGLDetector } from "~/lib/detect-webgl"
import tooltip from "~/lib/directives/tooltip"
import { Accent, Style, Theme, useTheme } from "~/lib/theme"
import TablerExclamationCircle from "~icons/tabler/exclamation-circle"
import TablerMoonStars from "~icons/tabler/moon-stars"
import TablerPalette from "~icons/tabler/palette"
import TablerSun from "~icons/tabler/sun"
import TablerSunMoon from "~icons/tabler/sun-moon"

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
        class={cn(button({ variant: "base", shape: "circle", size: "lg" }), "header-pill")}
      >
        <TablerPalette />
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content class="p-5 origin-top-right">
          <RadioGroup.Root value={theme()} onValueChange={({ value }) => setTheme(value as Theme)}>
            <RadioGroup.Label class="inline-flex text-sm font-medium mb-2">Theme</RadioGroup.Label>
            <div class="grid grid-cols-3 gap-1 p-1 rounded-4 border border-on-base/10">
              <Index each={themes}>
                {(t) => (
                  <RadioGroup.Item
                    value={t().value}
                    asChild={(props) => <label {...props()} use:tooltip={[t().label, "bottom"]} />}
                  >
                    <RadioGroup.ItemControl
                      class={cn(
                        button({ variant: "ghost", shape: "rectangle", size: "sm" }),
                        "w-full rounded-3 *:z-10",
                        t().value == theme() && "bg-base-300 text-accent",
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
            <div class="grid grid-cols-4 gap-1 p-1 rounded-4 border border-on-base/10">
              <Index each={accents}>
                {(a) => (
                  <RadioGroup.Item
                    value={a().value}
                    asChild={(props) => <label {...props()} use:tooltip={[a().label, "bottom"]} />}
                  >
                    <RadioGroup.ItemControl
                      class={cn(
                        button({ variant: "ghost", shape: "rectangle", size: "sm" }),
                        "w-full rounded-3 *:z-10",
                        a().value == accent() && "bg-base-300",
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
          <HiddenOptions />
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  )
}

const HiddenOptions = () => {
  const { completedAchievements } = useAchievements()
  const { style, setStyle, showWallpaper, setShowWallpaper, superModeOn, setSuperModeOn } =
    useTheme()

  const requiredAchievements: Achievement[] = ["CHEATER", "KEYMASTER", "SUPER_STAR"]
  const hasHiddenOptionsUnlocked = () =>
    completedAchievements().some((a) => requiredAchievements.includes(a))

  const hasWebGLSupport = createWebGLDetector()

  const styles: {
    value: Style
    label: string
    class: string
  }[] = [
    { value: "minimalist", label: "Base", class: "font-serif text-[30px] leading-[30px]" },
    {
      value: "dotted",
      label: "Dotted",
      class:
        "font-dotted text-3xl font-light text-[35px] leading-[35px] translate-x-[2px] translate-y-[2px]",
    },
    {
      value: "pixelated",
      label: "Pixelated",
      class: "font-pixelated text-[39px] leading-[39px] translate-x-[2px]",
    },
  ]

  return (
    <Show when={hasHiddenOptionsUnlocked()}>
      {completedAchievements().includes("CHEATER") && (
        <RadioGroup.Root value={style()} onValueChange={({ value }) => setStyle(value as Style)}>
          <RadioGroup.Label class="inline-flex text-sm font-medium mb-2">Style</RadioGroup.Label>
          <div class="grid grid-cols-3 gap-1 p-1 rounded-4 border border-on-base/10">
            <Index each={styles}>
              {(s) => (
                <RadioGroup.Item
                  value={s().value}
                  asChild={(props) => <label {...props()} use:tooltip={[s().label, "bottom"]} />}
                >
                  <RadioGroup.ItemControl
                    class={cn(
                      button({ variant: "ghost", shape: "rectangle", size: "sm" }),
                      "w-full rounded-3 *:z-10",
                      s().value == style() && "bg-base-300",
                    )}
                  >
                    <div class={`m-auto ${s().class}`}>{s().label[0]}</div>
                  </RadioGroup.ItemControl>
                  <RadioGroup.ItemHiddenInput />
                </RadioGroup.Item>
              )}
            </Index>
          </div>
        </RadioGroup.Root>
      )}
      {completedAchievements().includes("KEYMASTER") && (
        <Toggle
          class="mt-1"
          labelClass="order-1 grow"
          controlClass="order-2"
          checked={showWallpaper() == "on"}
          onCheckedChange={({ checked }) => setShowWallpaper(checked ? "on" : "off")}
        >
          Wallpaper
        </Toggle>
      )}
      {completedAchievements().includes("SUPER_STAR") && (
        <Toggle
          class="mt-1"
          labelClass="order-1 grow inline-flex items-center"
          controlClass="order-2"
          checked={superModeOn()}
          onCheckedChange={({ checked }) => setSuperModeOn(checked)}
          disabled={!hasWebGLSupport()}
        >
          Super Mode
          {!hasWebGLSupport() && (
            <div
              class="text-error ml-auto"
              use:tooltip={["WebGL is required for this feature to work", "top"]}
            >
              <TablerExclamationCircle />
            </div>
          )}
        </Toggle>
      )}
    </Show>
  )
}

export default ThemeSwitcher
