import { RadioGroup } from "@ark-ui/solid"
import { Index, JSX, Show } from "solid-js"
import { button } from "~/components/ui/button"
import { Popover } from "~/components/ui/popover"
import { Toggle } from "~/components/ui/toggle"
import { useAchievements } from "~/lib/achievements"
import cn from "~/lib/cn"
import { Achievement } from "~/lib/content/achievements"
import tooltip from "~/lib/directives/tooltip"
import { Accent, Theme, useTheme } from "~/lib/theme"
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
        class={cn(
          button({ variant: "raised", shape: "circle", size: "lg" }),
          "bg-base-100/90 dark:bg-base-200/90 group"
        )}
      >
        <TablerPalette class="text-on-base/70 group-hover:text-on-base transition-colors" />
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content class="p-5 origin-top-right">
          <RadioGroup.Root value={theme()} onValueChange={({ value }) => setTheme(value as Theme)}>
            <RadioGroup.Label class="inline-flex text-sm font-medium mb-2">Theme</RadioGroup.Label>
            <div class="grid grid-cols-3 gap-2">
              <RadioGroup.Indicator class="h-14 w-14 bg-base-300 rounded-lg left-[var(--left)] pointer-events-none" />
              <Index each={themes}>
                {(t) => (
                  <RadioGroup.Item
                    value={t().value}
                    asChild={(props) => <label {...props()} use:tooltip={[t().label, "bottom"]} />}
                  >
                    <RadioGroup.ItemControl
                      class={cn(
                        button({ variant: "ghost", shape: "square" }),
                        "h-14 border-on-base/10 cursor-pointer [&>*]:z-10",
                        t().value == theme() && "text-accent"
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
            <div class="grid grid-cols-4 gap-2">
              <RadioGroup.Indicator class="h-10 w-10 bg-base-300 rounded-lg left-[var(--left)] pointer-events-none" />
              <Index each={accents}>
                {(a) => (
                  <RadioGroup.Item
                    value={a().value}
                    asChild={(props) => <label {...props()} use:tooltip={[a().label, "bottom"]} />}
                  >
                    <RadioGroup.ItemControl
                      class={cn(
                        button({ variant: "ghost", shape: "square" }),
                        "border-on-base/10 cursor-pointer [&>*]:z-10"
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
  const { dottedHeadingsOn, setDottedHeadingsOn, superModeOn, setSuperModeOn } = useTheme()

  const requiredAchievements: Achievement[] = ["CHEATER", "SUPER_STAR"]
  const hasHiddenOptionsUnlocked = () =>
    completedAchievements().some((a) => requiredAchievements.includes(a))

  return (
    <Show when={hasHiddenOptionsUnlocked()}>
      <div class="h-px w-calc(100%+2.5rem) bg-on-base/10 -mx-5 my-1" />
      {completedAchievements().includes("CHEATER") && (
        <Toggle
          labelClass="order-1 grow"
          controlClass="order-2"
          checked={dottedHeadingsOn()}
          onCheckedChange={({ checked }) => setDottedHeadingsOn(checked)}
        >
          Dotted headings
        </Toggle>
      )}
      {completedAchievements().includes("SUPER_STAR") && (
        <Toggle
          labelClass="order-1 grow"
          controlClass="order-2"
          checked={superModeOn()}
          onCheckedChange={({ checked }) => setSuperModeOn(checked)}
        >
          Super Mode
        </Toggle>
      )}
    </Show>
  )
}

export default ThemeSwitcher
