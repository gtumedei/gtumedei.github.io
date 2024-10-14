import GameLayout from "~/components/game-layout"
import AspectRatio from "~/components/ui/aspect-ratio"
import { Button } from "~/components/ui/button"
import tooltip from "~/lib/directives/tooltip"
import { Board } from "~/minigames/color-guesser/board"
import { ColorGuesserGameProvider, useColorGuesserGame } from "~/minigames/color-guesser/core"
import { MenuDialog, StatsDialog } from "~/minigames/color-guesser/dialogs"
import TablerChartBar from "~icons/tabler/chart-bar"
import TablerMenu from "~icons/tabler/menu"

tooltip

const MobileMenu = () => {
  const ctx = useColorGuesserGame()

  return (
    <header class="w-full flex items-center gap-3">
      <h1 class="font-serif text-xl font-bold tracking-wider mb-1 flex-grow ml-3">Color Guesser</h1>
      <div class="flex">
        <Button
          variant="ghost"
          shape="square"
          onClick={() => ctx.ui.setDialogState("stats")}
          asChild={(props) => <button {...props()} use:tooltip={["Stats", "bottom"]} />}
        >
          <TablerChartBar />
        </Button>
        <Button
          variant="ghost"
          shape="square"
          onClick={() => ctx.ui.setDialogState("menu")}
          asChild={(props) => <button {...props()} use:tooltip={["Menu", "bottom"]} />}
        >
          <TablerMenu />
        </Button>
      </div>
    </header>
  )
}

const LeftMenu = () => {
  return (
    <header class="w-44">
      <h1 class="font-serif text-xl font-bold tracking-wider">Color Guesser</h1>
    </header>
  )
}

const RightMenu = () => {
  const ctx = useColorGuesserGame()

  return (
    <div class="w-44 flex justify-end">
      <Button
        variant="ghost"
        shape="square"
        onClick={() => ctx.ui.setDialogState("stats")}
        asChild={(props) => <button {...props()} use:tooltip={["Stats", "bottom"]} />}
      >
        <TablerChartBar />
      </Button>
      <Button
        variant="ghost"
        shape="square"
        onClick={() => ctx.ui.setDialogState("menu")}
        asChild={(props) => <button {...props()} use:tooltip={["Menu", "bottom"]} />}
      >
        <TablerMenu />
      </Button>
    </div>
  )
}

const ColorIndicator = () => {
  const ctx = useColorGuesserGame()

  return (
    <div class="absolute bottom-3 left-0 w-full flex">
      <div class="flex bg-base-100/80 dark:bg-base-200/80 backdrop-blur px-6 py-2.5 rounded-full border border-on-base/10 shadow-md shadow-black/5 m-auto">
        <p class="text-on-base/70">
          Color code: <span class="text-on-base">{ctx.game.color}</span>
        </p>
      </div>
    </div>
  )
}

const ColorGuesserGame = () => {
  return (
    <ColorGuesserGameProvider>
      <GameLayout mobileMenu={<MobileMenu />} leftMenu={<LeftMenu />} rightMenu={<RightMenu />}>
        <div class="relative h-full pt-3 pb-24">
          <AspectRatio w={1} h={1}>
            <Board />
          </AspectRatio>
          <ColorIndicator />
        </div>
        <MenuDialog />
        <StatsDialog />
      </GameLayout>
    </ColorGuesserGameProvider>
  )
}

export default ColorGuesserGame
