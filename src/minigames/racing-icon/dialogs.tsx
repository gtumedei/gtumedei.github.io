import { onMount } from "solid-js"
import { Portal } from "solid-js/web"
import { Button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import { useRacingIconGame } from "~/minigames/racing-icon/core"
import TablerChartBar from "~icons/tabler/chart-bar"
import TablerChevronLeft from "~icons/tabler/chevron-left"
import TablerChevronRight from "~icons/tabler/chevron-right"

export const RacingIconDialogs = () => {
  return (
    <>
      <MenuDialog />
      <StatsDialog />
    </>
  )
}

const MenuDialog = () => {
  const ctx = useRacingIconGame()

  /* const [difficulty, setDifficulty] = createSignal(0)
  const increaseDifficulty = () =>
    setDifficulty((v) => Math.min(v + 1, ctx.difficulties.length - 1))
  const decreaseDifficulty = () => setDifficulty((v) => Math.max(v - 1, 0))

  const [mode, setMode] = createSignal(0)
  const nextMode = () => setMode((v) => Math.min(v + 1, ctx.modes.length - 1))
  const prevMode = () => setMode((v) => Math.max(v - 1, 0))

  const onStartBtnClick = () => {
    ctx.ui.setDialogState(null)
    ctx.gameActions.startGame(ctx.difficulties[difficulty()]!, ctx.modes[mode()]!)
  } */

  onMount(async () => {
    await new Promise((r) => setTimeout(r, 100))
    ctx.ui.setDialogState("menu")
  })

  return (
    <Dialog
      open={ctx.ui.dialogState() == "menu"}
      onOpenChange={({ open }) => ctx.ui.setDialogState(open ? "menu" : null)}
      closeOnEscape={ctx.state() != "IDLE"}
      closeOnInteractOutside={ctx.state() != "IDLE"}
      lazyMount
      unmountOnExit
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content class="w-full max-w-lg text-center">
            <Dialog.Header class="gap-1">
              <img src="#" alt="" class="w-15 h-15 rounded-2 shadow shadow-black/5 mx-auto mb-3" />
              <Dialog.Title>Racing Icon</Dialog.Title>
              <Dialog.Description class="text-balance">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, nisi. Eum, nisi.
              </Dialog.Description>
            </Dialog.Header>
            <div class="flex flex-col divide-y divide-on-base/10 rounded-4 border border-on-base/10 mt-2 mb-2.5">
              <div class="flex items-center gap-2 p-2">
                <h5 class="text-left text-sm text-on-base/70 font-medium grow ml-2.5">Vehicle</h5>
                <div class="flex gap-2 items-center">
                  <Button
                    variant="ghost"
                    shape="square"
                    /* onClick={decreaseDifficulty}
                    disabled={difficulty() == 0} */
                  >
                    <TablerChevronLeft />
                  </Button>
                  <span class="text-sm w-16">asd</span>
                  <Button
                    variant="ghost"
                    shape="square"
                    /* onClick={increaseDifficulty}
                    disabled={difficulty() == ctx.difficulties.length - 1} */
                  >
                    <TablerChevronRight />
                  </Button>
                </div>
              </div>
              <div class="flex items-center gap-2 p-2">
                <h5 class="text-left text-sm text-on-base/70 font-medium grow ml-2.5">Trail</h5>
                <div class="flex gap-2 items-center">
                  <Button
                    variant="ghost"
                    shape="square"
                    /* onClick={decreaseDifficulty}
                    disabled={difficulty() == 0} */
                  >
                    <TablerChevronLeft />
                  </Button>
                  <span class="text-sm w-16">asd</span>
                  <Button
                    variant="ghost"
                    shape="square"
                    /* onClick={increaseDifficulty}
                    disabled={difficulty() == ctx.difficulties.length - 1} */
                  >
                    <TablerChevronRight />
                  </Button>
                </div>
              </div>
            </div>
            <Dialog.Actions class="grid grid-cols-1 sm:grid-cols-2">
              <Button class="sm:order-2" onClick={() => ctx.ui.setDialogState(null)}>
                {ctx.state() == "IDLE" ? "Play" : "Apply"}
              </Button>
              <Button
                variant="subtle"
                class="sm:order-1"
                asChild={(props) => <a {...props()} href="/minigames" />}
              >
                Back to Games
              </Button>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog>
  )
}

const StatsDialog = () => {
  const ctx = useRacingIconGame()

  return (
    <Dialog
      open={ctx.ui.dialogState() == "stats"}
      onOpenChange={({ open }) => ctx.ui.setDialogState(open ? "stats" : null)}
      lazyMount
      unmountOnExit
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content class="w-full max-w-lg text-center">
            <Dialog.Header class="gap-1">
              <div class="flex bg-base-300 text-accent rounded-full p-4 mx-auto mb-3">
                <TablerChartBar class="text-2xl" />
              </div>
              <Dialog.Title>Your Racing Icon stats</Dialog.Title>
            </Dialog.Header>
            <div class="flex flex-col divide-y divide-on-base/10 rounded-4 border border-on-base/10 mt-2 mb-2.5">
              <div class="flex items-center gap-2 px-4.5 py-3">
                <h5 class="text-left text-sm text-on-base/70 font-medium grow">Best score</h5>
                <p>0</p>
              </div>
              <div class="flex items-center gap-2 px-4.5 py-3">
                <h5 class="text-left text-sm text-on-base/70 font-medium grow">
                  Obstacles avoided
                </h5>
                <p>0</p>
              </div>
              <div class="flex items-center gap-2 px-4.5 py-3">
                <h5 class="text-left text-sm text-on-base/70 font-medium grow">Obstacles hit</h5>
                <p>0</p>
              </div>
            </div>
            <Dialog.Actions class="grid grid-cols-1">
              <Button
                variant="destructive"
                class="sm:w-1/2 sm:mx-auto" /* onClick={ctx.resetStats} */
              >
                Reset stats
              </Button>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog>
  )
}
