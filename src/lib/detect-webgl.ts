import { createSignal, onMount } from "solid-js"

export const createWebGLDetector = () => {
  const [hasWebGLSupport, setHasWebGLSupport] = createSignal(false)

  onMount(() => {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl")
    setHasWebGLSupport(gl instanceof WebGLRenderingContext)
  })

  return hasWebGLSupport
}
