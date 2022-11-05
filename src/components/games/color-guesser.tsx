import { Component, createSignal, For, onMount, Show } from "solid-js"
import { Transition } from "solid-transition-group"
import { BoardContainer } from "~/components/ui/game"
import Modal from "~/components/ui/modal"
import { difficulties, gameCtx, nextColor, startGame } from "~/lib/games/color-guesser"
import tooltip from "~/lib/tooltip"
import MdiCheck from "~icons/mdi/check"
import MdiClose from "~icons/mdi/close"
import MdiChevronLeft from "~icons/mdi/chevron-left"
import MdiChevronRight from "~icons/mdi/chevron-right"
import MdiEyedropperVariant from "~icons/mdi/eyedropper-variant"
import MdiMenu from "~icons/mdi/menu"

tooltip

const [showSettingsModal, setShowSettingsModal] = createSignal(false)

const SettingsModal = () => {
  const [difficulty, setDifficulty] = createSignal(0)
  const increaseDifficulty = () => setDifficulty(v => Math.min(v + 1, difficulties.length - 1))
  const decreaseDifficulty = () => setDifficulty(v => Math.max(v - 1, 0))

  const onStartBtnClick = () => {
    setShowSettingsModal(false)
    startGame(difficulties[difficulty()])
  }

  return (
    <Modal
      class="flex flex-col items-center text-center w-full"
      show={showSettingsModal} setShow={setShowSettingsModal}
      persistent={gameCtx.difficulty == undefined}
    >
      <div class="bg-primary-dark flex rounded-full p-6 mb-6">
        <MdiEyedropperVariant class="text-3xl text-accent" />
      </div>
      <h4 class="section-subheading mb-2">Color Guesser</h4>
      <p class="text-sm mb-8">
        Are you nerd enough to guess a color based on its RGB HEX code? Let's find out!
      </p>

      <div class="w-full flex items-center gap-2 p-2 border rounded-xl mb-8">
        <h5 class="text-left text-sm font-mono font-bold flex-grow ml-2">Difficulty</h5>
        <div class="flex gap-2 items-center">
          <button class="btn icon" onClick={decreaseDifficulty} disabled={difficulty() == 0}>
            <MdiChevronLeft />
          </button>
          <span class="text-sm w-16">{difficulties[difficulty()].label}</span>
          <button class="btn icon" onClick={increaseDifficulty} disabled={difficulty() == difficulties.length - 1}>
            <MdiChevronRight />
          </button>
        </div>
      </div>

      <div class="w-full grid sm:grid-cols-2 gap-3">
        <button class="btn accent py-3" onClick={onStartBtnClick}>
          {gameCtx.difficulty == undefined ? "Play" : "Restart"}
        </button>
        <a href="/games" class="btn outline py-3">Back to Games</a>
      </div>
    </Modal>
  )
}

const Toolbar = () => {
  return (
    <div class="w-full flex items-center p-2 rounded-xl border">
      <p class="ml-3 flex-grow">Color code: {gameCtx.color}</p>
      <button
        class="btn icon"
        onClick={() => setShowSettingsModal(v => !v)}
        use:tooltip={[() => "Game Settings", "top"]}
      ><MdiMenu /></button>
    </div>
  )
}

const Tile: Component<{ color: string }> = (props) => {
  const [success, setSuccess] = createSignal(false)
  const [error, setError] = createSignal(false)

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

  const onClick = async () => {
    if (props.color == gameCtx.color) {
      setSuccess(true)
      await sleep(500)
      setSuccess(false)
      nextColor()
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
  return (
    <Transition
      enterClass="opacity-0" exitToClass="opacity-0"
      enterActiveClass="transition-opacity" exitActiveClass="transition-opacity"
      mode="outin"
    >
      <Show when={gameCtx.colorGrid} keyed>{(colorGrid) => {
        const grid = gameCtx.difficulty?.grid // Make the grid size non-reactive to avoid bad looking animations on difficulty change
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
  onMount(() => setShowSettingsModal(true))

  return (
    <>
      <BoardContainer>
        <Board />
      </BoardContainer>
      <Toolbar />
      <SettingsModal />
    </>
  )
}

export default ColorGuesserGame
