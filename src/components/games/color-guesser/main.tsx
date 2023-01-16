import { Component } from "solid-js"
import AspectRatio from "~/components/ui/aspect-ratio"
import { GameLayout } from "~/components/ui/game"
import { createColorGuesserCtx, useColorGuesserCtx } from "~/lib/games/color-guesser/core"
import tooltip from "~/lib/tooltip"
import MdiMenu from "~icons/mdi/menu"
import MdiPoll from "~icons/mdi/poll"
import { Board } from "./board"
import { SettingsModal, StatsModal } from "./modals"

tooltip

const MobileMenu = () => {
  const ctx = useColorGuesserCtx()

  return (
    <header class="w-full flex items-center gap-3">
      <h1 class="section-subheading flex-grow ml-3">Color Guesser</h1>
      <div class="flex">
        <button
          class="btn btn-icon"
          onClick={() => ctx.setShowStatsModal(true)}
          use:tooltip={[() => "Stats", "top"]}
        ><MdiPoll /></button>
        <button
          class="btn btn-icon"
          onClick={() => ctx.setShowSettingsModal(true)}
          use:tooltip={[() => "Menu", "top"]}
        ><MdiMenu /></button>
      </div>
    </header>
  )
}

const LeftMenu = () => {
  return (
    <header class="w-44">
      <h1 class="section-subheading">Color Guesser</h1>
    </header>
  )
}

const RightMenu = () => {
  const ctx = useColorGuesserCtx()

  return (
    <div class="w-44 flex justify-end">
      <button
        class="btn btn-icon"
        onClick={() => ctx.setShowStatsModal(true)}
        use:tooltip={[() => "Stats", "top"]}
      ><MdiPoll /></button>
      <button
        class="btn btn-icon"
        onClick={() => ctx.setShowSettingsModal(true)}
        use:tooltip={[() => "Menu", "top"]}
      ><MdiMenu /></button>
    </div>
  )
}

const CurrentColor = () => {
  const ctx = useColorGuesserCtx()

  return (
    <div class="absolute bottom-3 left-0 w-full flex">
      <div class="inline-flex px-6 py-3 rounded-xl border m-auto">
        <p>Color code: {ctx.game.color}</p>
      </div>
    </div>
  )
}

const ColorGuesserGame: Component = () => {
  const [CtxProvider] = createColorGuesserCtx()

  return (
    <CtxProvider>
      <GameLayout
        mobileMenu={<MobileMenu />}
        leftMenu={<LeftMenu />}
        rightMenu={<RightMenu />}
      >
        <div class="relative h-full pt-3 pb-24">
          <AspectRatio w={1} h={1}>
            <Board />
          </AspectRatio>
          <CurrentColor />
        </div>
        <SettingsModal />
        <StatsModal />
      </GameLayout>
    </CtxProvider>
  )
}

export default ColorGuesserGame
