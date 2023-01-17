import { Accessor, createEffect, onCleanup } from "solid-js"
import tippy, { Placement } from "tippy.js"

const tooltip = (elem: HTMLElement, value: () => [string | Accessor<string>, Placement]) => {
  const [content, placement] = value()

  const isStatic = typeof content == "string"
  const contentValue = isStatic ? content : content()

  const instance = tippy(elem, { content: contentValue, placement })
  onCleanup(() => instance.destroy())
  elem.setAttribute("aria-label", contentValue)

  if (!isStatic) {
    createEffect(() => {
      instance.setContent(content())
      elem.setAttribute("aria-label", content())
    })
  }
}

export default tooltip
