import "solid-js"

import { Accessor } from "solid-js"
import { Placement } from "tippy.js"

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      form: boolean
      stickyOnScrollUp: boolean
      tooltip: [string | Accessor<string>, Placement]
    }
  }
}
