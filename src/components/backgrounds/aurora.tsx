import { Mesh, Program, Renderer, Triangle } from "ogl"
import type { Component, JSX } from "solid-js"
import { createEffect, createSignal, mergeProps, onCleanup, onMount } from "solid-js"
import { cn } from "tailwind-variants"
import { createBreakpoints } from "~/lib/breakpoints"

type AuroraProps = {
  colorStops?: string[]
  amplitude?: number
  blend?: number
  time?: number
  speed?: number
  bgColor?: string | [number, number, number]
  overlayMode?: "none" | "pixelated" | "dotted" | "grain"
  class?: string
  style?: JSX.CSSProperties
}

type AuroraUniforms = {
  uTime: { value: number }
  uAmplitude: { value: number }
  uColorStops: { value: number[][] }
  uResolution: { value: Float32Array }
  uBlend: { value: number }
  uBgColor: { value: Float32Array }
  uGrainAmount: { value: number }
  uGrainScale: { value: number }
  uGrainShape: { value: number }
}

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform vec3 uBgColor;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainShape;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float ridge = exp(snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude);
  float intensity = 0.6 * (uv.y * 2.0 - ridge + 0.2);

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  // Normalize intensity against the per-column peak (uv.y = 1) so the band keeps
  // the full ramp color at the ridge and fades into uBgColor, on any background.
  float peak = max(0.6 * (2.2 - ridge), 0.0001);
  float energy = clamp(intensity / peak, 0.0, 1.0);

  vec3 color = mix(uBgColor, rampColor, auroraAlpha * energy);

  float grainPx = max(uGrainScale, 1.0);
  vec2 grainUv = gl_FragCoord.xy / grainPx;
  vec2 grainCell = floor(grainUv);
  float grain = fract(sin(dot(grainCell, vec2(12.9898, 78.233))) * 43758.5453);
  vec2 grainLocal = fract(grainUv) - 0.5;
  float grainDist = length(grainLocal);
  float dotMask = 1.0 - smoothstep(0.45, 0.5, grainDist);
  if (uGrainShape > 1.5) {
    float n1 = fract(sin(dot(grainCell, vec2(1.9898, 78.233))) * 43758.5453);
    float n2 = fract(sin(dot(grainCell, vec2(45.164, 93.412))) * 23421.631);
    grain = grain * 0.5 + n1 * 0.25 + n2 * 0.25;
  }
  float grainMask = uGrainShape > 1.5 ? 1.0 : mix(1.0, dotMask, uGrainShape);
  color += (grain - 0.5) * uGrainAmount * grainMask;

  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`

const Aurora: Component<AuroraProps> = (baseProps) => {
  const props = mergeProps(
    {
      colorStops: ["#5227FF", "#7cff67", "#5227FF"],
      amplitude: 1.0,
      blend: 0.5,
      speed: 0.2,
      bgColor: "#ffffff",
      overlayMode: "none",
      class: "",
      style: {},
    } satisfies Omit<Required<AuroraProps>, "time">,
    baseProps,
  )

  let container!: HTMLDivElement
  let canvas!: HTMLCanvasElement

  const [ctx, setCtx] = createSignal<{
    renderer: InstanceType<typeof Renderer>
    program: InstanceType<typeof Program>
    mesh: InstanceType<typeof Mesh>
  } | null>(null)

  const breakpoints = createBreakpoints()

  onMount(() => {
    const renderer = new Renderer({ webgl: 2, alpha: true, antialias: true, canvas })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)

    const geometry = new Triangle(gl)
    delete (geometry.attributes as Record<string, unknown>).uv

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: props.amplitude },
        uColorStops: {
          value: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ],
        },
        uResolution: { value: new Float32Array([gl.canvas.width, gl.canvas.height]) },
        uBlend: { value: props.blend },
        uBgColor: { value: new Float32Array(toRgb(props.bgColor)) },
        uGrainAmount: { value: 0 },
        uGrainScale: { value: 2 },
        uGrainShape: { value: 0 },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })

    setCtx({ renderer, program, mesh })

    let resizeRaf = 0
    let lastW = 0
    let lastH = 0

    const setSize = () => {
      const rect = container.getBoundingClientRect()
      const w = Math.max(1, Math.floor(rect.width))
      const h = Math.max(1, Math.floor(rect.height))
      if (w === lastW && h === lastH) return
      lastW = w
      lastH = h
      renderer.setSize(w, h)
      const res = (program.uniforms as AuroraUniforms).uResolution.value
      res[0] = gl.canvas.width
      res[1] = gl.canvas.height
      renderer.render({ scene: mesh })
    }

    const scheduleResize = () => {
      if (resizeRaf !== 0) return
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0
        setSize()
      })
    }

    const ro = new ResizeObserver(scheduleResize)
    ro.observe(container)
    scheduleResize()

    let raf = 0
    let isVisible = true
    let isPageVisible = !document.hidden

    const loop = (t: number) => {
      const u = program.uniforms as AuroraUniforms
      u.uTime.value = (props.time ?? t * 0.01) * props.speed * 0.1
      renderer.render({ scene: mesh })
      raf = requestAnimationFrame(loop)
    }

    const tryStart = () => {
      if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop)
    }
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        isVisible = entry.isIntersecting
        isVisible ? tryStart() : tryStop()
      },
      { threshold: 0 },
    )
    io.observe(container)

    const onVisibility = () => {
      isPageVisible = !document.hidden
      isPageVisible ? tryStart() : tryStop()
    }
    document.addEventListener("visibilitychange", onVisibility)

    tryStart()

    onCleanup(() => {
      tryStop()
      if (resizeRaf !== 0) cancelAnimationFrame(resizeRaf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      setCtx(null)
      try {
        gl.getExtension("WEBGL_lose_context")?.loseContext()
      } catch {}
    })
  })

  // Sync props to uniforms
  createEffect(() => {
    const current = ctx()
    if (!current) return
    const u = current.program.uniforms as AuroraUniforms

    u.uAmplitude.value = props.amplitude
    u.uBlend.value = props.blend
    u.uBgColor.value = new Float32Array(toRgb(props.bgColor))

    const stops = u.uColorStops.value
    for (let i = 0; i < 3; i++) {
      stops[i] = toRgb(props.colorStops[i] ?? "#5227FF")
    }

    const breakpoint = breakpoints.xl ? "xl" : breakpoints.md ? "md" : "base"
    const grainPresets = {
      none: { amount: 0, scale: 2, shape: 0 },
      pixelated: { amount: 0.1, scale: 2, shape: 0 },
      dotted: { amount: 0.1, scale: 2, shape: 1 },
      grain: { amount: 0.1, scale: 2, shape: 2 },
    }
    const grainMultipliers = {
      none: { base: 1, md: 1, xl: 1 },
      pixelated: { base: 6, md: 5, xl: 4 },
      dotted: { base: 8, md: 7, xl: 6 },
      grain: { base: 1, md: 1, xl: 1 },
    }
    const preset = grainPresets[props.overlayMode]
    const grainMultiplier = grainMultipliers[props.overlayMode][breakpoint]
    u.uGrainAmount.value = preset.amount
    u.uGrainScale.value = preset.scale * grainMultiplier
    u.uGrainShape.value = preset.shape
  })

  return (
    <div
      ref={container}
      class={cn("relative h-full w-full overflow-hidden", props.class)}
      style={props.style}
    >
      <canvas ref={canvas} class="absolute inset-0" />
    </div>
  )
}

const toRgb = (color: string | [number, number, number]): [number, number, number] => {
  if (Array.isArray(color)) return color
  // Expand shorthand hex (#fff / #fff0) first: the prod CSS minifier rewrites
  // custom property values like #ffffff to #fff, which the 6-digit regex below
  // would reject.
  let hex = color.replace(/^#/, "")
  if (/^[\da-f]{3,4}$/i.test(hex)) hex = [...hex].map((c) => c + c).join("")
  const result = /^([\da-f]{2})([\da-f]{2})([\da-f]{2})/i.exec(hex)
  const r = result?.[1]
  const g = result?.[2]
  const b = result?.[3]
  if (!r || !g || !b) return [0.1, 0.1, 0.1]
  return [parseInt(r, 16) / 255, parseInt(g, 16) / 255, parseInt(b, 16) / 255]
}

export default Aurora
export { Aurora }
