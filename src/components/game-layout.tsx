import type { JSX, ParentComponent } from "solid-js"

const GameLayout: ParentComponent<{
  mobileMenu?: JSX.Element
  leftDesktopMenu?: JSX.Element
  rightDesktopMenu?: JSX.Element
}> = (props) => {
  return (
    <div
      class="
      grid gap-6 h-full w-full [&>*]:shrink-0
      [grid-template-areas:'mobile-menu'_'main-area'] grid-rows-[min-content_1fr]
      lg:[grid-template-areas:'left-menu_main-area_right-menu'] lg:grid-rows-[revert] lg:grid-cols-[min-content_1fr_min-content]
    "
    >
      <div class="[grid-area:mobile-menu] lg:hidden">{props.mobileMenu}</div>
      <div class="[grid-area:left-menu] hidden lg:block">{props.leftDesktopMenu}</div>
      <div class="[grid-area:right-menu] hidden lg:block">{props.rightDesktopMenu}</div>
      <div class="[grid-area:main-area]">{props.children}</div>
    </div>
  )
}

export default GameLayout
