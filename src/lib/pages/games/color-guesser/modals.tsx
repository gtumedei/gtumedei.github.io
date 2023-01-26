import { createSignal, onMount } from "solid-js"
import Modal from "~/lib/ui/modal"
import MdiChevronLeft from "~icons/mdi/chevron-left"
import MdiChevronRight from "~icons/mdi/chevron-right"
import MdiEyedropperVariant from "~icons/mdi/eyedropper-variant"
import MdiPoll from "~icons/mdi/poll"
import { useColorGuesserCtx } from "./core"

export const SettingsModal = () => {
  const ctx = useColorGuesserCtx()

  const [difficulty, setDifficulty] = createSignal(0)
  const increaseDifficulty = () => setDifficulty(v => Math.min(v + 1, ctx.difficulties.length - 1))
  const decreaseDifficulty = () => setDifficulty(v => Math.max(v - 1, 0))

  const [mode, setMode] = createSignal(0)
  const nextMode = () => setMode(v => Math.min(v + 1, ctx.modes.length - 1))
  const prevMode = () => setMode(v => Math.max(v - 1, 0))

  const onStartBtnClick = () => {
    ctx.setShowSettingsModal(false)
    ctx.gameActions.startGame(ctx.difficulties[difficulty()], ctx.modes[mode()])
  }

  onMount(() => ctx.setShowSettingsModal(true))

  return (
    <Modal
      class="flex flex-col items-center text-center w-full"
      show={ctx.showSettingsModal()} setShow={ctx.setShowSettingsModal}
      persistent={ctx.game.state == "IDLE"}
    >
      <div class="bg-primary-focus flex rounded-full p-6 mb-6">
        <MdiEyedropperVariant class="text-xl text-accent" />
      </div>
      <h4 class="section-subheading mb-2">Color Guesser</h4>
      <p class="text-sm mb-8">
        Are you nerd enough to guess a color based on its RGB code? Let's find out!
      </p>

      <div class="card w-full flex flex-col divide-y mb-8">
        <div class="w-full flex items-center gap-2 p-2">
          <h5 class="text-left text-sm font-mono font-bold flex-grow ml-2">Difficulty</h5>
          <div class="flex gap-2 items-center">
            <button class="btn btn-icon" onClick={decreaseDifficulty} disabled={difficulty() == 0}>
              <MdiChevronLeft />
            </button>
            <span class="text-sm w-16">{ctx.difficulties[difficulty()].label}</span>
            <button class="btn btn-icon" onClick={increaseDifficulty} disabled={difficulty() == ctx.difficulties.length - 1}>
              <MdiChevronRight />
            </button>
          </div>
        </div>
        <div class="w-full flex items-center gap-2 p-2">
          <h5 class="text-left text-sm font-mono font-bold flex-grow ml-2">Mode</h5>
          <div class="flex gap-2 items-center">
            <button class="btn btn-icon" onClick={prevMode} disabled={mode() == 0}>
              <MdiChevronLeft />
            </button>
            <span class="text-sm w-16">{ctx.modes[mode()]}</span>
            <button class="btn btn-icon" onClick={nextMode} disabled={mode() == ctx.difficulties.length - 1}>
              <MdiChevronRight />
            </button>
          </div>
        </div>
      </div>

      <div class="w-full grid sm:grid-cols-2 gap-3">
        <button class="btn btn-accent" onClick={onStartBtnClick}>
          {ctx.game.state == "IDLE" ? "Play" : "Apply"}
        </button>
        <a href="/games" class="btn btn-outline">Back to Games</a>
      </div>
    </Modal>
  )
}

export const StatsModal = () => {
  const ctx = useColorGuesserCtx()

  return (
    <Modal class="flex flex-col items-center text-center w-full" show={ctx.showStatsModal()} setShow={ctx.setShowStatsModal}>
      <div class="bg-primary-focus flex rounded-full p-6 mb-6">
        <MdiPoll class="text-xl text-accent" />
      </div>
      <h4 class="section-subheading mb-8">Your Color Guesser Stats</h4>

      <div class="card w-full flex flex-col divide-y mb-8">
        <div class="w-full flex items-center gap-2 px-4 py-3">
          <h5 class="text-left text-sm font-mono font-bold flex-grow">Best streak</h5>
          <p>{ctx.storage.streak ? `(${ctx.storage.streakDifficulty}) ${ctx.storage.streak}` : 0}</p>
        </div>
        <div class="w-full flex items-center gap-2 px-4 py-3">
          <h5 class="text-left text-sm font-mono font-bold flex-grow">Total guesses</h5>
          <p>{(ctx.storage.rightGuesses ?? 0) + (ctx.storage.wrongGuesses ?? 0)}</p>
        </div>
        <div class="w-full flex items-center gap-2 px-4 py-3">
          <h5 class="text-left text-sm font-mono font-bold flex-grow">Accuracy</h5>
          <p>{+((ctx.storage.rightGuesses ?? 0) / ((ctx.storage.rightGuesses ?? 0) + (ctx.storage.wrongGuesses ?? 0))).toFixed(3)}</p>
        </div>
      </div>

      <div class="w-full flex">
        <button class="btn btn-accent w-full sm:w-1/2 m-auto" onClick={ctx.resetStorage}>
          Reset stats
        </button>
      </div>
    </Modal>
  )
}