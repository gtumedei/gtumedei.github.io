import { Component, createSignal, For, mergeProps } from "solid-js"
import { BoardContainer } from "~/components/games/ui"
import Modal from "~/components/ui/modal"
import tooltip from "~/lib/tooltip"
import MdiCog from "~icons/mdi/cog"
import MdiEyedropperVariant from "~icons/mdi/eyedropper-variant"

tooltip

const [showSettingsModal, setShowSettingsModal] = createSignal(true)

const SettingsModal = () => {
  return (
    <Modal show={showSettingsModal} setShow={setShowSettingsModal}>
      <div class="flex flex-col items-center text-center w-96">
        <div class="bg-primary-dark flex rounded-full p-6 mb-6">
          <MdiEyedropperVariant class="text-3xl text-accent" />
        </div>
        <h4 class="section-subheading mb-2">Color Guesser</h4>
        <p class="text-sm mb-6">
          Are you nerd enough to guess a color based on its RGB HEX code? Let's find out!
        </p>
        <div class="w-full grid sm:grid-cols-2 gap-3">
          <button class="btn accent py-3" onClick={() => setShowSettingsModal(false)}>
            Play
          </button>
          <button class="btn outline py-3" onClick={() => setShowSettingsModal(false)}>
            Back to Games
          </button>
        </div>
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
