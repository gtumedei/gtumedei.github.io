import { Component, For, onCleanup, onMount, Show } from "solid-js"
import { Dynamic } from "solid-js/web"
import OpacityTransition from "~/components/opacity-transition"
import { cn } from "tailwind-variants"
import { useRacingIconGame, Vehicle } from "~/minigames/racing-icon/core"
import TablerCarSuvFilled from "~icons/tabler/car-suv-filled"

const RacingIconGameScreen = () => {
  const game = useRacingIconGame()

  return (
    <OpacityTransition>
      <Show when={game.state() != "IDLE"}>
        <div
          ref={game.elements.screen.setElem}
          class="w-full h-full flex bg-base-200 rounded-4 border border-on-base/10 relative overflow-hidden"
        >
          <Road />
          <PlayerVehicle />
          <For each={game.elements.vehicles}>{(vehicle) => <VehicleItem vehicle={vehicle} />}</For>
        </div>
      </Show>
    </OpacityTransition>
  )
}

const Road = () => {
  const lanes = useRacingIconGame().elements.lanes

  return (
    <div class="w-full h-1/3 bg-base-300 border-t-2 border-on-base/30 my-auto">
      <div ref={lanes.setLane1Elem} class="h-1/4 border-b-2 border-dashed border-on-base/30" />
      <div class="h-1/4 border-b-2 border-on-base/30" />
      <div class="h-1/4 border-b-2 border-dashed border-on-base/30" />
      <div class="h-1/4 border-b-2 border-on-base/30" />
    </div>
  )
}

const PlayerVehicle = () => {
  const {
    state,
    elements: { screen, lanes, playerVehicle },
  } = useRacingIconGame()

  const changeLane = (direction: "up" | "down") => {
    playerVehicle.setLane((v) => (direction == "up" ? Math.max(v - 1, 0) : Math.min(v + 1, 5)))
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
    <div
      ref={playerVehicle.setElem}
      class="h-1/16 aspect-square flex absolute transition-all duration-200"
      style={{
        top: `${
          lanes.lane1Bounds.top! -
          screen.bounds.top! +
          (playerVehicle.lane() - 1) * lanes.size()! +
          (lanes.size()! - playerVehicle.bounds.height!) / 2
        }px`,
        left: "16px",
      }}
    >
      <TablerCarSuvFilled
        class={cn(
          "w-9/10 h-9/10 m-auto",
          [0, 5].includes(playerVehicle.lane()) ? "animate-car-shake-strong" : "animate-car-shake",
          state() != "PLAYING" && "paused",
        )}
      />
    </div>
  )
}

const VehicleItem: Component<{ vehicle: Vehicle }> = (props) => {
  const {
    state,
    elements: { screen, lanes },
  } = useRacingIconGame()

  return (
    <div
      ref={props.vehicle.setElem}
      class={cn(
        "h-1/16 aspect-square flex absolute *:w-9/10 *:h-9/10 *:m-auto *:animate-car-shake",
        props.vehicle.direction == "opposite" && "*:scale-x-[-1]",
        state() != "PLAYING" && "*:paused",
      )}
      style={{
        top: `${
          lanes.lane1Bounds.top! -
          screen.bounds.top! +
          (props.vehicle.lane - 1) * lanes.size()! +
          (lanes.size()! - props.vehicle.bounds.height!) / 2
        }px`,
        left: "0",
      }}
    >
      <Dynamic component={props.vehicle.icon} />
    </div>
  )
}

export default RacingIconGameScreen
