import { Accessor, createEffect, JSX, onMount } from "solid-js"
import tippy, { Placement } from "tippy.js"

export const useTippy = (
  elem: HTMLElement | JSX.Element,
  content: Accessor<string>,
  placement: Placement = "top"
) => onMount(() => {
  const instance = tippy(elem as HTMLElement, { content: content(), placement })
  createEffect(() => instance.setContent(content()))
})
