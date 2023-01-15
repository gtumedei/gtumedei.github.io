import { createShortcut } from "@solid-primitives/keyboard"
import type { ParentComponent, Setter } from "solid-js"
import { Portal } from "solid-js/web"
import { Transition } from "solid-transition-group"

type ModalProps = {
  show: boolean
  setShow: Setter<boolean>
  persistent?: boolean
  class?: string
}

const ModalCard: ParentComponent<ModalProps> = (props) => {
  createShortcut(["Escape"], () => !props.persistent && props.setShow(false))

  return (
    <div class={`card container max-w-lg m-auto pointer-events-auto ${props.class} ${!props.class?.includes("w-") ? "w-min" : ""}`}>
      {props.children}
    </div>
  )
}

const Modal: ParentComponent<ModalProps> = (props) => {
  return (
    <>
      <Portal>
        <Transition
          enterClass="opacity-0" exitToClass="opacity-0"
          enterActiveClass="transition-opacity" exitActiveClass="transition-opacity"
        >
          {props.show && <div class="fixed inset-0 bg-black-38 z-30" />}
        </Transition>

        <div
          class={`fixed inset-0 p-3 max-h-screen overflow-y-auto flex z-40 ${!props.show ? "pointer-events-none" : ""}`}
          onClick={(e) => e.target == e.currentTarget && !props.persistent && props.setShow(false)}
        >
          <Transition
            enterClass="opacity-0 transform -translate-y-2" exitToClass="opacity-0 transform -translate-y-2"
            enterActiveClass="transition-all" exitActiveClass="transition-all"
          >
            {props.show && <ModalCard {...props} />}
          </Transition>
        </div>
      </Portal>
    </>
  )
}

export default Modal
