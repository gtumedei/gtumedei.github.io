import { createShortcut } from "@solid-primitives/keyboard"
import { onMount, type ParentComponent, type Setter } from "solid-js"
import { Portal } from "solid-js/web"
import { Transition } from "solid-transition-group"
import cn from "~/lib/cn"
import clickOutside from "~/lib/directives/click-outside"

clickOutside

type ModalProps = {
  show: boolean
  setShow: Setter<boolean>
  persistent?: boolean
  class?: string
}

const ModalCard: ParentComponent<ModalProps> = (props) => {
  const closeModal = () => !props.persistent && props.setShow(false)
  createShortcut(["Escape"], closeModal)
  onMount(() => (document.activeElement as HTMLElement)?.blur())

  return (
    <div
      class={cn(
        "card container max-w-lg p-6 bg-base-100 shadow-xl m-auto pointer-events-auto",
        props.class,
        !props.class?.includes("w-") && "w-min"
      )}
      use:clickOutside={[closeModal]}
    >
      {props.children}
    </div>
  )
}

const Modal: ParentComponent<ModalProps> = (props) => {
  return (
    <>
      <Portal>
        {/* Modal */}
        <div class="fixed inset-0 p-3 max-h-screen overflow-y-auto flex z-40 pointer-events-none">
          <Transition
            enterClass="opacity-0 transform -translate-y-2"
            exitToClass="opacity-0 transform -translate-y-2"
            enterActiveClass="transition-all"
            exitActiveClass="transition-all"
          >
            {props.show && <ModalCard {...props} />}
          </Transition>
        </div>

        {/* Backdrop */}
        <Transition
          enterClass="opacity-0"
          exitToClass="opacity-0"
          enterActiveClass="transition-opacity"
          exitActiveClass="transition-opacity"
        >
          {props.show && <div class="fixed inset-0 bg-black/40 z-[35]" />}
        </Transition>
      </Portal>
    </>
  )
}

export default Modal
