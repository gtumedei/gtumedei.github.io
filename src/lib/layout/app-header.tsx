import { Show, createSignal } from "solid-js"
import tooltip from "~/lib/directives/tooltip"
import { accent, setAccent, setTheme, theme } from "~/lib/theme"
import Popover from "~/lib/ui/popover"
import { onViewTransition } from "~/lib/view-transitions"
import TablerArrowBackUp from "~icons/tabler/arrow-back-up"
import TablerCircleFilled from "~icons/tabler/circle-filled"
import TablerMoonStars from "~icons/tabler/moon-stars"
import TablerPalette from "~icons/tabler/palette"
import TablerSun from "~icons/tabler/sun"
import TablerSunMoon from "~icons/tabler/sun-moon"

tooltip

const ThemePopover = () => {
  const [show, setShow] = createSignal(false)

  return (
    <Popover
      class="absolute top-0 right-0 card bg-base-focus p-4 shadow-xl z-30"
      show={show()}
      setShow={setShow}
      trigger={
        <button class="btn btn-icon" onClick={() => setShow(true)} use:tooltip={["Theme", "left"]}>
          <TablerPalette />
        </button>
      }
    >
      <p class="text-sm ml-1 mb-2">Theme</p>
      <div class="grid grid-cols-3 gap-2">
        <button
          class="btn btn-icon aspect-square border-content/8 hover:border-accent"
          classList={{ "!border-accent": theme() == "light" }}
          onClick={() => setTheme("light")}
          use:tooltip={["Light theme", "bottom"]}
        >
          <TablerSun />
        </button>
        <button
          class="btn btn-icon aspect-square border-content/8 hover:border-accent"
          classList={{ "!border-accent": theme() == "dark" }}
          onClick={() => setTheme("dark")}
          use:tooltip={["Dark theme", "bottom"]}
        >
          <TablerMoonStars />
        </button>
        <button
          class="btn btn-icon aspect-square border-content/8 hover:border-accent"
          classList={{ "!border-accent": theme() == null }}
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
            class="btn btn-icon border-content/8 hover:border-accent"
            classList={{ "!border-accent": accent() == "blue" }}
            use:tooltip={["Blue accent", "bottom"]}
            onClick={() => setAccent("blue")}
          >
            <TablerCircleFilled class="text-accent" />
          </button>
        </div>
        <div class="accent-orange">
          <button
            class="btn btn-icon border-content/8 hover:border-accent"
            classList={{ "!border-accent": accent() == "orange" }}
            use:tooltip={["Orange accent", "bottom"]}
            onClick={() => setAccent("orange")}
          >
            <TablerCircleFilled class="text-accent" />
          </button>
        </div>
        <div class="accent-teal">
          <button
            class="btn btn-icon border-content/8 hover:border-accent"
            classList={{ "!border-accent": accent() == "teal" }}
            use:tooltip={["Teal accent", "bottom"]}
            onClick={() => setAccent("teal")}
          >
            <TablerCircleFilled class="text-accent" />
          </button>
        </div>
        <div class="accent-pink">
          <button
            class="btn btn-icon border-content/8 hover:border-accent"
            classList={{ "!border-accent": accent() == "pink" }}
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

const AppHeader = () => {
  const [showBackBtn, setShowBackBtn] = createSignal(false)
  onViewTransition("after-swap", () => setShowBackBtn(location.pathname != "/"))

  return (
    <header class="container max-w-4xl flex items-center p-3">
      <Show when={showBackBtn()}>
        <a href="/" class="btn btn-icon" use:tooltip={["Go Home", "right"]}>
          <TablerArrowBackUp />
        </a>
      </Show>
      <div class="flex-grow" />
      <ThemePopover />
    </header>
  )
}

export default AppHeader
