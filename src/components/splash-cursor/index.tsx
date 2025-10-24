import { onCleanup, onMount } from "solid-js"
import { Portal } from "solid-js/web"
import { setupSplashCursor } from "~/components/splash-cursor/splash-cursor"

const SplashCursor = () => {
  let canvas!: HTMLCanvasElement

  onMount(() => {
    const destroy = setupSplashCursor(canvas)
    onCleanup(() => destroy())
  })

  return (
    <Portal>
      <canvas
        ref={canvas}
        class="h-screen w-screen fixed top-0 left-0 z-20 pointer-events-none opacity-50"
        aria-hidden="true"
      />
    </Portal>
  )
}

export default SplashCursor
