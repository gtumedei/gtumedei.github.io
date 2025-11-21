import { createElementBounds } from "@solid-primitives/bounds"
import { onCleanup, onMount } from "solid-js"
import { createStore } from "solid-js/store"
import cn from "~/lib/cn"
import TablerCarSuvFilled from "~icons/tabler/car-suv-filled"

// Obstacle icons: fence, christmas-tree, tree
// Vehicles: car, suv, car-crane, camper, bus, truck, rv-truck, firetruck, ambulance, wrecking-ball, backhoe, bulldozer, tractor, tir, tank, bike

const RacingIconGameScreen = () => {
  const [state, setState] = createStore({
    carLane: 4,
  })

  let screen!: HTMLDivElement
  let lane1!: HTMLDivElement
  let lane2!: HTMLDivElement
  let lane3!: HTMLDivElement
  let lane4!: HTMLDivElement
  let playerCar!: HTMLDivElement

  const screenBounds = createElementBounds(() => screen)
  const lane1Bounds = createElementBounds(() => lane1)
  const lane2Bounds = createElementBounds(() => lane2)
  const lane3Bounds = createElementBounds(() => lane3)
  const lane4Bounds = createElementBounds(() => lane4)
  const laneSize = () => lane1Bounds.height
  const playerCarBounds = createElementBounds(() => playerCar)

  const changeLane = (direction: "up" | "down") => {
    setState("carLane", (v) => (direction == "up" ? Math.max(v - 1, 0) : Math.min(v + 1, 5)))
  }

  onMount(() => {
    const onKeydown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (["w", "arrowup"].includes(key)) changeLane("up")
      if (["s", "arrowdown"].includes(key)) changeLane("down")
    }
    document.addEventListener("keydown", onKeydown)
    onCleanup(() => document.removeEventListener("keydown", onKeydown))
  })

  return (
    <div ref={screen} class="w-full h-full flex bg-base-200 rounded-2xl border border-on-base/10">
      <div class="w-full h-1/3 bg-base-300 border-t-2 border-on-base/30 my-auto">
        <div ref={lane1} class="h-1/4 border-b-2 border-dashed border-on-base/30" />
        <div ref={lane2} class="h-1/4 border-b-2 border-on-base/30" />
        <div ref={lane3} class="h-1/4 border-b-2 border-dashed border-on-base/30" />
        <div ref={lane4} class="h-1/4 border-b-2 border-on-base/30" />
      </div>

      <div
        ref={playerCar}
        class="h-1/16 aspect-square flex absolute transition-all duration-100"
        style={{
          top: `${
            lane1Bounds.top! -
            screenBounds.top! +
            (state.carLane - 1) * laneSize()! +
            (laneSize()! - playerCarBounds.height!) / 2
          }px`,
          left: "16px",
        }}
      >
        <TablerCarSuvFilled
          class={cn(
            "w-9/10 h-9/10 m-auto",
            [0, 5].includes(state.carLane) ? "animate-car-shake-strong" : "animate-car-shake"
          )}
        />
      </div>
    </div>
  )
}

export default RacingIconGameScreen
