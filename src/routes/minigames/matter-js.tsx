import Matter from "matter-js"
import { onMount } from "solid-js"

const { Engine, Render, Runner, Composites, Common, MouseConstraint, Mouse, Composite, Bodies } =
  Matter

const MatterJs = () => {
  let canvas!: HTMLCanvasElement

  onMount(() => {
    // create engine
    const engine = Engine.create()
    const world = engine.world

    // create renderer
    const render = Render.create({
      canvas,
      engine: engine,
      options: {
        width: canvas.clientWidth,
        height: canvas.clientHeight,
        showVelocity: true,
      },
    })

    Render.run(render)

    // create runner
    const runner = Runner.create()
    Runner.run(runner, engine)

    const u = Math.max(canvas.clientHeight, canvas.clientWidth) / 100

    // add bodies
    Composite.add(world, [
      // falling blocks
      Bodies.rectangle(canvas.clientWidth / 4, canvas.clientHeight / 3, 4 * u, 4 * u, {
        frictionAir: 0.001,
      }),
      Bodies.rectangle((canvas.clientWidth / 4) * 2, canvas.clientHeight / 3, 4 * u, 4 * u, {
        frictionAir: 0.05,
      }),
      Bodies.rectangle((canvas.clientWidth / 4) * 3, canvas.clientHeight / 3, 4 * u, 4 * u, {
        frictionAir: 0.1,
      }),

      // walls
      Bodies.rectangle(canvas.clientWidth / 2, u / 2, canvas.clientWidth, u, { isStatic: true }),
      Bodies.rectangle(canvas.clientWidth / 2, canvas.clientHeight - u / 2, canvas.clientWidth, u, {
        isStatic: true,
      }),
      Bodies.rectangle(u / 2, canvas.clientHeight / 2, u, canvas.clientHeight, { isStatic: true }),
      Bodies.rectangle(
        canvas.clientWidth - u / 2,
        canvas.clientHeight / 2,
        u,
        canvas.clientHeight,
        {
          isStatic: true,
        }
      ),
    ])

    // add mouse control
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    })

    Composite.add(world, mouseConstraint)

    // keep the mouse in sync with rendering
    render.mouse = mouse

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: canvas.clientWidth, y: canvas.clientHeight },
    })
  })
  return <canvas ref={canvas} class="h-screen w-full" />
}

export default MatterJs
