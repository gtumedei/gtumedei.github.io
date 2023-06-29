import { createElementBounds } from "@solid-primitives/bounds"
import { debounce } from "@solid-primitives/scheduled"
import { createEffect, createSignal, ParentComponent } from "solid-js"

const AspectRatio: ParentComponent<{ w: number; h: number }> = (props) => {
  let wrapper!: HTMLDivElement
  const bounds = createElementBounds(() => wrapper)
  const [size, setSize] = createSignal({ height: 0, width: 0 })

  // bounds get set multiple times on mobile, leading to poor performance if not debounced
  const onBoundsChange = debounce((height: number, width: number) => {
    const computedHeight = (width / props.w) * props.h
    const computedWidth = (height / props.h) * props.w
    setSize(
      computedHeight > height ? { height, width: computedWidth } : { height: computedHeight, width }
    )
  }, 200)
  createEffect(() => onBoundsChange(bounds.height, bounds.width))

  return (
    <div ref={wrapper} class="relative flex-grow w-full h-full">
      <div class="absolute-center" style={`height: ${size().height}px; width: ${size().width}px`}>
        {props.children}
      </div>
    </div>
  )
}

export default AspectRatio
