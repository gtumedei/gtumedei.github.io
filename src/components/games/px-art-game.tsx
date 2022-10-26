import { Component, For, mergeProps } from "solid-js"
import { createStore } from "solid-js/store"
import MdiCircle from "~icons/mdi/circle"
import MdiEraser from "~icons/mdi/eraser"
import MdiGrid from "~icons/mdi/grid"
import MdiPencil from "~icons/mdi/pencil"
import MdiRedo from "~icons/mdi/redo"
import MdiTrashCan from "~icons/mdi/trash-can"
import MdiTrayArrowDown from "~icons/mdi/tray-arrow-down"
import MdiUndo from "~icons/mdi/undo"

const Toolbar = () => {
  return (
    <div class="w-full flex p-2 rounded-xl border-1 border-typography-hover mb-6">
      <button class="btn icon"><MdiPencil class="text-lg" /></button>
      <button class="btn icon"><MdiEraser class="text-lg" /></button>
      <button class="btn icon"><MdiCircle class="text-lg" /></button>
      <button class="btn icon"><MdiGrid class="text-lg" /></button>
      <div class="flex-grow" />
      <button class="btn icon"><MdiUndo class="text-lg" /></button>
      <button class="btn icon"><MdiRedo class="text-lg" /></button>
      <button class="btn icon"><MdiTrashCan class="text-lg" /></button>
      <button class="btn icon"><MdiTrayArrowDown class="text-lg" /></button>
    </div>
  )
}

type Pixel = { hexValue: string }

const Board: Component<{ size?: number }> = (props) => {
  const allProps = mergeProps({ size: 64 }, props)
  const [pixels] = createStore(new Array(allProps.size * allProps.size).fill({ hexValue: "#FF8888" }) as Pixel[])

  return (
    <div class="grid" style={`grid-template-columns: repeat(${allProps.size}, 1fr);`}>
      <For each={pixels}>{(pixel) =>
        <div class="h-2 w-2" style={`background-color: ${pixel.hexValue};`} />
      }</For>
    </div>
  )
}

const PxArtGame: Component = () => {
  return (
    <>
      <Toolbar />
      {/* <Board /> */}
    </>
  )
}

export default PxArtGame
