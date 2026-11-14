import { useBeforeLeave, useIsRouting, useLocation } from "@solidjs/router"
import nprogress from "nprogress"
import { createEffect } from "solid-js"

export const NProgress = () => {
  const isRouting = useIsRouting()
  const location = useLocation()

  let hashOnly = false
  let started = false

  useBeforeLeave(({ to }) => {
    const current = location.pathname + location.search
    if (typeof to === "string") {
      // Anchor clicks / navigate(): location is still the current URL
      hashOnly = to.split("#")[0] === current
    } else {
      // Back/forward navigation: to is a number, but popstate has already updated window.location to the destination URL while Solid Router's location still points at the current one
      hashOnly = window.location.pathname + window.location.search === current
    }
  })

  createEffect(() => {
    if (isRouting()) {
      if (hashOnly) return
      started = true
      nprogress.start()
    } else if (started) {
      started = false
      nprogress.done()
    }
  })

  return <></>
}
