import { Accessor, createEffect, onCleanup } from "solid-js"
import tippy, { Placement } from "tippy.js"

const tooltip = (elem: HTMLElement, value: () => [Accessor<string>, Placement]) => {
  const [content, placement] = value()
  const instance = tippy(elem, { content: content(), placement })
  createEffect(() => instance.setContent(content()))
  onCleanup(() => instance.destroy())
}

export default tooltip
