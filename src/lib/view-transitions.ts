import { useBeforeLeave } from "@solidjs/router"

// TODO: this composable does not work when navigating using the back button, and it also causes hydration mismatches sometimes. It should not be used until Solid Router has official support for the View Transition API

/** Enable view transitions when routing through pages using Solid Router. */
export const useViewTransitionOnRouting = () => {
  const transition = (transitionFn: () => void) => {
    if (!document.startViewTransition) return transitionFn()
    document.startViewTransition(transitionFn)
  }
  useBeforeLeave((e) => {
    e.preventDefault()
    transition(() => {
      console.log("transition")
      e.retry(true)
    })
  })
}
