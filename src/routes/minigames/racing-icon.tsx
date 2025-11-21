import GameLayout from "~/components/game-layout"
import Meta from "~/components/meta"
import AspectRatio from "~/components/ui/aspect-ratio"
import { Button } from "~/components/ui/button"
import tooltip from "~/lib/directives/tooltip"
import RacingIconControls from "~/minigames/racing-icon/controls"
import { RacingIconGameProvider, useRacingIconGame } from "~/minigames/racing-icon/core"
import { RacingIconDialogs } from "~/minigames/racing-icon/dialogs"
import RacingIconGameScreen from "~/minigames/racing-icon/screen"
import TablerChartBar from "~icons/tabler/chart-bar"
import TablerMenu from "~icons/tabler/menu"

const RacingIconGame = () => {
  return (
    <>
      <Meta
        title="Racing Icon"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, sunt ipsa! Perferendis minus temporibus est."
      />
      <RacingIconGameProvider>
        <GameLayout
          mobileMenu={<MobileMenu />}
          leftDesktopMenu={<LeftMenu />}
          rightDesktopMenu={<RightMenu />}
        >
          <div class="relative h-full px-3 py-6 max-lg:pb-23">
            <AspectRatio w={1} h={1}>
              <RacingIconGameScreen />
            </AspectRatio>
          </div>
          <RacingIconControls />
          <RacingIconDialogs />
        </GameLayout>
      </RacingIconGameProvider>
    </>
  )
}

const MobileMenu = () => {
  const ctx = useRacingIconGame()

  tooltip
  return (
    <header class="w-full flex items-center gap-3 p-3">
      <h1 class="font-heading tracking-normal text-xl mb-1 grow ml-3">Racing Icon</h1>
      <div class="flex gap-4">
        <Button
          variant="subtle"
          size="lg"
          shape="circle"
          onClick={() => ctx.ui.setDialogState("stats")}
          asChild={(props) => <button {...props()} use:tooltip={["Stats", "bottom"]} />}
        >
          <TablerChartBar />
        </Button>
        <Button
          variant="subtle"
          size="lg"
          shape="circle"
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
    <header class="w-48 p-6">
      <div class="h-10">
        <h1 class="font-heading tracking-normal text-xl whitespace-nowrap">Racing Icon</h1>
      </div>
    </header>
  )
}

const RightMenu = () => {
  const ctx = useRacingIconGame()

  tooltip
  return (
    <div class="w-48 flex justify-end gap-4 p-6">
      <Button
        variant="subtle"
        size="lg"
        shape="circle"
        onClick={() => ctx.ui.setDialogState("stats")}
        asChild={(props) => <button {...props()} use:tooltip={["Stats", "bottom"]} />}
      >
        <TablerChartBar />
      </Button>
      <Button
        variant="subtle"
        size="lg"
        shape="circle"
        onClick={() => ctx.ui.setDialogState("menu")}
        asChild={(props) => <button {...props()} use:tooltip={["Menu", "bottom"]} />}
      >
        <TablerMenu />
      </Button>
    </div>
  )
}

export default RacingIconGame
