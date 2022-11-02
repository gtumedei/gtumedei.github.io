import { Component, createSignal, For, mergeProps } from "solid-js"
import { BoardContainer } from "~/components/games/ui"
import Modal from "~/components/ui/modal"
import tooltip from "~/lib/tooltip"
import MdiChevronLeft from "~icons/mdi/chevron-left"
import MdiChevronRight from "~icons/mdi/chevron-right"
import MdiCog from "~icons/mdi/cog"
import MdiEyedropperVariant from "~icons/mdi/eyedropper-variant"
import MdiSpeedometer from "~icons/mdi/speedometer"

tooltip

const [showSettingsModal, setShowSettingsModal] = createSignal(true)

const difficulties = [
  { label: "Easy", grid: 2 },
  { label: "Normal", grid: 3 },
  { label: "Hard", grid: 4 },
  { label: "Harder", grid: 5 },
  { label: "Hardest", grid: 6 }
]
const [difficulty, setDifficulty] = createSignal(0)

const [gameState, setGameState] = createSignal<"IDLE" | "PLAYING">("IDLE")

const SettingsModal = () => {
  const increaseDifficulty = () => setDifficulty(v => Math.min(v + 1, difficulties.length - 1))
  const decreaseDifficulty = () => setDifficulty(v => Math.max(v - 1, 0))

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

      <div class="w-full flex items-center gap-3 p-2 border rounded-xl mb-8">
        <div class="flex bg-primary-dark text-accent rounded-lg p-3">
          <MdiSpeedometer />
        </div>
        <h5 class="text-left font-bold tracking-wider flex-grow ml-2">Difficulty</h5>
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
        {gameState() == "IDLE"
          ? <button class="btn accent py-3" onClick={() => setShowSettingsModal(false)}>
              Play
            </button>
          : <button class="btn accent py-3" onClick={() => setShowSettingsModal(false)}>
              Restart
            </button>
        }
        <a href="/games" class="btn outline py-3">Back to Games</a>
      </div>
    </Modal>
  )
}

const Toolbar = () => {
  return (
    <div class="w-full flex items-center p-2 rounded-xl border">
      <p class="ml-3 flex-grow">Color code: #FF0000</p>
      <button
        class="btn icon"
        onClick={() => setShowSettingsModal(v => !v)}
        use:tooltip={[() => "Game Settings", "top"]}
      ><MdiCog /></button>
    </div>
  )
}

const Board: Component<{ colorCount?: number }> = (props) => {
  const allProps = mergeProps({ colorCount: 36 }, props)

  return (
    <div class="h-full grid grid-cols-6 gap-3">
      <For each={new Array(allProps.colorCount)}>{() =>
        <div class="w-full h-full bg-accent rounded-lg" />
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
