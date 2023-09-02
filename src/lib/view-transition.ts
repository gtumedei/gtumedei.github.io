import { makeEventListener } from "@solid-primitives/event-listener"
import { onMount } from "solid-js"

export const onAstroLoad = (callback: () => void) => {
  onMount(() => {
    callback()
    makeEventListener(document, "astro:page-load", callback)
  })
}

export const onAstroBeforeLoad = (callback: () => void) => {
  onMount(() => {
    callback()
    makeEventListener(document, "astro:after-swap", callback)
  })
}
