import { Component, createSignal, onCleanup, onMount } from "solid-js"
import { Transition } from "solid-transition-group"
import { useTippy } from "~/composables/tippy"
import MdiMenuUpOutline from "~icons/mdi/menu-up-outline"

const BackToTopButton: Component = () => {
  const onClick = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const [show, setShow] = createSignal(false)

  const onScroll = () => setShow(window.scrollY > 200)
  onMount(() => document.addEventListener("scroll", onScroll))
  onCleanup(() => document.removeEventListener("scroll", onScroll))

  const btn = (
    <button class="btn fab inverted" onClick={onClick}>
      <MdiMenuUpOutline />
    </button>
  )

  useTippy(btn, () => "Go back to top", "left")

  return (
    <div class="fixed bottom-6 right-6">
      <Transition name="fade">
        {show() && btn}
      </Transition>
    </div>
  )
}

export default BackToTopButton
