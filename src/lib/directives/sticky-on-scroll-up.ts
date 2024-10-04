import { onCleanup, onMount } from "solid-js"

const stickyOnScrollUp = (elem: HTMLElement) => {
  let actualScroll = 0

  const onScroll = () => {
    const top = Math.min(-(window.scrollY - actualScroll + elem.clientHeight), 0)

    if (top === 0) actualScroll = window.scrollY + elem.clientHeight
    else if (window.scrollY > actualScroll) actualScroll = window.scrollY

    const isVisible = window.scrollY < actualScroll
    const isSticking = window.scrollY > elem.clientHeight * 1.5

    elem.setAttribute(
      "style",
      `position: sticky; --top:${top}px; ${isVisible ? `top: var(--top);` : ""}`
    )
    elem.toggleAttribute("data-visible", isVisible)
    elem.toggleAttribute("data-sticky", isSticking)
  }

  onMount(() => {
    window.addEventListener("scroll", onScroll)
    onCleanup(() => window.removeEventListener("scroll", onScroll))
  })
}

export default stickyOnScrollUp
