import "solid-js"

import { Accessor } from "solid-js"
import { AnimationOptionsWithOverrides, MotionKeyframesDefinition } from "motion"
import { Placement } from "tippy.js"

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      stickyOnScrollUp: boolean
      tooltip: [string | Accessor<string>, Placement]
      motion: [keyframes: MotionKeyframesDefinition, options?: AnimationOptionsWithOverrides]
    }
  }
}
