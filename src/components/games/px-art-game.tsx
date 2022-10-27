import { Component, For, mergeProps } from "solid-js"
import { createStore } from "solid-js/store"
import tooltip from "~/lib/tooltip"
import MdiCircle from "~icons/mdi/circle"
import MdiEraser from "~icons/mdi/eraser"
import MdiPencil from "~icons/mdi/pencil"
import MdiRedo from "~icons/mdi/redo"
import MdiTrashCan from "~icons/mdi/trash-can"
import MdiTrayArrowDown from "~icons/mdi/tray-arrow-down"
import MdiUndo from "~icons/mdi/undo"

tooltip

const Toolbar = () => {
  return (
    <div class="w-full flex flex-wrap p-2 rounded-xl border mb-6">
      <div class="flex-grow flex">
        <button class="btn icon" use:tooltip={[() => "Pencil", "bottom"]}>
          <MdiPencil class="text-lg" />
        </button>
        <button class="btn icon" use:tooltip={[() => "Eraser", "bottom"]}>
          <MdiEraser class="text-lg" />
        </button>
        <button class="btn icon" use:tooltip={[() => "Color", "bottom"]}>
          <MdiCircle class="text-lg" />
        </button>
      </div>
      <div class="flex-grow flex justify-end">
        <button class="btn icon" use:tooltip={[() => "Undo", "bottom"]}>
          <MdiUndo class="text-lg" />
        </button>
        <button class="btn icon" use:tooltip={[() => "Redo", "bottom"]}>
          <MdiRedo class="text-lg" />
        </button>
        <button class="btn icon" use:tooltip={[() => "Clear", "bottom"]}>
          <MdiTrashCan class="text-lg" />
        </button>
        <button class="btn icon" use:tooltip={[() => "Download image", "bottom"]}>
          <MdiTrayArrowDown class="text-lg" />
        </button>
      </div>
    </div>
  )
}

type Pixel = { hexValue?: string }

const Board: Component<{ size?: number }> = (props) => {
  const allProps = mergeProps({ size: 32 }, props)
  const [pixels, setPixels] = createStore(
    new Array(allProps.size).fill(undefined).map(() =>
      new Array(allProps.size).fill(undefined).map(() => ({ hexValue: undefined }))) as Pixel[][]
  )

  const onClick = (i: number, j: number) => {
    setPixels(i, j, { hexValue: "#FF8888" })
  }

  return (
    <div class="relative rounded-xl border">
      <div class="aspect-square grid grid-rows-[repeat(32,1fr)] divide-y-[1px] divide-neutral-8">
        <For each={pixels}>{(row) =>
          <div class="grid grid-cols-[repeat(32,1fr)] divide-x-[1px] divide-neutral-8">
            <For each={row}>{() => <div />}</For>
          </div>
        }</For>
      </div>
      <div class="absolute inset-0 aspect-square grid grid-rows-[repeat(32,1fr)]">
        <For each={pixels}>{(row, i) =>
          <div class="grid grid-cols-[repeat(32,1fr)]">
            <For each={row}>{(pixel, j) =>
              <div
                style={`background-color: ${pixel.hexValue ?? "transparent"};`}
                onClick={() => onClick(i(), j())}
              />
            }</For>
          </div>
        }</For>
      </div>
    </div>
  )
}

const PxArtGame: Component = () => {
  return (
    <>
      <Toolbar />
      <Board />
    </>
  )
}

export default PxArtGame
