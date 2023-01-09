import Matter from "matter-js"
import { Component, onMount } from "solid-js"
import { BoardContainer } from "~/components/ui/game"
import { useThemeColors } from "~/lib/theme-colors"
import tooltip from "~/lib/tooltip"
import MdiMenu from "~icons/mdi/menu"

tooltip;

const {
  Engine,
  Render,
  Runner,
  Composites,
  Events,
  Constraint,
  MouseConstraint,
  Mouse,
  Composite,
  Bodies
} = Matter

const createSlingShot = (container: HTMLElement) => {
  const themeData = useThemeColors()
  const { offsetHeight: containerHeight, offsetWidth: containerWidth } = container

  // Create engine
  const engine = Engine.create()
  const { world } = engine

  // Create renderer
  const render = Render.create({
    element: container,
    engine: engine,
    options: {
      width: containerWidth,
      height: containerHeight,
      wireframes: false,
      background: themeData.primary
      // showAngleIndicator: true
    }
  })

  Render.run(render)

  // Create runner
  const runner = Runner.create()
  Runner.run(runner, engine)

  // Add bodies
  const ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true, render: { fillStyle: themeData.invertedPrimary } })
  const rockOptions = { density: 0.004 }
  let rock = Bodies.polygon(170, 450, 8, 20, rockOptions)
  const anchor = { x: 170, y: 450 }
  const elastic = Constraint.create({
    pointA: anchor,
    bodyB: rock,
    stiffness: 0.05,
    render: {
      strokeStyle: `backgroundColor: ${themeData.invertedPrimary};`
    }
  })

  const pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, (x: number, y: number) => {
    return Bodies.rectangle(x, y, 25, 40)
  })

  const ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true, render: { fillStyle: "#00FF00" } })

  const pyramid2 = Composites.pyramid(550, 0, 5, 10, 0, 0, (x: number, y: number) => {
    return Bodies.rectangle(x, y, 25, 40)
  })

  Composite.add(engine.world, [ground, pyramid, ground2, pyramid2, rock, elastic])

  Events.on(engine, "afterUpdate", () => {
    if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
      rock = Bodies.polygon(170, 450, 7, 20, rockOptions)
      Composite.add(engine.world, rock)
      elastic.bodyB = rock
    }
  })

  // Add mouse control
  const mouse = Mouse.create(render.canvas)
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  })

  Composite.add(world, mouseConstraint)

  // Keep the mouse in sync with rendering
  render.mouse = mouse

  // Fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: containerWidth, y: containerHeight }
  })

  // Context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: () => {
      Matter.Render.stop(render)
      Matter.Runner.stop(runner)
    }
  }
}

const MatterSlingshot: Component = () => {
  let container!: HTMLDivElement

  onMount(() => createSlingShot(container))

  return (
    <div class="h-full w-full rounded-xl border overflow-hidden">
      <div ref={container} class="h-full w-full" />
    </div>
  )
}

const Toolbar = () => {
  return (
    <div class="w-full flex items-center p-2 rounded-xl border">
      <p class="ml-3 flex-grow">Color code</p>
      <button
        class="btn btn-icon"
        use:tooltip={[() => "Menu", "top"]}
      ><MdiMenu /></button>
    </div>
  )
}

const SlingshotGame: Component = () => {
  return (
    <>
      <BoardContainer>
        <MatterSlingshot />
      </BoardContainer>
      <Toolbar />
    </>
  )
}

export default SlingshotGame
