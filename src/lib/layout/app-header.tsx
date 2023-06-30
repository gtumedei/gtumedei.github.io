import { Component, createSignal } from "solid-js"
import { css } from "vite-plugin-inline-css-modules"
import tooltip from "~/lib/directives/tooltip"
tooltip
import { accent, setAccent, setTheme, theme } from "~/lib/theme"
import Popover from "~/lib/ui/popover"
import TablerArrowBackUp from "~icons/tabler/arrow-back-up"
import TablerCircleFilled from "~icons/tabler/circle-filled"
import TablerMoonStars from "~icons/tabler/moon-stars"
import TablerPalette from "~icons/tabler/palette"
import TablerSun from "~icons/tabler/sun"
import TablerSunMoon from "~icons/tabler/sun-moon"

const ThemePopover = () => {
  const [show, setShow] = createSignal(false)

  return (
    <Popover
      class="absolute top-0 right-0 card bg-primary-focus p-4 shadow-xl z-30"
      show={show()}
      setShow={setShow}
      trigger={
        <button class="btn btn-icon" onClick={() => setShow(true)} use:tooltip={["Theme", "left"]}>
          <TablerPalette />
        </button>
      }
    >
      <p class="text-sm ml-1 mb-2">Theme</p>
      <div class="flex gap-2">
        <button
          class={`btn btn-icon ${style.btnTheme} ${
            theme() == "light" ? "!border-accent" : ""
          } w-1/3 aspect-square`}
          onClick={() => setTheme("light")}
          use:tooltip={["Light theme", "bottom"]}
        >
          <TablerSun />
        </button>
        <button
          class={`btn btn-icon ${style.btnTheme} ${
            theme() == "dark" ? "!border-accent" : ""
          } w-1/3 aspect-square`}
          onClick={() => setTheme("dark")}
          use:tooltip={["Dark theme", "bottom"]}
        >
          <TablerMoonStars />
        </button>
        <button
          class={`btn btn-icon ${style.btnTheme} ${
            theme() == null ? "!border-accent" : ""
          } w-1/3 aspect-square`}
          onClick={() => setTheme(null)}
          use:tooltip={["System theme", "bottom"]}
        >
          <TablerSunMoon />
        </button>
      </div>
      <p class="text-sm mt-4 ml-1 mb-2">Accent</p>
      <div class="flex gap-2">
        <div class="accent-blue">
          <button
            class={`btn btn-icon ${style.btnTheme} ${accent() == "blue" ? "!border-accent" : ""}`}
            use:tooltip={["Blue accent", "bottom"]}
            onClick={() => setAccent("blue")}
          >
            <TablerCircleFilled class="text-accent" />
          </button>
        </div>
        <div class="accent-orange">
          <button
            class={`btn btn-icon ${style.btnTheme} ${accent() == "orange" ? "!border-accent" : ""}`}
            use:tooltip={["Orange accent", "bottom"]}
            onClick={() => setAccent("orange")}
          >
            <TablerCircleFilled class="text-accent" />
          </button>
        </div>
        <div class="accent-teal">
          <button
            class={`btn btn-icon ${style.btnTheme} ${accent() == "teal" ? "!border-accent" : ""}`}
            use:tooltip={["Teal accent", "bottom"]}
            onClick={() => setAccent("teal")}
          >
            <TablerCircleFilled class="text-accent" />
          </button>
        </div>
        <div class="accent-pink">
          <button
            class={`btn btn-icon ${style.btnTheme} ${accent() == "pink" ? "!border-accent" : ""}`}
            use:tooltip={["Pink accent", "bottom"]}
            onClick={() => setAccent("pink")}
          >
            <TablerCircleFilled class="text-accent" />
          </button>
        </div>
      </div>
    </Popover>
  )
}

const style = css`
  .btnTheme {
    @apply border-neutral-8 hover:border-accent;
  }
`

const AppHeader: Component<{ showBackButton: boolean }> = (props) => {
  return (
    <header class="container max-w-4xl flex items-center p-3">
      {props.showBackButton && (
        <a href="/" class="btn btn-icon" use:tooltip={["Go Home", "right"]}>
          <TablerArrowBackUp />
        </a>
      )}
      <div class="flex-grow" />
      <ThemePopover />
    </header>
  )
}

export default AppHeader
