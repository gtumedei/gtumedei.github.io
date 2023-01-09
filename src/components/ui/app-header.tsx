import { Component, createMemo, Match, Switch } from "solid-js"
import { accent, cycleAccent, cycleTheme, theme } from "~/lib/theme"
import tooltip from "~/lib/tooltip"
import MdiArrowLeftTop from "~icons/mdi/arrow-left-top"
import MdiCircle from "~icons/mdi/circle"
import MdiBrightnessAuto from "~icons/mdi/brightness-auto"
import MdiBrightness4 from "~icons/mdi/brightness-4"
import MdiBrightness7 from "~icons/mdi/brightness-7"

tooltip

const AppHeader: Component<{ showBackButton: boolean }> = (props) => {
  const themeBtnTitle = createMemo(() => {
    if (theme() == "dark") return "Dark theme"
    else if (theme() == "light") return "Light theme"
    else return "System theme"
  })
  const accentBtnTitle = createMemo(() => accent()[0].toUpperCase() + accent().substring(1) + " accent")

  return (
    <header class="container max-w-4xl flex items-center p-3">
      {props.showBackButton &&
        <a href="/" class="btn btn-icon" use:tooltip={[() => "Go Home", "right"]}>
          <MdiArrowLeftTop />
        </a>
      }
      <div class="flex-grow" />
      <button
        class="btn btn-icon"
        onClick={cycleAccent}
        use:tooltip={[accentBtnTitle, "bottom"]}
      ><MdiCircle class="text-accent" /></button>
      <button
        class="btn btn-icon"
        onClick={cycleTheme}
        use:tooltip={[themeBtnTitle, "bottom"]}
      >
        <Switch>
          <Match when={theme() == "dark"}><MdiBrightness4 /></Match>
          <Match when={theme() == "light"}><MdiBrightness7 /></Match>
          <Match when={theme() == null}><MdiBrightnessAuto /></Match>
        </Switch>
      </button>
    </header>
  )
}

export default AppHeader
