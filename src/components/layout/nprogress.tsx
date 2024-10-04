import nprogress from "nprogress"
import { createEffect } from "solid-js"
import { useIsRouting } from "@solidjs/router"

export const NProgress = () => {
  const isRouting = useIsRouting()
  createEffect(() => (isRouting() ? nprogress.start() : nprogress.done()))

  return <></>
}
