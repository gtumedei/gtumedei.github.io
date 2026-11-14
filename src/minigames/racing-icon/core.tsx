import { createElementBounds, NullableBounds } from "@solid-primitives/bounds"
import { animate, AnimationPlaybackControlsWithThen } from "motion"
import { createRoot, createSignal, createUniqueId, getOwner, JSX, onCleanup } from "solid-js"
import { createStore } from "solid-js/store"
import { isServer } from "solid-js/web"
import { create } from "~/lib/context"
import { vehicleIcons } from "~/minigames/racing-icon/icons"

export type GameState = "IDLE" | "PLAYING" | "PAUSED" | "GAME_OVER"
export type DialogState = "menu" | "stats" | null

export type Vehicle = {
  id: string
  lane: number
  speed: number
  direction: "same" | "opposite"
  icon: () => JSX.Element
  elem: HTMLDivElement | undefined
  setElem: (elem: HTMLDivElement) => void
  bounds: Readonly<NullableBounds>
  animation: AnimationPlaybackControlsWithThen | undefined
  setAnimation: (anim: AnimationPlaybackControlsWithThen) => void
}

export const [RacingIconGameProvider, useRacingIconGame] = create(() => {
  const [screenElem, setScreenElem] = createSignal<HTMLDivElement>()
  const screenBounds = createElementBounds(screenElem)

  const [lane1Elem, setLane1Elem] = createSignal<HTMLDivElement>()
  const lane1Bounds = createElementBounds(lane1Elem)
  const laneSize = () => lane1Bounds.height

  const [playerVehicleLane, setPlayerVehicleLane] = createSignal(4)
  const [playerVehicleElem, setPlayerVehicleElem] = createSignal<HTMLDivElement>()
  const playerVehicleBounds = createElementBounds(playerVehicleElem)

  const [vehicles, setVehicles] = createStore<Vehicle[]>([])

  // Handle spawning of elements

  const randomInt = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const spawnVehicle = async () => {
    const id = createUniqueId()
    const lane = randomInt(1, 4)
    const vehicle: Vehicle = {
      id,
      lane,
      speed: 0.5,
      direction: lane > 2 ? "same" : "opposite",
      icon: vehicleIcons[randomInt(0, vehicleIcons.length - 1)]!,
      elem: undefined,
      setElem: (elem) => setVehicles((v) => v.id == id, "elem", elem),
      bounds: createElementBounds(() => vehicles.find((v) => v.id == id)?.elem),
      animation: undefined,
      setAnimation: (anim) => setVehicles((v) => v.id == id, "animation", anim),
    }
    setVehicles((v) => [...v, vehicle])
    await new Promise((r) => setTimeout(r, 0)) // Wait for the vehicle component to mount
    const animation = animate([
      [
        vehicle.elem!,
        { translateX: [game.elements.screen.bounds.width, -vehicle.bounds.width!] },
        { duration: 4, ease: "linear" },
      ],
    ])
    if (dialogState() != null) animation.pause()
    vehicle.setAnimation(animation)
    await animation // Wait for the vehicle to pass through the screen
    setVehicles((vehicles) => vehicles.filter((v) => v.id != id)) // Despawn the vehicle
  }

  let spawnTimeout: NodeJS.Timeout | undefined = undefined
  const owner = getOwner()
  const spawnLoop = () => {
    spawnTimeout = setInterval(() => {
      createRoot(() => {
        spawnVehicle()
      }, owner)
    }, 3000)
  }
  onCleanup(() => clearInterval(spawnTimeout))

  // Handle collisions

  const isColliding = (a: HTMLElement, b: HTMLElement) => {
    const rect1 = a.getBoundingClientRect()
    const rect2 = b.getBoundingClientRect()
    return !(
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.left > rect2.right
    )
  }

  let frameHandle: number = 0
  const collisionLoop = () => {
    const playerVehicle = game.elements.playerVehicle.elem()
    if (playerVehicle) {
      for (const vehicle of vehicles) {
        if (!vehicle.elem) continue
        if (isColliding(playerVehicle, vehicle.elem)) {
          setState("GAME_OVER")
        }
      }
    }
    frameHandle = requestAnimationFrame(collisionLoop)
  }
  onCleanup(() => {
    if (isServer) return
    cancelAnimationFrame(frameHandle)
  })

  /* const initialStats = {
    streak: 0,
    streakDifficulty: "",
    rightGuesses: 0,
    wrongGuesses: 0,
  }
  const [stats, setStats] = makePersisted(createStore({ ...initialStats }), {
    name: "gtumedei-io-color-guesser",
    storage: isServer ? undefined : localStorage,
  })
  const resetStats = () => setStats({ ...initialStats }) */

  const [state, _setState] = createSignal<GameState>("IDLE")
  const [dialogState, _setDialogState] = createSignal<DialogState>(null)

  const setState = (v: GameState) => {
    _setState(v)
    toggleGameLoop(v == "PLAYING")
  }
  const setDialogState = (v: DialogState) => {
    _setDialogState(v)
    // Pause and unpause the game when a menu is opened/closed
    if (v != null && state() == "PLAYING") setState("PAUSED")
    if (v == null && ["IDLE", "PAUSED"].includes(state())) setState("PLAYING")
  }

  const toggleGameLoop = (on: boolean) => {
    if (on) {
      vehicles.forEach((v) => v.animation?.play())
      spawnLoop()
      collisionLoop()
    } else {
      vehicles.forEach((v) => v.animation?.pause())
      clearInterval(spawnTimeout)
      cancelAnimationFrame(frameHandle)
    }
  }
  // createEffect(on(dialogState, (state) => togglePause(state != null)))

  const game = {
    state,
    setState,
    ui: {
      dialogState,
      setDialogState,
    },
    elements: {
      screen: {
        elem: screenElem,
        setElem: setScreenElem,
        bounds: screenBounds,
      },
      lanes: {
        size: laneSize,
        lane1Elem,
        setLane1Elem,
        lane1Bounds,
      },
      playerVehicle: {
        lane: playerVehicleLane,
        setLane: setPlayerVehicleLane,
        elem: playerVehicleElem,
        setElem: setPlayerVehicleElem,
        bounds: playerVehicleBounds,
      },
      vehicles: vehicles,
      obstacles: [],
      decorations: [],
    },
  }
  return game
})
