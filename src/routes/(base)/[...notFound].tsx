import { debounce } from "@solid-primitives/scheduled"
import { A } from "@solidjs/router"
import { HttpStatusCode } from "@solidjs/start"
import Matter from "matter-js"
import { createEffect, on, onCleanup, onMount } from "solid-js"
import { isServer } from "solid-js/web"
import { button } from "~/components/ui/button"
import { useTheme } from "~/lib/theme"
import { useThemeColors } from "~/lib/theme/colors"

const { Engine, Render, Runner, Constraint, MouseConstraint, Mouse, Composite, Bodies } = Matter

const NotFoundPage = () => {
  return (
    <>
      <HttpStatusCode code={404} />
      <div class="text-center pb-28 my-auto">
        <Matter404 />
        {/* <div class="h-56 bg-base-200 flex mb-2">
          <p class="font-serif font-black text-12xl text-on-base/30 m-auto">404</p>
        </div> */}
        {/* <p class="text-lg tracking-wide font-mono font-bold text-on-base/50 mb-2">404</p> */}
        <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-wider mb-4">
          Page not found
        </h1>
        <p class="text-on-base/70 text-balance mb-6">
          Sorry, but I couldn't find the page you are looking for.
        </p>
        <A href="/" class={button({ variant: "subtle" })}>
          Go back home
        </A>
      </div>
    </>
  )
}

const Matter404 = () => {
  let canvas!: HTMLCanvasElement
  let engine!: Matter.Engine
  let world!: Matter.World
  let render!: Matter.Render
  let runner!: Matter.Runner

  const elements: { char: "4" | "0"; body: Matter.Body; spring: Matter.Constraint }[] = []

  const { actualTheme } = useTheme()
  const colors = useThemeColors()

  onMount(async () => {
    await new Promise((r) => setTimeout(r, 100))

    const { clientHeight: h, clientWidth: w } = canvas

    // Init Matter
    engine = Engine.create()
    world = engine.world
    render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: w,
        height: h,
        wireframes: false,
        showAngleIndicator: false,
        background: colors.base100,
      },
    })
    Render.run(render)
    runner = Runner.create()
    Runner.run(runner, engine)
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    })
    Composite.add(world, mouseConstraint)
    render.mouse = mouse

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: w, y: h },
    })

    // Add objects

    const t = actualTheme()

    const createHangingChar = (options: {
      body: { x: number; y: number; texture: string }
      spring: { x: number; y: number; stiffness: number }
    }) => {
      const body = Bodies.rectangle(options.body.x, options.body.y, 64, 64, {
        render: {
          sprite: { texture: options.body.texture, xScale: 0.5, yScale: 0.5 },
        },
      })
      const constraint = Constraint.create({
        pointA: { x: options.spring.x, y: options.spring.y },
        bodyB: body,
        pointB: { x: -20, y: -20 },
        stiffness: options.spring.stiffness,
        damping: 0.01,
        render: { strokeStyle: colors.onBase },
      })
      return [body, constraint] as const
    }

    const offset = Math.max((w - 440) / 2, 0)
    const gap = Math.min(440, w) / 4

    const x1 = offset + gap
    const [body1, constraint1] = createHangingChar({
      body: { x: x1, y: 80, texture: `/img/4-${t}.png` },
      spring: { x: x1, y: 100, stiffness: 0.0015 },
    })
    Composite.add(world, [body1, constraint1])
    elements.push({ char: "4", body: body1, spring: constraint1 })

    const x2 = offset + gap * 2
    const [body2, constraint2] = createHangingChar({
      body: { x: x2, y: 80, texture: `/img/0-${t}.png` },
      spring: { x: x2, y: 100, stiffness: 0.001 },
    })
    Composite.add(world, [body2, constraint2])
    elements.push({ char: "0", body: body2, spring: constraint2 })

    const x3 = offset + gap * 3
    const [body3, constraint3] = createHangingChar({
      body: { x: x3, y: 80, texture: `/img/4-${t}.png` },
      spring: { x: x3, y: 100, stiffness: 0.0015 },
    })
    Composite.add(world, [body3, constraint3])
    elements.push({ char: "4", body: body3, spring: constraint3 })
  })

  onCleanup(() => {
    if (isServer) return
    Render.stop(render)
    Runner.stop(runner)
  })

  // Update colors on theme change
  createEffect(
    on(actualTheme, async () => {
      if (!render) return
      await new Promise((r) => setTimeout(r, 100))
      const t = actualTheme()
      render.options.background = colors.base100
      for (const { char, body, spring } of elements) {
        if (body.render.sprite?.texture) {
          body.render.sprite.texture = `/img/${char}-${t}.png`
        }
        spring.render.strokeStyle = colors.onBase
      }
    })
  )

  // Update sizes on viewport change
  onMount(() => {
    const handleResize = debounce(async () => {
      const { clientHeight: h, clientWidth: w } = canvas
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: w, y: h },
      })
      const offset = Math.max((w - 440) / 2, 0)
      const gap = Math.min(440, w) / 4
      elements.forEach(({ spring }, i) => {
        spring.pointA.x = offset + gap * (i + 1)
      })
    }, 200)
    window.addEventListener("resize", handleResize)
    onCleanup(() => window.removeEventListener("resize", handleResize))
  })

  return <canvas ref={canvas} class="h-[300px] w-full" />
}

export default NotFoundPage
