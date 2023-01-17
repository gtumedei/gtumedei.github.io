import { onCleanup } from "solid-js"

const clickOutside = (el: HTMLElement, value: () => [() => void]) => {
  const [callback] = value()
  const onClick = (e: MouseEvent) => !el.contains(e.target as Node) && callback()

  document.body.addEventListener("click", onClick)
  onCleanup(() => document.body.removeEventListener("click", onClick))
}

export default clickOutside
