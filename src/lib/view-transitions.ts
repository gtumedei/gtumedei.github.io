import { makeEventListener } from "@solid-primitives/event-listener"
import { onMount } from "solid-js"

export type ViewTransitionLifecycleEvent =
  | "before-preparation"
  | "after-preparation"
  | "before-swap"
  | "after-swap"
  | "page-load"

export const onViewTransition = (event: ViewTransitionLifecycleEvent, callback: () => any) => {
  onMount(() => {
    callback()
    makeEventListener(document, "astro:" + event, callback)
  })
}
