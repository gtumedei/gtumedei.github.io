import "solid-js"
import type { Accessor } from "solid-js"
import type { AnimationOptionsWithOverrides, MotionKeyframesDefinition } from "motion"
import type { Placement } from "tippy.js"

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      clickOutside: [() => void]
      model: [Accessor<string>, (value: string) => void]
      motion: [keyframes: MotionKeyframesDefinition, options?: AnimationOptionsWithOverrides]
      tooltip: [string | Accessor<string>, Placement]
    }
  }
}
