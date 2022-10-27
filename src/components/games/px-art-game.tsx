import { Component, For, mergeProps } from "solid-js"
import { createStore } from "solid-js/store"
import { BoardContainer } from "~/components/games/ui"
import tooltip from "~/lib/tooltip"
import MdiCircle from "~icons/mdi/circle"
import MdiFormatColorFill from "~icons/mdi/format-color-fill"
import MdiEraser from "~icons/mdi/eraser"
import MdiPencil from "~icons/mdi/pencil"
import MdiRedo from "~icons/mdi/redo"
import MdiTrashCan from "~icons/mdi/trash-can"
import MdiTrayArrowDown from "~icons/mdi/tray-arrow-down"
import MdiUndo from "~icons/mdi/undo"

tooltip

const Toolbar = () => {
  return (
    <div class="w-full flex overflow-x-auto p-2 rounded-xl border">
      <button class="btn icon ml-auto" use:tooltip={[() => "Pencil", "top"]}>
        <MdiPencil class="text-lg" />
      </button>
      <button class="btn icon" use:tooltip={[() => "Bucket", "top"]}>
        <MdiFormatColorFill class="text-lg" />
      </button>
      <button class="btn icon" use:tooltip={[() => "Eraser", "top"]}>
        <MdiEraser class="text-lg" />
      </button>
      <button class="btn icon" use:tooltip={[() => "Color", "top"]}>
        <MdiCircle class="text-lg" />
      </button>
      <div class="flex-grow" />
      <button class="btn icon" use:tooltip={[() => "Undo", "top"]}>
        <MdiUndo class="text-lg" />
      </button>
      <button class="btn icon" use:tooltip={[() => "Redo", "top"]}>
        <MdiRedo class="text-lg" />
      </button>
      <button class="btn icon" use:tooltip={[() => "Clear", "top"]}>
        <MdiTrashCan class="text-lg" />
      </button>
      <button class="btn icon" use:tooltip={[() => "Download image", "top"]}>
        <MdiTrayArrowDown class="text-lg" />
      </button>
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
      <BoardContainer>
        <Board />
      </BoardContainer>
      <Toolbar />
    </>
  )
}

export default PxArtGame
