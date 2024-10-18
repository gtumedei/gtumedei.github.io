import { createSignal, onMount } from "solid-js"
import { Portal } from "solid-js/web"
import { Button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import TablerChartBar from "~icons/tabler/chart-bar"
import TablerChevronLeft from "~icons/tabler/chevron-left"
import TablerChevronRight from "~icons/tabler/chevron-right"
import TablerColorSwatch from "~icons/tabler/color-swatch"
import { useColorGuesserGame } from "."

const MenuDialog = () => {
  const ctx = useColorGuesserGame()

  const [difficulty, setDifficulty] = createSignal(0)
  const increaseDifficulty = () =>
    setDifficulty((v) => Math.min(v + 1, ctx.difficulties.length - 1))
  const decreaseDifficulty = () => setDifficulty((v) => Math.max(v - 1, 0))

  const [mode, setMode] = createSignal(0)
  const nextMode = () => setMode((v) => Math.min(v + 1, ctx.modes.length - 1))
  const prevMode = () => setMode((v) => Math.max(v - 1, 0))

  const onStartBtnClick = () => {
    ctx.ui.setDialogState(null)
    ctx.gameActions.startGame(ctx.difficulties[difficulty()]!, ctx.modes[mode()]!)
  }

  onMount(() => ctx.ui.setDialogState("menu"))

  return (
    <Dialog
      open={ctx.ui.dialogState() == "menu"}
      onOpenChange={({ open }) => ctx.ui.setDialogState(open ? "menu" : null)}
      closeOnEscape={ctx.game.state != "IDLE"}
      closeOnInteractOutside={ctx.game.state != "IDLE"}
      lazyMount
      unmountOnExit
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content class="w-full max-w-lg text-center">
            <div class="flex bg-base-300 text-accent rounded-full p-4 mx-auto">
              <TablerColorSwatch class="text-2xl" />
            </div>
            <Dialog.Header>
              <Dialog.Title>Color Guesser</Dialog.Title>
              <Dialog.Description class="text-balance">
                Are you nerd enough to guess a color based on its RGB code? Let's find out!
              </Dialog.Description>
            </Dialog.Header>
            <div class="flex flex-col divide-y divide-on-base/10 rounded-xl border border-on-base/10 mt-2 mb-2.5">
              <div class="flex items-center gap-2 p-2">
                <h5 class="text-left text-sm text-on-base/70 font-medium flex-grow ml-2.5">
                  Difficulty
                </h5>
                <div class="flex gap-2 items-center">
                  <Button
                    variant="ghost"
                    shape="square"
                    onClick={decreaseDifficulty}
                    disabled={difficulty() == 0}
                  >
                    <TablerChevronLeft />
                  </Button>
                  <span class="text-sm w-16">{ctx.difficulties[difficulty()]!.label}</span>
                  <Button
                    variant="ghost"
                    shape="square"
                    onClick={increaseDifficulty}
                    disabled={difficulty() == ctx.difficulties.length - 1}
                  >
                    <TablerChevronRight />
                  </Button>
                </div>
              </div>
              <div class="flex items-center gap-2 p-2">
                <h5 class="text-left text-sm text-on-base/70 font-medium flex-grow ml-2.5">Mode</h5>
                <div class="flex gap-2 items-center">
                  <Button variant="ghost" shape="square" onClick={prevMode} disabled={mode() == 0}>
                    <TablerChevronLeft />
                  </Button>
                  <span class="text-sm w-16">{ctx.modes[mode()]}</span>
                  <Button
                    variant="ghost"
                    shape="square"
                    onClick={nextMode}
                    disabled={mode() == ctx.difficulties.length - 1}
                  >
                    <TablerChevronRight />
                  </Button>
                </div>
              </div>
            </div>
            <Dialog.Actions class="grid grid-cols-1 sm:grid-cols-2">
              <Button theme="accent" class="sm:order-2" onClick={onStartBtnClick}>
                {ctx.game.state == "IDLE" ? "Play" : "Apply"}
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
  const ctx = useColorGuesserGame()

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
            <div class="flex bg-base-300 text-accent rounded-full p-4 mx-auto">
              <TablerChartBar class="text-2xl" />
            </div>
            <Dialog.Header>
              <Dialog.Title>Your Color Guesser stats</Dialog.Title>
            </Dialog.Header>
            <div class="flex flex-col divide-y divide-on-base/10 rounded-xl border border-on-base/10 mt-2 mb-2.5">
              <div class="flex items-center gap-2 px-[1.125rem] py-3">
                <h5 class="text-left text-sm text-on-base/70 font-medium flex-grow">Best streak</h5>
                <p>
                  {ctx.stats.streak ? `(${ctx.stats.streakDifficulty}) ${ctx.stats.streak}` : 0}
                </p>
              </div>
              <div class="flex items-center gap-2 px-[1.125rem] py-3">
                <h5 class="text-left text-sm text-on-base/70 font-medium flex-grow">
                  Total guesses
                </h5>
                <p>{(ctx.stats.rightGuesses ?? 0) + (ctx.stats.wrongGuesses ?? 0)}</p>
              </div>
              <div class="flex items-center gap-2 px-[1.125rem] py-3">
                <h5 class="text-left text-sm text-on-base/70 font-medium flex-grow">Accuracy</h5>
                <p>
                  {
                    +(
                      (ctx.stats.rightGuesses ?? 0) /
                      ((ctx.stats.rightGuesses ?? 0) + (ctx.stats.wrongGuesses ?? 0))
                    ).toFixed(3)
                  }
                </p>
              </div>
            </div>
            <Dialog.Actions class="grid grid-cols-1">
              <Button theme="accent" class="sm:w-1/2 sm:mx-auto" onClick={ctx.resetStats}>
                Reset stats
              </Button>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog>
  )
}

export const ColorGuesserDialogs = () => {
  return (
    <>
      <MenuDialog />
      <StatsDialog />
    </>
  )
}
