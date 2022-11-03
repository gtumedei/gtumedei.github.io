import type { Accessor, ParentComponent, Setter } from "solid-js"
import { Portal } from "solid-js/web"
import { Transition } from "solid-transition-group"

const Modal: ParentComponent<{
  show: Accessor<boolean>
  setShow: Setter<boolean>
  persistent?: boolean
  class?: string
}> = (props) => {
  return (
    <>
      <Portal>
        <Transition
          enterClass="opacity-0" exitToClass="opacity-0"
          enterActiveClass="transition-opacity" exitActiveClass="transition-opacity"
        >
          {props.show() && <div class="fixed inset-0 bg-black-38 z-30" onClick={() => !props.persistent && props.setShow(false)} />}
        </Transition>

        <div class="fixed inset-3 flex z-40 pointer-events-none">
          <Transition
            enterClass="opacity-0 transform -translate-y-2" exitToClass="opacity-0 transform -translate-y-2"
            enterActiveClass="transition-all" exitActiveClass="transition-all"
          >
            {props.show() &&
              <div class={`card container max-w-lg m-auto pointer-events-auto ${props.class} ${!props.class?.includes("w-") ? "w-min" : ""}`}>
                {props.children}
              </div>
            }
          </Transition>
        </div>
      </Portal>
    </>
  )
}

export default Modal
