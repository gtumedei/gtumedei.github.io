import { animate } from "motion"
import { onCleanup, onMount } from "solid-js"

export const createBatchedInViewAnimation = (selector: string) => {
  onMount(() => {
    let firstBatchLoaded = false
    const observer = new IntersectionObserver(
      (entries) => {
        let delayCount = 0 // Reset delay for each batch of elements entering together
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(
              entry.target,
              { opacity: 1, scale: [0.95, 1], y: [10, 0] },
              {
                duration: 0.4,
                delay: delayCount * 0.15 + (firstBatchLoaded ? 0 : 0.4),
                ease: "easeOut",
              }
            )
            delayCount++ // Increase delay for this batch
            observer.unobserve(entry.target) // Only animate once
          }
        })
        firstBatchLoaded = true
      },
      { threshold: 0.5 } // Trigger when 50% visible
    )
    document.querySelectorAll(selector).forEach((elem) => observer.observe(elem))
    onCleanup(() => observer.disconnect())
  })
}
