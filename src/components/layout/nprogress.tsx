import { useIsRouting } from "@solidjs/router"
import nprogress from "nprogress"
import { createEffect } from "solid-js"

export const NProgress = () => {
  const isRouting = useIsRouting()
  createEffect(() => (isRouting() ? nprogress.start() : nprogress.done()))

  return <></>
}
