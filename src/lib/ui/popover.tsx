import { createShortcut } from "@solid-primitives/keyboard"
import { onMount, type JSX, type ParentComponent, type Setter } from "solid-js"
import { Transition } from "solid-transition-group"
import clickOutside from "~/lib/directives/click-outside"

clickOutside

const PopoverContent: ParentComponent<{
  setShow: Setter<boolean>
  class?: string
}> = (props) => {
  createShortcut(["Escape"], () => props.setShow(false))
  onMount(() => (document.activeElement as HTMLElement)?.blur())

  return (
    <div class={props.class} use:clickOutside={[() => props.setShow(false)]}>
      {props.children}
    </div>
  )
}

const Popover: ParentComponent<{
  show: boolean
  setShow: Setter<boolean>
  class?: string
  trigger: JSX.Element
}> = (props) => {
  return (
    <div class="inline-flex relative">
      {props.trigger}

      <Transition
        enterClass="opacity-0 transform translate-y-1"
        exitToClass="opacity-0 transform translate-y-1"
        enterActiveClass="transition-all"
        exitActiveClass="transition-all"
      >
        {props.show && (
          <PopoverContent class={props.class} setShow={props.setShow}>
            {props.children}
          </PopoverContent>
        )}
      </Transition>
    </div>
  )
}

export default Popover
