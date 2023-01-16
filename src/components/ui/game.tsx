import { JSX, ParentComponent, type Component } from "solid-js"
import { css } from "vite-plugin-inline-css-modules"
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
    <div class={`${style.grid} grid gap-6 h-full w-full`}>
      <div class={style.mobileMenu}>{props.mobileMenu}</div>
      <div class={style.leftMenu}>{props.leftMenu}</div>
      <div class={style.rightMenu}>{props.rightMenu}</div>
      <div class={style.mainArea}>{props.children}</div>
    </div>
  )
}

const style = css`
  .grid {
    grid-template-areas:
      "mobile-menu"
      "main-area";
    grid-template-rows: min-content 1fr;

    * {
      @apply shrink-0;
    }
  }

  .mobileMenu { grid-area: mobile-menu; }
  .leftMenu { grid-area: left-menu; display: none; }
  .rightMenu { grid-area: right-menu; display: none; }
  .mainArea { grid-area: main-area; }

  @media (min-width: 1024px) {
    .grid {
      grid-template-areas: "left-menu main-area right-menu";
      grid-template-rows: revert;
      grid-template-columns: min-content 1fr min-content;
    }

    .mobileMenu { display: none; }
    .leftMenu { display: revert; }
    .rightMenu { display: revert; }
  }
`
