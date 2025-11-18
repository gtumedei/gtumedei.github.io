import { debounce } from "@solid-primitives/scheduled"
import { Title } from "@solidjs/meta"
import { A } from "@solidjs/router"
import { HttpStatusCode } from "@solidjs/start"
import Matter from "matter-js"
import { createEffect, on, onCleanup, onMount } from "solid-js"
import { isServer } from "solid-js/web"
import { button } from "~/components/ui/button"
import { useAchievements } from "~/lib/achievements"
import { useTheme } from "~/lib/theme"
import { useThemeColors } from "~/lib/theme/colors"

const { Engine, Render, Runner, Constraint, MouseConstraint, Mouse, Composite, Bodies, Events } =
  Matter

const NotFoundPage = () => {
  const { unlockAchievement } = useAchievements()
  onMount(async () => {
    await new Promise((r) => setTimeout(r, 750))
    unlockAchievement("LOST")
  })

  return (
    <>
      <HttpStatusCode code={404} />
      <Title>Page not found • Gianni Tumedei</Title>
      <div class="grow flex justify-center items-center relative">
        <div class="w-full text-center pb-28 my-auto">
          <PageNotFoundDoodle />
          <div class="relative">
            <h1 class="font-heading text-4xl sm:text-5xl mb-4">Page not found</h1>
            <p class="text-on-base/70 text-balance mb-6">
              Sorry, but I couldn't find the page you are looking for.
            </p>
            <A href="/" class={button({ variant: "subtle" })}>
              Go back home
            </A>
          </div>
        </div>
      </div>
    </>
  )
}

const PageNotFoundDoodle = () => {
  let positioner!: HTMLDivElement
  let canvas!: HTMLCanvasElement
  let engine!: Matter.Engine
  let world!: Matter.World
  let render!: Matter.Render
  let runner!: Matter.Runner

  const elements: { char: "4" | "0"; body: Matter.Body; spring: Matter.Constraint }[] = []

  const { actualTheme } = useTheme()
  const colors = useThemeColors()

  const { unlockAchievement } = useAchievements()

  const computeBodyPositions = () => {
    const { clientWidth: w } = canvas
    const offset = Math.max((w - 440) / 2, 0)
    const gap = Math.min(440, w) / 4
    const baseY = positioner.getBoundingClientRect().top + window.scrollY

    const x1 = offset + gap
    const x2 = offset + gap * 2
    const x3 = offset + gap * 3
    const bodyY = baseY + 80
    const springY = baseY + 100

    return {
      x: [x1, x2, x3] as const,
      bodyY,
      springY,
    }
  }

  onMount(async () => {
    await new Promise((r) => setTimeout(r, 100))

    const { clientWidth: w, clientHeight: h } = canvas

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
        background: "transparent",
        wireframeBackground: "transparent",
        pixelRatio: window.devicePixelRatio,
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

    // Setup achievement
    let interactionDetails: {
      body: Matter.Body
      timestamp: number
    } | null = null
    Events.on(mouseConstraint, "mousedown", () => {
      if (!mouseConstraint.body) return
      interactionDetails = {
        body: mouseConstraint.body,
        timestamp: Date.now(),
      }
    })
    Events.on(mouseConstraint, "mouseup", () => {
      if (!interactionDetails) return
      if (Date.now() - interactionDetails.timestamp > 200) {
        unlockAchievement("AND_FOUND")
      }
      interactionDetails = null
    })

    // Add objects

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

    const t = actualTheme()
    const p = computeBodyPositions()

    const [body1, constraint1] = createHangingChar({
      body: { x: p.x[0], y: p.bodyY, texture: `/img/4-${t}.png` },
      spring: { x: p.x[0], y: p.springY, stiffness: 0.0015 },
    })
    Composite.add(world, [body1, constraint1])
    elements.push({ char: "4", body: body1, spring: constraint1 })

    const [body2, constraint2] = createHangingChar({
      body: { x: p.x[1] + 20, y: p.bodyY, texture: `/img/0-${t}.png` },
      spring: { x: p.x[1], y: p.springY, stiffness: 0.001 },
    })
    Composite.add(world, [body2, constraint2])
    elements.push({ char: "0", body: body2, spring: constraint2 })

    const [body3, constraint3] = createHangingChar({
      body: { x: p.x[2] + 20, y: p.bodyY, texture: `/img/4-${t}.png` },
      spring: { x: p.x[2], y: p.springY, stiffness: 0.0015 },
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
      Render.setPixelRatio(render, window.devicePixelRatio)
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: w, y: h },
      })
      const position = computeBodyPositions()
      elements.forEach(({ spring }, i) => {
        spring.pointA.x = position.x[i]!
        spring.pointA.y = position.springY
      })
    }, 1000)
    window.addEventListener("resize", handleResize)
    onCleanup(() => window.removeEventListener("resize", handleResize))
  })

  return (
    <div ref={positioner} class="w-full h-[300px]">
      <canvas
        ref={canvas}
        class="h-[calc(100%+150px)] w-full md:w-[calc(100%+3rem)] lg:w-[calc(100%+5rem)] xl:w-[calc(100%+7rem)] absolute-center-x top-[-150px]"
        aria-label="404"
      />
    </div>
  )
}

export default NotFoundPage
