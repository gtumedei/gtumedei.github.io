import { RadioGroup } from "@ark-ui/solid"
import { Component, Index, JSX, Show } from "solid-js"
import { cn } from "tailwind-variants"
import { button } from "~/components/ui/button"
import { Toggle } from "~/components/ui/toggle"
import { useAchievements } from "~/lib/achievements"
import { createWebGLDetector } from "~/lib/detect-webgl"
import tooltip from "~/lib/directives/tooltip"
import { Accent, Style, Theme, useTheme } from "~/lib/theme"
import TablerExclamationCircle from "~icons/tabler/exclamation-circle"
import TablerMoonStars from "~icons/tabler/moon-stars"
import TablerSun from "~icons/tabler/sun"
import TablerSunMoon from "~icons/tabler/sun-moon"

type Props = {
  class?: string
  labelClass?: string
}

type RadioProps = Props & { switcherSize?: "xs" | "sm"; switcherClass?: string }

export const ThemeSwitcher: Component<RadioProps> = (props) => {
  const { theme, setTheme } = useTheme()

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

  tooltip
  return (
    <RadioGroup.Root
      class={props.class}
      value={theme()}
      onValueChange={({ value }) => setTheme(value as Theme)}
    >
      <RadioGroup.Label class={cn("inline-flex text-sm font-medium", props.labelClass)}>
        Theme
      </RadioGroup.Label>
      <div
        class={cn(
          "grid grid-cols-3 gap-1 p-1 rounded-4 border border-on-base/10",
          props.switcherClass,
        )}
      >
        <Index each={themes}>
          {(t) => (
            <RadioGroup.Item
              value={t().value}
              asChild={(props) => <label {...props()} use:tooltip={[t().label, "bottom"]} />}
            >
              <RadioGroup.ItemControl
                class={cn(
                  button({
                    variant: "ghost",
                    shape: "rectangle",
                    size: props.switcherSize ?? "sm",
                  }),
                  "w-full rounded-3 *:z-10",
                  t().value == theme() && "bg-neutral/5 text-accent",
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
  )
}

export const AccentSwitcher: Component<RadioProps> = (props) => {
  const { accent, setAccent } = useTheme()

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
    <RadioGroup.Root
      class={props.class}
      value={accent()}
      onValueChange={({ value }) => setAccent(value as Accent)}
    >
      <RadioGroup.Label class={cn("inline-flex text-sm font-medium", props.labelClass)}>
        Accent
      </RadioGroup.Label>
      <div
        class={cn(
          "grid grid-cols-4 gap-1 p-1 rounded-4 border border-on-base/10",
          props.switcherClass,
        )}
      >
        <Index each={accents}>
          {(a) => (
            <RadioGroup.Item
              value={a().value}
              asChild={(props) => <label {...props()} use:tooltip={[a().label, "bottom"]} />}
            >
              <RadioGroup.ItemControl
                class={cn(
                  button({
                    variant: "ghost",
                    shape: "rectangle",
                    size: props.switcherSize ?? "sm",
                  }),
                  "w-full rounded-3 *:z-10",
                  a().value == accent() && "bg-neutral/5",
                )}
              >
                <div class={`h-3 w-3 rounded-full border border-on-accent/30 ${a().bgClass}`} />
              </RadioGroup.ItemControl>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
          )}
        </Index>
      </div>
    </RadioGroup.Root>
  )
}

export const StyleSwitcher: Component<RadioProps> = (props) => {
  const { completedAchievements } = useAchievements()

  const { style, setStyle } = useTheme()

  const styles: {
    value: Style
    label: string
    class: string
  }[] = [
    { value: "minimalist", label: "Base", class: "font-serif text-[28px] leading-[30px]" },
    {
      value: "dotted",
      label: "Dotted",
      class:
        "font-dotted text-3xl font-light text-[32px] leading-[32px] translate-x-[2px] translate-y-[2px]",
    },
    {
      value: "pixelated",
      label: "Pixelated",
      class: "font-pixelated text-[36px] leading-[36px] translate-x-[2px] -translate-y-px",
    },
  ]

  tooltip
  return (
    <Show when={completedAchievements().includes("CHEATER")}>
      <RadioGroup.Root
        class={props.class}
        value={style()}
        onValueChange={({ value }) => setStyle(value as Style)}
      >
        <RadioGroup.Label class={cn("inline-flex text-sm font-medium", props.labelClass)}>
          Style
        </RadioGroup.Label>
        <div
          class={cn(
            "grid grid-cols-3 gap-1 p-1 rounded-4 border border-on-base/10",
            props.switcherClass,
          )}
        >
          <Index each={styles}>
            {(s) => (
              <RadioGroup.Item
                value={s().value}
                asChild={(props) => <label {...props()} use:tooltip={[s().label, "bottom"]} />}
              >
                <RadioGroup.ItemControl
                  class={cn(
                    button({
                      variant: "ghost",
                      shape: "rectangle",
                      size: props.switcherSize ?? "sm",
                    }),
                    "w-full rounded-3 *:z-10",
                    s().value == style() && "bg-neutral/5",
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
    </Show>
  )
}

export const WallpaperSwitcher: Component<Props> = (props) => {
  const { completedAchievements } = useAchievements()

  const { showWallpaper, setShowWallpaper } = useTheme()

  return (
    <Show when={completedAchievements().includes("KEYMASTER")}>
      <Toggle
        class={props.class}
        labelClass={cn("order-1 grow", props.labelClass)}
        controlClass="order-2"
        checked={showWallpaper() == "on"}
        onCheckedChange={({ checked }) => setShowWallpaper(checked ? "on" : "off")}
      >
        Wallpaper
      </Toggle>
    </Show>
  )
}

export const SuperModeSwitcher: Component<Props> = (props) => {
  const { completedAchievements } = useAchievements()

  const { superModeOn, setSuperModeOn } = useTheme()

  const hasWebGLSupport = createWebGLDetector()

  return (
    <Show when={completedAchievements().includes("SUPER_STAR")}>
      <Toggle
        class={props.class}
        labelClass={cn("order-1 grow inline-flex items-center", props.labelClass)}
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
    </Show>
  )
}
