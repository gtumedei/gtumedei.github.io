import { Component, createSignal, For, onMount, Show } from "solid-js"
import { Transition } from "solid-transition-group"
import AspectRatio from "~/components/ui/aspect-ratio"
import Modal from "~/components/ui/modal"
import { createColorGuesserCtx, useColorGuesserCtx } from "~/lib/games/color-guesser/game"
import tooltip from "~/lib/tooltip"
import MdiCheck from "~icons/mdi/check"
import MdiClose from "~icons/mdi/close"
import MdiChevronLeft from "~icons/mdi/chevron-left"
import MdiChevronRight from "~icons/mdi/chevron-right"
import MdiEyedropperVariant from "~icons/mdi/eyedropper-variant"
import MdiMenu from "~icons/mdi/menu"
import MdiPoll from "~icons/mdi/poll"

tooltip

const SettingsModal = () => {
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
      persistent={ctx.game.difficulty == undefined}
    >
      <div class="bg-primary-focus flex rounded-full p-6 mb-6">
        <MdiEyedropperVariant class="text-3xl text-accent" />
      </div>
      <h4 class="section-subheading mb-2">Color Guesser</h4>
      <p class="text-sm mb-8">
        Are you nerd enough to guess a color based on its RGB code? Let's find out!
      </p>

      <div class="w-full flex flex-col border rounded-xl divide-y mb-8">
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

const StatsModal = () => {
  const ctx = useColorGuesserCtx()

  return (
    <Modal class="flex flex-col items-center text-center w-full" show={ctx.showStatsModal()} setShow={ctx.setShowStatsModal}>
      <div class="bg-primary-focus flex rounded-full p-6 mb-6">
        <MdiPoll class="text-3xl text-accent" />
      </div>
      <h4 class="section-subheading mb-8">Your Color Guesser Stats</h4>

      <div class="w-full flex flex-col border rounded-xl divide-y mb-8">
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

const Toolbar = () => {
  const ctx = useColorGuesserCtx()

  return (
    <div class="w-full flex items-center p-2 rounded-xl border">
      <p class="ml-3 flex-grow">Color code: {ctx.game.color}</p>
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

const Tile: Component<{ color: string }> = (props) => {
  const [success, setSuccess] = createSignal(false)
  const [error, setError] = createSignal(false)

  const ctx = useColorGuesserCtx()

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

  const onClick = async () => {
    const correct = ctx.gameActions.registerGuess(props.color)
    if (correct) {
      setSuccess(true)
      await sleep(500)
      setSuccess(false)
      ctx.gameActions.nextColor()
    } else {
      setError(true)
      await sleep(500)
      setError(false)
    }
  }

  return (
    <button
      class="group relative w-full h-full rounded-lg"
      style={`background-color: ${props.color};`}
      onClick={onClick}
    >
      <div class={`
        absolute -inset-1.5 rounded-xl border border-accent pointer-events-none
        bg-white-12 opacity-0 group-hover:opacity-100 transition-all
        ${success() ? "!opacity-100 !bg-white-50" : ""}
        ${error() ? "!opacity-100 !bg-white-50" : ""}
      `}>
        <MdiCheck class={`absolute-center h-1/2 w-1/2 text-black-54 ${success() ? "opacity-100" : "opacity-0"} transition-opacity`} />
        <MdiClose class={`absolute-center h-1/2 w-1/2 text-black-54 ${error() ? "opacity-100" : "opacity-0"} transition-opacity`} />
      </div>
    </button>
  )
}

const Board = () => {
  const ctx = useColorGuesserCtx()

  return (
    <Transition
      enterClass="opacity-0" exitToClass="opacity-0"
      enterActiveClass="transition-opacity" exitActiveClass="transition-opacity"
      mode="outin"
    >
      <Show when={ctx.game.colorGrid} keyed>{(colorGrid) => {
        const grid = ctx.game.difficulty?.grid // Make the grid size non-reactive to avoid bad looking animations on difficulty change
        return (
          <div class="h-full grid gap-3" style={`grid-template-columns: repeat(${grid}, minmax(0, 1fr));`}>
            <For each={colorGrid ?? []}>{(color) => <Tile color={color} />}</For>
          </div>
        )
      }
      }</Show>
    </Transition>
  )
}

const ColorGuesserGame: Component = () => {
  const [CtxProvider] = createColorGuesserCtx()
  return (
    <CtxProvider>
      <AspectRatio w={1} h={1}>
        <Board />
      </AspectRatio>
      <Toolbar />
      <SettingsModal />
      <StatsModal />
    </CtxProvider>
  )
}

export default ColorGuesserGame
