import { Component, createSignal, For } from "solid-js"
import { BoardContainer } from "~/components/games/ui"
import Modal from "~/components/ui/modal"
import { difficulties, gameCtx, nextColor, startGame } from "~/lib/games/color-guesser"
import tooltip from "~/lib/tooltip"
import MdiChevronLeft from "~icons/mdi/chevron-left"
import MdiChevronRight from "~icons/mdi/chevron-right"
import MdiCog from "~icons/mdi/cog"
import MdiEyedropperVariant from "~icons/mdi/eyedropper-variant"

tooltip

const [showSettingsModal, setShowSettingsModal] = createSignal(true)

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
      ><MdiCog /></button>
    </div>
  )
}

const Board = () => {
  const onColorClick = (color: string) => {
    if (color == gameCtx.color) {
      console.log("Correct!")
      nextColor()
    } else {
      console.log("Wrong guess :(")
    }
  }

  return (
    <div class="h-full grid gap-3" style={`grid-template-columns: repeat(${gameCtx.difficulty?.grid}, minmax(0, 1fr));`}>
      <For each={gameCtx.colorGrid ?? []}>{(color) =>
        <div class="w-full h-full rounded-lg" style={`background-color: ${color};`} onClick={() => onColorClick(color)} />
      }</For>
    </div>
  )
}

const ColorGuesserGame: Component = () => {
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
