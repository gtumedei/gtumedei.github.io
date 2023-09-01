import { makeEventListener } from "@solid-primitives/event-listener"
import { onMount } from "solid-js"

/** Run the callback at the end of page navigation, after the new page is visible to the user and blocking styles and scripts are loaded. */
export const onAstroPageLoad = (callback: () => void) => {
  onMount(() => {
    callback()
    makeEventListener(document, "astro:page-load", callback)
  })
}

/** Run the callback immediately after the new page replaces the old page. */
export const onAstroAfterSwap = (callback: () => void) => {
  onMount(() => {
    callback()
    makeEventListener(document, "astro:after-swap", callback)
  })
}
