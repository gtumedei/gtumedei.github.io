import { JSX, ParentComponent, type Component } from "solid-js"
import tooltip from "~/lib/tooltip"
import MdiArrowLeftTop from "~icons/mdi/arrow-left-top"
import MdiCardsDiamondOutline from "~icons/mdi/cards-diamond-outline"

tooltip

export const GameHeader: Component<{ title: string }> = (props) => {
  return (
    <header class="w-full flex items-center gap-3 p-2 rounded-xl border">
      <a href="/games" class="btn btn-icon" use:tooltip={[() => "Back to Games", "bottom"]}>
        <MdiArrowLeftTop />
      </a>
      <h1 class="section-subheading flex-grow">{props.title}</h1>
      <a href="/" class="btn btn-icon m-auto" use:tooltip={[() => "Go Home", "bottom"]}>
        <MdiCardsDiamondOutline />
      </a>
    </header>
  )
}

export const GameLayout: ParentComponent<{
  mobileMenu?: JSX.Element
  leftMenu?: JSX.Element
  rightMenu?: JSX.Element
}> = (props) => {
  return (
    <div class="
      grid gap-6 h-full w-full [&>*]:shrink-0
      [grid-template-areas:'mobile-menu'_'main-area'] grid-rows-[min-content_1fr]
      lg:[grid-template-areas:'left-menu_main-area_right-menu'] lg:grid-rows-[revert] lg:grid-cols-[min-content_1fr_min-content]
    ">
      <div class="[grid-area:mobile-menu] lg:hidden">{props.mobileMenu}</div>
      <div class="[grid-area:left-menu] hidden lg:block">{props.leftMenu}</div>
      <div class="[grid-area:right-menu] hidden lg:block">{props.rightMenu}</div>
      <div class="[grid-area:main-area]">{props.children}</div>
    </div>
  )
}
