import { Component, createSignal } from "solid-js"
import { css } from "vite-plugin-inline-css-modules"
import Popover from "~/components/ui/popover"
import { accent, setAccent, setTheme, theme } from "~/lib/theme"
import tooltip from "~/lib/tooltip"; tooltip
import MdiArrowLeftTop from "~icons/mdi/arrow-left-top"
import MdiCircle from "~icons/mdi/circle"
import MdiPaletteOutline from "~icons/mdi/palette-outline"
import MdiThemeLightDark from "~icons/mdi/theme-light-dark"
import MdiWeatherSunny from "~icons/mdi/weather-sunny"
import MdiWeatherNight from "~icons/mdi/weather-night"

const ThemePopover = () => {
  const [show, setShow] = createSignal(false)

  return (
    <Popover
      class="absolute top-0 right-0 card bg-primary-focus p-4 shadow-xl z-30"
      show={show()}
      setShow={setShow}
      trigger={
        <button class="btn btn-icon" onClick={() => setShow(true)} use:tooltip={["Theme", "left"]}>
          <MdiPaletteOutline />
        </button>
      }
    >
      <p class="text-sm mb-2">Theme</p>
      <div class="flex gap-2">
        <button
          class={`btn btn-icon ${style.btnTheme} ${theme() == "light" ? "!border-accent" : ""} w-1/3 aspect-square`}
          onClick={() => setTheme("light")}
          use:tooltip={["Light theme", "bottom"]}
        ><MdiWeatherSunny /></button>
        <button
          class={`btn btn-icon ${style.btnTheme} ${theme() == "dark" ? "!border-accent" : ""} w-1/3 aspect-square`}
          onClick={() => setTheme("dark")}
          use:tooltip={["Dark theme", "bottom"]}
        ><MdiWeatherNight /></button>
        <button
          class={`btn btn-icon ${style.btnTheme} ${theme() == null ? "!border-accent" : ""} w-1/3 aspect-square`}
          onClick={() => setTheme(null)}
          use:tooltip={["System theme", "bottom"]}
        ><MdiThemeLightDark /></button>
      </div>
      <p class="text-sm mt-4 mb-2">Accent</p>
      <div class="flex gap-2">
        <div class="accent-blue">
          <button
            class={`btn btn-icon ${style.btnTheme} ${accent() == "blue" ? "!border-accent" : ""}`}
            use:tooltip={["Blue accent", "bottom"]}
            onClick={() => setAccent("blue")}
          ><MdiCircle class="text-accent" /></button>
        </div>
        <div class="accent-orange">
          <button
            class={`btn btn-icon ${style.btnTheme} ${accent() == "orange" ? "!border-accent" : ""}`}
            use:tooltip={["Orange accent", "bottom"]}
            onClick={() => setAccent("orange")}
          ><MdiCircle class="text-accent" /></button>
        </div>
        <div class="accent-teal">
          <button
            class={`btn btn-icon ${style.btnTheme} ${accent() == "teal" ? "!border-accent" : ""}`}
            use:tooltip={["Teal accent", "bottom"]}
            onClick={() => setAccent("teal")}
          ><MdiCircle class="text-accent" /></button>
        </div>
        <div class="accent-pink">
          <button
            class={`btn btn-icon ${style.btnTheme} ${accent() == "pink" ? "!border-accent" : ""}`}
            use:tooltip={["Pink accent", "bottom"]}
            onClick={() => setAccent("pink")}
          ><MdiCircle class="text-accent" /></button>
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
      {props.showBackButton &&
        <a href="/" class="btn btn-icon" use:tooltip={["Go Home", "right"]}>
          <MdiArrowLeftTop />
        </a>
      }
      <div class="flex-grow" />
      <ThemePopover/>
    </header>
  )
}

export default AppHeader
